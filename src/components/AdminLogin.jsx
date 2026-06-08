import { useState } from 'react'
import { useAdmin } from '../context/AdminContext'

const inputClass = 'w-full px-4 py-3 rounded-xl border-2 border-brand-pink-light focus:border-brand-pink focus:outline-none bg-white text-brand-text placeholder:text-brand-text/30 transition-colors'

export default function AdminLogin() {
  const { login, loginError } = useAdmin()
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [loading,  setLoading]  = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    // Small delay so it feels like a real auth round-trip
    await new Promise(r => setTimeout(r, 400))
    login(email, password)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-brand-bg flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <img src="/logo.jpg" alt="Sugar Coated Fruitzz" className="w-24 h-24 rounded-2xl mx-auto mb-4 shadow-pink" />
          <h1 className="font-display text-3xl font-bold text-brand-text">Admin Panel</h1>
          <p className="text-brand-text/50 text-sm mt-1">Sugar Coated Fruitzz by Amere</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl border-2 border-brand-pink-light shadow-pink p-8 space-y-4"
        >
          <div>
            <label className="block text-sm font-bold text-brand-text mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@example.com"
              required
              autoComplete="email"
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-brand-text mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              autoComplete="current-password"
              className={inputClass}
            />
          </div>

          {loginError && (
            <p className="text-sm text-red-500 font-medium bg-red-50 px-4 py-2 rounded-xl border border-red-200">
              {loginError}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-brand-pink text-white rounded-full font-display font-bold text-lg shadow-pink-md hover:bg-brand-pink-dark transition-all duration-200 disabled:opacity-60 touch-manipulation"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-xs text-brand-text/30 mt-6">
          Admin access only &mdash; <a href="/" className="hover:text-brand-pink transition-colors">back to site</a>
        </p>
      </div>
    </div>
  )
}
