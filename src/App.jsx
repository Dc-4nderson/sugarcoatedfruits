import { useState, useEffect } from 'react'
import Navbar          from './components/Navbar'
import Hero            from './components/Hero'
import ProductGrid     from './components/ProductGrid'
import ReviewsSection  from './components/ReviewsSection'
import AboutSection    from './components/AboutSection'
import Checkout        from './components/Checkout'
import Cart            from './components/Cart'
import MobileCartBar   from './components/MobileCartBar'
import Footer          from './components/Footer'
import AdminLogin      from './components/AdminLogin'
import AdminDashboard  from './components/AdminDashboard'
import { useAdmin }    from './context/AdminContext'

function AdminGate() {
  const { isLoggedIn } = useAdmin()
  return isLoggedIn ? <AdminDashboard /> : <AdminLogin />
}

export default function App() {
  const [showCheckout, setShowCheckout] = useState(false)
  const [isAdmin,      setIsAdmin]      = useState(false)

  // Detect #admin hash
  useEffect(() => {
    const check = () => setIsAdmin(window.location.hash === '#admin')
    check()
    window.addEventListener('hashchange', check)
    return () => window.removeEventListener('hashchange', check)
  }, [])

  const goToCheckout = () => {
    setShowCheckout(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goBack = () => {
    setShowCheckout(false)
    setTimeout(() => {
      document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  if (isAdmin) return <AdminGate />

  return (
    <div className="min-h-screen bg-brand-bg font-body text-brand-text">
      <Navbar />

      {showCheckout ? (
        <main className="pt-16">
          <Checkout onBack={goBack} />
        </main>
      ) : (
        <main>
          <Hero />
          <ProductGrid />
          <ReviewsSection />
          <AboutSection />
        </main>
      )}

      <Footer />
      <Cart onCheckout={goToCheckout} />
      <MobileCartBar />
    </div>
  )
}
