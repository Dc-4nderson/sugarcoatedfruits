const FOOTER_LINKS = [
  { href: '#home',     label: 'Home'     },
  { href: '#products', label: 'Menu'     },
  { href: '#reviews',  label: 'Reviews'  },
  { href: '#about',    label: 'About'    },
]

export default function Footer() {
  return (
    <footer className="bg-brand-text text-white py-14 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-10 mb-10">

          {/* Brand */}
          <div>
            <p className="font-display text-2xl text-brand-pink-light font-bold">
              Sugar Coated Fruitzz 👑
            </p>
            <p className="text-white/50 font-display italic mt-1">by Amere</p>
            <p className="text-white/40 text-sm mt-3">&ldquo;Fresh. Premium. Unforgettable.&rdquo;</p>
          </div>

          {/* Details */}
          <div className="flex flex-col gap-2 text-white/65 text-sm">
            <p>📍 Jacksonville, FL</p>
            <p>⏰ Made to order — 48-hour turnaround</p>
            <p>🚗 Delivery within 20 miles</p>
          </div>

          {/* Social + nav */}
          <div className="flex flex-col gap-4">
            <a
              href="https://instagram.com/sugarcoated.fruitzz"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-brand-pink-light font-bold hover:text-brand-hot-pink transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
              @sugarcoated.fruitzz
            </a>
            <nav className="flex flex-wrap gap-4" aria-label="Footer navigation">
              {FOOTER_LINKS.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  className="text-sm text-white/45 hover:text-white transition-colors"
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 text-center text-white/25 text-xs space-y-1">
          <p>&copy; {new Date().getFullYear()} Sugar Coated Fruitzz by Amere. All rights reserved.</p>
          <p>Jacksonville, FL &middot; Made with ♥</p>
        </div>
      </div>
    </footer>
  )
}
