export default function Hero() {
  const bgFruits = [
    { emoji: '🍓', top: '10%',  left:  '5%',   delay: '0s',    size: '3.5rem' },
    { emoji: '🍇', top: '62%',  left:  '3%',   delay: '0.9s',  size: '2.8rem' },
    { emoji: '🍍', top: '15%',  right: '6%',   delay: '1.8s',  size: '3.5rem' },
    { emoji: '🫐', bottom: '18%', right: '5%', delay: '0.4s',  size: '3rem'   },
    { emoji: '🍓', top: '45%',  right: '4%',   delay: '1.3s',  size: '2.2rem' },
    { emoji: '🍇', bottom: '30%', left: '8%',  delay: '2.1s',  size: '2.5rem' },
  ]

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-pink via-brand-hot-pink to-pink-400 overflow-hidden pt-16">
      {/* Floating bg fruits */}
      {bgFruits.map((f, i) => (
        <span
          key={i}
          className="absolute pointer-events-none select-none opacity-20"
          style={{
            top: f.top, left: f.left, right: f.right, bottom: f.bottom,
            fontSize: f.size,
            animationName: 'bounce',
            animationDuration: `${3 + i * 0.4}s`,
            animationDelay: f.delay,
            animationTimingFunction: 'ease-in-out',
            animationIterationCount: 'infinite',
          }}
          aria-hidden="true"
        >
          {f.emoji}
        </span>
      ))}

      <div className="relative z-10 flex flex-col items-center text-center px-4 gap-8 max-w-2xl mx-auto">
        {/* Logo */}
        <div className="animate-logo-pop">
          <img
            src="/logo.jpg"
            alt="Sugar Coated Fruitzz by Amere"
            className="w-full max-w-xs md:max-w-sm rounded-2xl shadow-2xl"
          />
        </div>

        {/* Tagline */}
        <div className="bg-black/25 backdrop-blur-sm rounded-full px-8 py-3">
          <p className="font-display text-xl md:text-2xl font-bold text-white tracking-widest uppercase">
            Sweet. Juicy. Irresistible.
          </p>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-3 justify-center">
          {['✨ Made to Order', '⏰ 48-Hour Notice', '🚗 Jax Delivery'].map(badge => (
            <span
              key={badge}
              className="bg-white/20 backdrop-blur-sm border border-white/40 text-white font-bold text-sm px-4 py-2 rounded-full"
            >
              {badge}
            </span>
          ))}
        </div>

        {/* CTA */}
        <a
          href="#products"
          className="px-10 py-4 bg-white text-brand-pink rounded-full font-display font-bold text-xl shadow-2xl hover:scale-105 hover:shadow-[0_20px_60px_rgba(255,255,255,0.3)] transition-all duration-300"
        >
          Order Now 🍬
        </a>
      </div>

      {/* Scroll dot */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-60" aria-hidden="true">
        <div className="w-2 h-2 bg-white rounded-full animate-bounce" />
      </div>
    </section>
  )
}
