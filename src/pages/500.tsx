export default function Custom500() {
  return (
    <div style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', color: '#fff' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>서버 오류가 발생했습니다</h1>
        <p style={{ color: '#9ca3af' }}>잠시 후 다시 시도해주세요.</p>
      </div>
    </div>
  )
}


