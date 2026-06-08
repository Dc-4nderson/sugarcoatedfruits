const FLAVOR_STYLES = {
  Watermelon: { pill: 'bg-red-100 text-red-600 border-red-300 hover:bg-red-200',    ring: 'ring-red-400'    },
  Strawberry: { pill: 'bg-pink-100 text-pink-600 border-pink-300 hover:bg-pink-200', ring: 'ring-pink-400'   },
  Grape:      { pill: 'bg-purple-100 text-purple-700 border-purple-300 hover:bg-purple-200', ring: 'ring-purple-400' },
  Blueberry:  { pill: 'bg-blue-100 text-blue-600 border-blue-300 hover:bg-blue-200', ring: 'ring-blue-400'   },
}

const FLAVOR_EMOJI = { Watermelon: '🍉', Strawberry: '🍓', Grape: '🍇', Blueberry: '🫐' }

export default function FlavorSelector({ flavors, selected, onChange }) {
  return (
    <div>
      <p className="text-xs font-bold text-brand-text/50 uppercase tracking-wide mb-2">
        Flavor ✨ Mix &amp; Match!
      </p>
      <div className="flex flex-wrap gap-2">
        {flavors.map(flavor => {
          const s = FLAVOR_STYLES[flavor]
          const isSelected = selected === flavor
          return (
            <button
              key={flavor}
              type="button"
              onClick={() => onChange(flavor)}
              className={`px-3 py-1.5 rounded-full border-2 text-sm font-bold transition-all duration-200 ${s.pill} ${
                isSelected ? `ring-2 ring-offset-1 ${s.ring} scale-105 shadow-md` : ''
              }`}
            >
              {FLAVOR_EMOJI[flavor]} {flavor}
            </button>
          )
        })}
      </div>
    </div>
  )
}
