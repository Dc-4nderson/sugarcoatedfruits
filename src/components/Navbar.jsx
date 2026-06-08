import { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'

const NAV_LINKS = [
  { href: '#products', label: 'Menu'    },
  { href: '#reviews',  label: 'Reviews' },
  { href: '#about',    label: 'About'   },
]

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false)
  const [mobileOpen,  setMobileOpen]  = useState(false)
  const { count, setIsOpen } = useCart()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => setMobileOpen(false)

  return (
    <nav className={`fixed top-0 inset-x-0 z-30 bg-white/95 backdrop-blur-sm border-b-2 border-brand-pink-light transition-shadow duration-300 ${scrolled ? 'shadow-pink-md' : ''}`}>
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">

        {/* Brand */}
        <a href="#home" className="font-display text-xl font-bold text-brand-pink" onClick={close}>
          Sugar Coated{' '}
          <span className="bg-gradient-to-r from-brand-red via-brand-green to-brand-blue bg-clip-text text-transparent">
            Fruitzz
          </span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="font-body font-bold text-brand-text/70 hover:text-brand-pink transition-colors"
            >
              {label}
            </a>
          ))}
        </div>

        {/* Cart + hamburger */}
        <div className="flex items-center gap-3">
          {/* Cart button */}
          <button
            onClick={() => setIsOpen(true)}
            className="relative p-2.5 rounded-full bg-brand-pink-light hover:bg-brand-pink group transition-colors"
            aria-label={`Open cart — ${count} item${count !== 1 ? 's' : ''}`}
          >
            <svg
              className="w-5 h-5 text-brand-pink group-hover:text-white transition-colors"
              fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {count > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-brand-hot-pink text-white text-xs font-bold rounded-full flex items-center justify-center leading-none">
                {count > 9 ? '9+' : count}
              </span>
            )}
          </button>

          {/* Hamburger */}
          <button
            className="md:hidden p-2 flex flex-col gap-[5px]"
            onClick={() => setMobileOpen(o => !o)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
          >
            <span className={`block w-5 h-0.5 bg-brand-text rounded transition-all duration-300 origin-center ${mobileOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
            <span className={`block w-5 h-0.5 bg-brand-text rounded transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 bg-brand-text rounded transition-all duration-300 origin-center ${mobileOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t-2 border-brand-pink-light px-4 py-4 flex flex-col gap-4">
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="font-body font-bold text-brand-text text-lg hover:text-brand-pink transition-colors"
              onClick={close}
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
