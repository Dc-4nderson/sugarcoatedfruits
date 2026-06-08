export default function AboutSection() {
  return (
    <section id="about" className="py-20 px-4 bg-brand-pink-light">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-10">

          {/* Avatar circle */}
          <div className="shrink-0">
            <div
              className="w-40 h-40 rounded-full bg-gradient-to-br from-brand-pink to-brand-hot-pink flex items-center justify-center text-7xl shadow-pink-lg border-4 border-white"
              role="img"
              aria-label="Chef avatar"
            >
              👩🏽‍🍳
              {/* TODO: Real photo of Amere */}
            </div>
          </div>

          {/* Text */}
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-brand-text mb-4">
              Meet the Maker 👑
            </h2>
            <p className="text-brand-text/80 text-lg leading-relaxed">
              Hi, I&rsquo;m <strong className="text-brand-pink">Amere</strong> &mdash; a 13-year-old
              entrepreneur from Jacksonville, FL! I started Sugar Coated Fruitzz because I love making
              sweet treats for my family and friends. Every order is handmade with love, using fresh
              fruit and premium candy coatings. Thank you for supporting my small business!
            </p>
            <div className="flex flex-wrap gap-3 mt-6">
              {['🍓 Handmade', '🏡 Jacksonville, FL', '👑 Age 13', '✨ Made with love'].map(tag => (
                <span key={tag} className="px-4 py-2 bg-white rounded-full text-brand-pink font-bold text-sm shadow-pink">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
