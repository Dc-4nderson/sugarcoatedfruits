import ReviewCard from './ReviewCard'
import reviews from '../data/reviews.json'

export default function ReviewsSection() {
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
          {reviews.map((review, i) => (
            <ReviewCard key={i} review={review} />
          ))}
        </div>

      </div>
    </section>
  )
}
