import { createContext, useContext, useState, useEffect } from 'react'

// NOTE: VITE_ env vars are bundled into the client JS.
// This is acceptable for a personal admin panel on a private deployment.
// For a public production site, replace login() with a backend API call.
const ADMIN_EMAIL    = import.meta.env.VITE_ADMIN_EMAIL?.trim()
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD?.trim()

const AdminContext = createContext(null)

function loadJSON(key, fallback) {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback }
  catch { return fallback }
}

export function AdminProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    () => sessionStorage.getItem('scf-admin') === '1'
  )
  const [loginError, setLoginError] = useState('')

  // Custom products stored in localStorage
  const [customProducts, setCustomProducts] = useState(
    () => loadJSON('scf-custom-products', [])
  )

  useEffect(() => {
    localStorage.setItem('scf-custom-products', JSON.stringify(customProducts))
  }, [customProducts])

  // Customer-submitted reviews stored in localStorage
  const [userReviews, setUserReviews] = useState(
    () => loadJSON('scf-user-reviews', [])
  )

  useEffect(() => {
    localStorage.setItem('scf-user-reviews', JSON.stringify(userReviews))
  }, [userReviews])

  const addUserReview = (review) => {
    const id = 'review-' + Date.now()
    setUserReviews(prev => [{ ...review, id }, ...prev])
  }

  const deleteUserReview = (id) => {
    setUserReviews(prev => prev.filter(r => r.id !== id))
  }

  const login = (email, password) => {
    if (email.trim() === ADMIN_EMAIL && password.trim() === ADMIN_PASSWORD) {
      sessionStorage.setItem('scf-admin', '1')
      setIsLoggedIn(true)
      setLoginError('')
      return true
    }
    setLoginError('Incorrect email or password.')
    return false
  }

  const logout = () => {
    sessionStorage.removeItem('scf-admin')
    setIsLoggedIn(false)
  }

  const addCustomProduct = (product) => {
    const id = 'custom-' + Date.now()
    setCustomProducts(prev => [...prev, { ...product, id }])
  }

  const removeCustomProduct = (id) => {
    setCustomProducts(prev => prev.filter(p => p.id !== id))
  }

  return (
    <AdminContext.Provider value={{
      isLoggedIn, login, logout, loginError,
      customProducts, addCustomProduct, removeCustomProduct,
      userReviews, addUserReview, deleteUserReview,
    }}>
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const ctx = useContext(AdminContext)
  if (!ctx) throw new Error('useAdmin must be used inside AdminProvider')
  return ctx
}
