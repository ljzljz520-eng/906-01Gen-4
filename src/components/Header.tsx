import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Search,
  Menu,
  ChevronDown,
  LogIn,
  LogOut,
  User,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLawyerStore } from '@/store/useLawyerStore'
import categories from '@/data/categories.json'
import type { Category } from '@/types'

export default function Header() {
  const navigate = useNavigate()
  const { isLoggedIn, currentLawyer, logout } = useLawyerStore()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-md z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary-900 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">法</span>
            </div>
            <span className="text-xl font-bold text-primary-900 hidden sm:block">
              社区法律文书模板库
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-primary-900 font-medium transition-colors"
            >
              首页
            </Link>

            <div
              className="relative"
              onMouseEnter={() => setCategoryDropdownOpen(true)}
              onMouseLeave={() => setCategoryDropdownOpen(false)}
            >
              <button className="flex items-center space-x-1 text-gray-700 hover:text-primary-900 font-medium transition-colors">
                <span>分类</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {categoryDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 animate-scale-in">
                  {(categories as Category[]).map((category) => (
                    <Link
                      key={category.id}
                      to={`/category/${category.id}`}
                      className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-900 transition-colors"
                      onClick={() => setCategoryDropdownOpen(false)}
                    >
                      {category.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

          <div className="flex items-center space-x-4">
            <form onSubmit={handleSearch} className="hidden sm:flex items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="搜索模板..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-48 lg:w-64 pl-10 pr-4 py-2 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </form>

            {isLoggedIn && currentLawyer ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-primary-700" />
                  </div>
                  <span className="hidden lg:block text-sm font-medium text-gray-700">
                    {currentLawyer.name}
                  </span>
                </button>

                <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">
                      {currentLawyer.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      执业证号: {currentLawyer.licenseNumber}
                    </p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>退出登录</span>
                  </button>
                </div>
              </div>
            ) : (
              <Link
                to="/lawyer/login"
                className="flex items-center space-x-2 px-4 py-2 bg-primary-900 text-white rounded-lg hover:bg-primary-800 transition-colors"
              >
                <LogIn className="w-4 h-4" />
                <span className="hidden sm:block">律师登录</span>
              </Link>
            )}

            <button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 animate-slide-in-right">
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="搜索模板..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              </div>
            </form>

            <nav className="space-y-2">
              <Link
                to="/"
                className="block px-4 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-900 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                首页
              </Link>

              <div className="space-y-1">
                <p className="px-4 py-2 text-sm font-medium text-gray-500">分类</p>
                {(categories as Category[]).map((category) => (
                  <Link
                    key={category.id}
                    to={`/category/${category.id}`}
                    className={cn(
                      'block px-6 py-2 text-gray-700 hover:bg-primary-50 hover:text-primary-900 rounded-lg transition-colors'
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                ))}
              </div>

              {!isLoggedIn && (
                <Link
                  to="/lawyer/login"
                  className="flex items-center space-x-2 px-4 py-2 bg-primary-900 text-white rounded-lg hover:bg-primary-800 transition-colors mt-4"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <LogIn className="w-4 h-4" />
                  <span>律师登录</span>
                </Link>
              )}

              {isLoggedIn && currentLawyer && (
                <div className="border-t border-gray-100 pt-4 mt-4">
                  <div className="px-4 py-2">
                    <p className="text-sm font-medium text-gray-900">
                      {currentLawyer.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      执业证号: {currentLawyer.licenseNumber}
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      handleLogout()
                      setMobileMenuOpen(false)
                    }}
                    className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>退出登录</span>
                  </button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
