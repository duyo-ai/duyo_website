'use client'

import { useState, useEffect } from 'react'
import { useLang } from '@/components/ToolbarProvider'
import { dictionaries } from '@/i18n/dictionary'
import { 
  Users, 
  Download, 
  Search, 
  Filter, 
  ChevronDown, 
  ChevronUp,
  Calendar,
  Mail,
  UserCheck,
  UserX,
  ExternalLink,
  Home,
  Settings,
  BarChart3,
  FileText,
  Menu,
  X,
  Package,
  Edit,
  Upload
} from 'lucide-react'

// Types for API data
interface User {
  id: string
  name: string
  email: string
  signupDate: string
  status: 'verified' | 'pending'
  lastLogin: string | null
}

interface DownloadRequest {
  id: number
  email: string
  platform: string
  requestDate: string
  sent: boolean
}

interface AppVersion {
  id: number
  version_number: string
  version_type: 'stable' | 'beta'
  platform: 'macOS' | 'Windows'
  file_name: string
  file_size: number
  file_url: string
  download_count: number
}

type PageType = 'users' | 'downloads' | 'versions'

const sidebarItems = [
  { id: 'users', icon: Users, label: { ko: '사용자 관리', en: 'Users' } },
  { id: 'downloads', icon: Download, label: { ko: '다운로드 요청', en: 'Downloads' } },
  { id: 'versions', icon: Package, label: { ko: '버전 관리', en: 'Versions' } },
]

export default function AdminPage() {
  const { lang } = useLang()
  const t = dictionaries[lang]
  const [activePage, setActivePage] = useState<PageType>('users')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loginForm, setLoginForm] = useState({ username: '', password: '' })
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortField, setSortField] = useState('signupDate')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')
  const [users, setUsers] = useState<User[]>([])
  const [downloadRequests, setDownloadRequests] = useState<DownloadRequest[]>([])
  const [versions, setVersions] = useState<AppVersion[]>([])
  const [loading, setLoading] = useState(false)
  const [editingVersion, setEditingVersion] = useState<AppVersion | null>(null)
  const [uploadingVersion, setUploadingVersion] = useState<AppVersion | null>(null)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [uploadStatus, setUploadStatus] = useState('')

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('desc')
    }
  }

  // 데이터 로딩 함수들
  const loadUsers = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/users')
      const data = await response.json()
      if (data.ok) {
        setUsers(data.users)
      } else {
        console.error('Failed to load users:', data.error)
      }
    } catch (error) {
      console.error('Error loading users:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadDownloadRequests = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/download-requests')
      const data = await response.json()
      if (data.ok) {
        setDownloadRequests(data.downloadRequests)
      } else {
        console.error('Failed to load download requests:', data.error)
      }
    } catch (error) {
      console.error('Error loading download requests:', error)
    } finally {
      setLoading(false)
    }
  }

  // 버전 관리 함수들
  const loadVersions = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/admin/versions')
      const data = await response.json()
      if (data.ok) {
        setVersions(data.versions)
      } else {
        console.error('Failed to load versions:', data.error)
      }
    } catch (error) {
      console.error('Error loading versions:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateVersion = async (versionData: Partial<AppVersion>) => {
    try {
      console.log('Updating version:', versionData)
      
      const response = await fetch('/api/admin/versions', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(versionData)
      })
      
      console.log('Response status:', response.status)
      
      if (!response.ok) {
        console.error('HTTP error:', response.status, response.statusText)
        alert(`HTTP 오류: ${response.status} ${response.statusText}`)
        return
      }
      
      const data = await response.json()
      console.log('Response data:', data)
      
      if (data.ok) {
        await loadVersions() // 새로고침
        setEditingVersion(null)
        alert('버전이 업데이트되었습니다!')
      } else {
        console.error('Failed to update version:', data.error)
        alert('버전 업데이트에 실패했습니다: ' + data.error)
      }
    } catch (error) {
      console.error('Error updating version:', error)
      alert('버전 업데이트 중 오류가 발생했습니다.')
    }
  }

  const handleFileUpload = async (version: AppVersion, file: File) => {
    if (!file) return

    // 파일 크기 사전 체크 (5GB = 5,368,709,120 bytes)
    const MAX_FILE_SIZE = 5 * 1024 * 1024 * 1024
    if (file.size > MAX_FILE_SIZE) {
      alert(`파일 크기가 너무 큽니다!\n\n파일 크기: ${(file.size / 1024 / 1024).toFixed(1)}MB\n최대 허용: 5GB (Supabase Pro 플랜)\n\n파일 크기를 줄여서 다시 시도해주세요.`)
      return
    }

    setUploadingVersion(version)
    setUploadProgress(0)
    setUploadStatus('파일 업로드 중...')

    try {
      // 직접 Supabase Storage에 업로드 (Vercel API 제한 우회)
      const { supabase } = await import('@/lib/supabase')
      
      // 파일명: 원본 파일명 그대로 사용
      const filePath = `releases/${file.name}`

      // 기존 파일이 있다면 삭제 (선택사항)
      await supabase.storage.from('app-releases').remove([filePath])

      // 진행률 시뮬레이션 (실제 업로드 진행률 추적은 복잡함)
      let uploadProgress = 0
      const progressInterval = setInterval(() => {
        uploadProgress += Math.random() * 10
        if (uploadProgress >= 90) {
          uploadProgress = 90
          clearInterval(progressInterval)
        }
        setUploadProgress(Math.floor(uploadProgress))
      }, 200)

      // Supabase Storage에 직접 업로드
      const { data, error } = await supabase.storage
        .from('app-releases')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true // 덮어쓰기 허용
        })

      clearInterval(progressInterval)

      if (error) {
        console.error('Supabase upload error:', error)
        if (error.message.includes('exceeded the maximum allowed size')) {
          throw new Error('파일 크기가 Supabase Storage 제한(5GB)을 초과했습니다.')
        } else {
          throw new Error(`업로드 실패: ${error.message}`)
        }
      }

      // 공개 URL 가져오기
      const { data: urlData } = supabase.storage
        .from('app-releases')
        .getPublicUrl(filePath)

      setUploadProgress(95)
      setUploadStatus('데이터베이스 업데이트 중...')

      // DB 업데이트
      await updateVersion({
        id: version.id,
        file_name: file.name,
        file_url: urlData.publicUrl,
        file_size: file.size
      })

      setUploadProgress(100)
      setUploadStatus('완료!')

      // 잠깐 완료 상태 보여주고 닫기
      setTimeout(() => {
        setUploadingVersion(null)
        setUploadProgress(0)
        setUploadStatus('')
      }, 1000)

      alert('파일 업로드가 완료되었습니다!')
    } catch (error) {
      console.error('Upload error:', error)
      alert(`파일 업로드 중 오류가 발생했습니다: ${error instanceof Error ? error.message : '알 수 없는 오류'}`)
      setUploadingVersion(null)
      setUploadProgress(0)
      setUploadStatus('')
    }
  }

  // 컴포넌트 마운트 시 데이터 로딩
  useEffect(() => {
    if (isLoggedIn) {
      loadUsers()
      loadDownloadRequests()
      loadVersions()
    }
  }, [isLoggedIn])

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const filteredDownloads = downloadRequests.filter(request =>
    request.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.platform.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const toggleSentStatus = async (id: number) => {
    const request = downloadRequests.find(r => r.id === id)
    if (!request) return

    const newSentStatus = !request.sent

    try {
      // 낙관적 업데이트
      setDownloadRequests(prev => 
        prev.map(r => 
          r.id === id 
            ? { ...r, sent: newSentStatus }
            : r
        )
      )

      // API 호출
      const response = await fetch('/api/admin/download-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, sent: newSentStatus }),
      })

      const data = await response.json()
      if (!data.ok) {
        // 실패 시 롤백
        setDownloadRequests(prev => 
          prev.map(r => 
            r.id === id 
              ? { ...r, sent: !newSentStatus }
              : r
          )
        )
        console.error('Failed to update download request:', data.error)
      }
    } catch (error) {
      // 오류 시 롤백
      setDownloadRequests(prev => 
        prev.map(r => 
          r.id === id 
            ? { ...r, sent: !newSentStatus }
            : r
        )
      )
      console.error('Error updating download request:', error)
    }
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // 간단한 로그인 로직 (실제로는 API 호출)
    if (loginForm.username === 'admin' && loginForm.password === 'cutple2024') {
      setIsLoggedIn(true)
    } else {
      alert(lang === 'ko' ? '로그인 정보가 올바르지 않습니다.' : 'Invalid login credentials.')
    }
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setLoginForm({ username: '', password: '' })
  }

  // 로그인하지 않은 경우 로그인 페이지 표시
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-8">
            {lang === 'ko' ? '관리자 로그인' : 'Admin Login'}
          </h1>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {lang === 'ko' ? '사용자명' : 'Username'}
              </label>
              <input
                type="text"
                value={loginForm.username}
                onChange={(e) => setLoginForm(prev => ({ ...prev, username: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {lang === 'ko' ? '비밀번호' : 'Password'}
              </label>
              <input
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {lang === 'ko' ? '로그인' : 'Login'}
            </button>
          </form>
          <p className="text-xs text-gray-500 mt-4 text-center">
            {lang === 'ko' ? '개발용: admin / cutple2024' : 'Dev: admin / cutple2024'}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* 사이드바 */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transition-transform duration-200 ease-in-out lg:shadow-none lg:border-r border-gray-200`}>
        {/* 사이드바 헤더 */}
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900">Cutple Admin</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* 네비게이션 메뉴 */}
        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {sidebarItems.map((item) => {
              const Icon = item.icon
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActivePage(item.id as PageType)
                    setSidebarOpen(false)
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activePage === item.id
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {item.label[lang]}
                </button>
              )
            })}
          </div>
        </nav>
      </div>

      {/* 사이드바 오버레이 (모바일) */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 z-40 bg-black/50" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* 메인 컨텐츠 */}
      <div className="flex-1 flex flex-col">
        {/* 상단 헤더 */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100"
              >
                <Menu className="h-5 w-5" />
              </button>
              <h2 className="text-xl font-semibold text-gray-900">
                {sidebarItems.find(item => item.id === activePage)?.label[lang]}
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-500">{lang === 'ko' ? '관리자' : 'Admin'}</span>
              <button
                onClick={handleLogout}
                className="text-sm text-red-600 hover:text-red-700 px-3 py-1 rounded-md hover:bg-red-50 transition-colors"
              >
                {lang === 'ko' ? '로그아웃' : 'Logout'}
              </button>
            </div>
          </div>
        </header>

        {/* 페이지 컨텐츠 */}
        <main className="flex-1 p-6">{renderPageContent()}</main>
      </div>
    </div>
  )

  function renderPageContent() {
    switch (activePage) {
      case 'users':
        return renderUsersPage()
      case 'downloads':
        return renderDownloadsPage()
      case 'versions':
        return renderVersionsPage()
      default:
        return renderUsersPage()
    }
  }

  function renderUsersPage() {
    return (
      <div className="space-y-6">{/* 검색 및 필터 */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder={lang === 'ko' ? '검색...' : 'Search...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="pl-10 pr-8 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">{lang === 'ko' ? '모든 상태' : 'All Status'}</option>
              <option value="verified">{lang === 'ko' ? '인증됨' : 'Verified'}</option>
              <option value="pending">{lang === 'ko' ? '대기중' : 'Pending'}</option>
            </select>
          </div>
        </div>

        {/* 사용자 테이블 */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      onClick={() => handleSort('name')}
                      className="flex items-center gap-2 hover:text-gray-700"
                    >
                      {lang === 'ko' ? '이름' : 'Name'}
                      {sortField === 'name' && (
                        sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      onClick={() => handleSort('email')}
                      className="flex items-center gap-2 hover:text-gray-700"
                    >
                      {lang === 'ko' ? '이메일' : 'Email'}
                      {sortField === 'email' && (
                        sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    <button
                      onClick={() => handleSort('signupDate')}
                      className="flex items-center gap-2 hover:text-gray-700"
                    >
                      {lang === 'ko' ? '가입일' : 'Signup Date'}
                      {sortField === 'signupDate' && (
                        sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
                      )}
                    </button>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {lang === 'ko' ? '상태' : 'Status'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {lang === 'ko' ? '마지막 로그인' : 'Last Login'}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.signupDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        user.status === 'verified' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {user.status === 'verified' ? <UserCheck className="h-3 w-3 mr-1" /> : <UserX className="h-3 w-3 mr-1" />}
                        {user.status === 'verified' 
                          ? (lang === 'ko' ? '인증됨' : 'Verified')
                          : (lang === 'ko' ? '대기중' : 'Pending')
                        }
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {user.lastLogin || (lang === 'ko' ? '없음' : 'Never')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

  function renderDownloadsPage() {
    return (
      <div className="space-y-6">
        {/* 검색 */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder={lang === 'ko' ? '이메일 또는 플랫폼 검색...' : 'Search by email or platform...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* 다운로드 요청 테이블 */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {lang === 'ko' ? '이메일' : 'Email'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {lang === 'ko' ? '플랫폼' : 'Platform'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {lang === 'ko' ? '요청 시간' : 'Request Time'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {lang === 'ko' ? '발송 상태' : 'Send Status'}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {lang === 'ko' ? '액션' : 'Actions'}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDownloads.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.platform}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{request.requestDate}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        request.sent 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        <Mail className="h-3 w-3 mr-1" />
                        {request.sent 
                          ? (lang === 'ko' ? '발송완료' : 'Sent')
                          : (lang === 'ko' ? '발송대기' : 'Pending')
                        }
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={request.sent}
                          onChange={() => toggleSentStatus(request.id)}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <label className="ml-2 text-sm text-gray-700">
                          {lang === 'ko' ? '발송완료' : 'Sent'}
                        </label>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

  function renderVersionsPage() {
    return (
      <div className="space-y-6">
        {/* 헤더 */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">버전 관리</h1>
          <p className="text-gray-600">macOS/Windows 베타 및 정식 버전 관리</p>
        </div>

        {/* 4개 고정 버전 카드 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {versions.map((version) => (
            <div 
              key={version.id} 
              className="bg-white rounded-lg border border-gray-200 p-4"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <Package className="h-5 w-5 text-gray-600" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {version.platform} {version.version_type === 'stable' ? '정식' : '베타'}
                    </h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      version.version_type === 'stable' 
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      v{version.version_number}
                    </span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingVersion(version)}
                    className="flex items-center gap-1 bg-indigo-100 text-indigo-700 px-3 py-2 rounded text-sm hover:bg-indigo-200 transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                    수정
                  </button>
                  <label className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-2 rounded text-sm hover:bg-green-200 transition-colors cursor-pointer">
                    <Upload className="h-4 w-4" />
                    파일 업로드
                    <input
                      type="file"
                      accept=".dmg,.exe,.msi,.pkg,.zip"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) {
                          handleFileUpload(version, file)
                        }
                      }}
                    />
                  </label>
                </div>
              </div>

              {/* 업로드 진행률 표시 */}
              {uploadingVersion?.id === version.id && (
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-600">{uploadStatus}</span>
                    <span className="text-sm font-medium">{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        uploadStatus === '완료!' ? 'bg-green-600' : 
                        uploadStatus.includes('데이터베이스') ? 'bg-blue-600' : 'bg-green-600'
                      }`}
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  {uploadStatus.includes('데이터베이스') && (
                    <div className="mt-2 text-xs text-blue-600">
                      파일 업로드가 완료되었습니다. 버전 정보를 업데이트하고 있습니다...
                    </div>
                  )}
                </div>
              )}

              {/* 버전 정보 (수정 중일 때는 입력 폼) */}
              {editingVersion?.id === version.id ? (
                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">버전 번호</label>
                    <input
                      type="text"
                      value={editingVersion.version_number}
                      onChange={(e) => setEditingVersion({...editingVersion, version_number: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded text-sm"
                    />
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => updateVersion(editingVersion)}
                      className="flex-1 bg-indigo-600 text-white px-3 py-2 rounded text-sm hover:bg-indigo-700 transition-colors"
                    >
                      저장
                    </button>
                    <button
                      onClick={() => setEditingVersion(null)}
                      className="flex-1 bg-gray-100 text-gray-700 px-3 py-2 rounded text-sm hover:bg-gray-200 transition-colors"
                    >
                      취소
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>파일명:</span>
                    <span className="truncate ml-2 font-mono text-xs max-w-[200px]">{version.file_name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>크기:</span>
                    <span>{(version.file_size / 1024 / 1024).toFixed(1)}MB</span>
                  </div>
                  <div className="flex justify-between">
                    <span>다운로드:</span>
                    <span>{version.download_count.toLocaleString()}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {versions.length === 0 && (
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              버전 데이터를 불러오는 중...
            </h3>
            <p className="text-gray-600">
              데이터베이스 스키마를 먼저 실행해주세요.
            </p>
          </div>
        )}
      </div>
    )
  }
}
