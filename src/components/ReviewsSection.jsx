import { useState } from 'react'
import ReviewCard from './ReviewCard'
import seedReviews from '../data/reviews.json'
import { useAdmin } from '../context/AdminContext'

const inputClass =
  'w-full px-4 py-3 rounded-xl border-2 border-brand-pink-light focus:border-brand-pink focus:outline-none bg-white text-brand-text placeholder:text-brand-text/30 transition-colors text-sm'

function StarPicker({ value, onChange }) {
  const [hovered, setHovered] = useState(0)
  return (
    <div className="flex gap-1" role="group" aria-label="Star rating">
      {[1, 2, 3, 4, 5].map(star => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          className="touch-manipulation focus:outline-none"
          aria-label={`${star} star${star !== 1 ? 's' : ''}`}
        >
          <svg
            className={`w-8 h-8 transition-colors ${star <= (hovered || value) ? 'text-yellow-400' : 'text-gray-200'}`}
            fill="currentColor" viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </button>
      ))}
    </div>
  )
}

function ReviewForm() {
  const { addUserReview } = useAdmin()
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState({ name: '', text: '', stars: 0 })
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (form.stars === 0) { setError('Please select a star rating.'); return }
    if (!form.name.trim()) { setError('Please enter your name.'); return }
    if (form.text.trim().length < 10) { setError('Review must be at least 10 characters.'); return }

    const now = new Date()
    const date = now.toLocaleString('en-US', { month: 'long', year: 'numeric' })
    addUserReview({ name: form.name.trim(), text: form.text.trim(), stars: form.stars, date })
    setSubmitted(true)
    setForm({ name: '', text: '', stars: 0 })
    setError('')
    setTimeout(() => { setSubmitted(false); setOpen(false) }, 2500)
  }

  if (!open) {
    return (
      <div className="text-center mt-10">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="px-8 py-3 bg-brand-pink text-white rounded-full font-display font-bold text-base shadow-pink-md hover:bg-brand-pink-dark active:scale-95 transition-all touch-manipulation"
        >
          ✍️ Leave a Review
        </button>
      </div>
    )
  }

  return (
    <div className="mt-10 max-w-lg mx-auto">
      <div className="bg-white rounded-3xl border-2 border-brand-pink-light shadow-pink p-6">
        <h3 className="font-display text-2xl font-bold text-brand-text mb-5">Leave a Review ♥</h3>

        {submitted ? (
          <div className="text-center py-8">
            <p className="text-4xl mb-3">🎉</p>
            <p className="font-bold text-brand-text text-lg">Thank you!</p>
            <p className="text-brand-text/50 text-sm mt-1">Your review has been posted.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {error && (
              <p className="text-sm text-red-500 bg-red-50 border border-red-200 px-4 py-2 rounded-xl">{error}</p>
            )}

            <div>
              <label className="block text-xs font-bold text-brand-text/60 mb-1">Your Rating *</label>
              <StarPicker value={form.stars} onChange={v => setForm(p => ({ ...p, stars: v }))} />
            </div>

            <div>
              <label className="block text-xs font-bold text-brand-text/60 mb-1">Your Name *</label>
              <input
                type="text"
                value={form.name}
                onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                placeholder="e.g. Jasmine"
                className={inputClass}
                maxLength={50}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-brand-text/60 mb-1">Your Review *</label>
              <textarea
                value={form.text}
                onChange={e => setForm(p => ({ ...p, text: e.target.value }))}
                placeholder="Tell us what you thought..."
                rows={3}
                className={`${inputClass} resize-none`}
                maxLength={300}
              />
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => { setOpen(false); setError('') }}
                className="flex-1 py-3 rounded-full border-2 border-brand-pink-light text-brand-text/60 font-bold text-sm hover:border-brand-pink transition-all touch-manipulation"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 py-3 bg-brand-pink text-white rounded-full font-display font-bold text-sm shadow-pink-md hover:bg-brand-pink-dark active:scale-95 transition-all touch-manipulation"
              >
                Post Review
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default function ReviewsSection() {
  const { userReviews } = useAdmin()
  const allReviews = [...userReviews, ...seedReviews]

  return (
    <section id="reviews" className="py-14 md:py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-10">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-brand-text">
            Reviews ♥
          </h2>
        </div>

        {/* Text reviews: horizontal scroll mobile, 3-col grid desktop */}
        <div className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide md:grid md:grid-cols-3 md:overflow-visible md:pb-0 md:gap-6">
          {allReviews.map((review, i) => (
            <ReviewCard key={review.id ?? i} review={review} />
          ))}
        </div>

        <ReviewForm />

      </div>
    </section>
  )
}

