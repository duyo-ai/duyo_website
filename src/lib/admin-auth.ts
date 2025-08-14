import crypto from 'crypto'
import { cookies } from 'next/headers'

const COOKIE_NAME = 'admin_session'

function getEnv(name: string): string {
  const value = process.env[name]
  if (!value) {
    throw new Error(`${name} is not set`)
  }
  return value
}

function base64url(input: Buffer | string): string {
  const value = (input instanceof Buffer ? input : Buffer.from(input))
    .toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
  return value
}

function sign(payload: object, secret: string): string {
  const payloadJson = JSON.stringify(payload)
  const payloadB64 = base64url(payloadJson)
  const signature = crypto.createHmac('sha256', secret).update(payloadB64).digest()
  const signatureB64 = base64url(signature)
  return `${payloadB64}.${signatureB64}`
}

function verify(token: string, secret: string): { valid: boolean; payload?: any; reason?: string } {
  if (!token || !token.includes('.')) return { valid: false, reason: 'INVALID_FORMAT' }
  const [payloadB64, sigB64] = token.split('.')
  const expectedSig = base64url(crypto.createHmac('sha256', secret).update(payloadB64).digest())
  if (expectedSig !== sigB64) return { valid: false, reason: 'BAD_SIGNATURE' }
  try {
    const json = Buffer.from(payloadB64.replace(/-/g, '+').replace(/_/g, '/'), 'base64').toString('utf8')
    const payload = JSON.parse(json)
    if (typeof payload.exp !== 'number' || Date.now() > payload.exp) {
      return { valid: false, reason: 'EXPIRED' }
    }
    return { valid: true, payload }
  } catch {
    return { valid: false, reason: 'BAD_PAYLOAD' }
  }
}

export function setAdminSession(username: string, maxAgeSeconds = 60 * 60 * 24) {
  const secret = getEnv('ADMIN_SESSION_SECRET')
  const payload = { u: username, exp: Date.now() + maxAgeSeconds * 1000 }
  const token = sign(payload, secret)
  const isProd = process.env.NODE_ENV === 'production'
  cookies().set({
    name: COOKIE_NAME,
    value: token,
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    path: '/',
    maxAge: maxAgeSeconds,
  })
}

export function clearAdminSession() {
  const isProd = process.env.NODE_ENV === 'production'
  cookies().set({
    name: COOKIE_NAME,
    value: '',
    httpOnly: true,
    secure: isProd,
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  })
}

export function getAdminSession(): { loggedIn: boolean; username?: string; reason?: string } {
  const cookie = cookies().get(COOKIE_NAME)
  if (!cookie?.value) return { loggedIn: false, reason: 'NO_COOKIE' }
  const secret = getEnv('ADMIN_SESSION_SECRET')
  const v = verify(cookie.value, secret)
  if (!v.valid) return { loggedIn: false, reason: v.reason }
  return { loggedIn: true, username: v.payload?.u }
}

export function verifyAdminRequest(): { ok: boolean; reason?: string } {
  const session = getAdminSession()
  if (!session.loggedIn) return { ok: false, reason: session.reason }
  return { ok: true }
}


