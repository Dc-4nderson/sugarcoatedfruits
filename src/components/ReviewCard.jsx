function Stars({ count }) {
  return (
    <div className="flex gap-0.5" aria-label={`${count} out of 5 stars`}>
      {[1,2,3,4,5].map(i => (
        <svg key={i} className={`w-4 h-4 ${i <= count ? 'text-yellow-400' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function ReviewCard({ review }) {
  return (
    <article className="bg-white rounded-3xl border-2 border-brand-pink-light shadow-pink p-5 flex flex-col gap-3 min-w-[272px] max-w-[320px] md:min-w-0 md:max-w-none snap-start hover:-translate-y-1 hover:shadow-pink-md transition-all duration-200">
      <Stars count={review.stars} />
      <p className="text-brand-text text-sm leading-relaxed flex-1">
        &ldquo;{review.text}&rdquo;
      </p>
      <div className="flex items-center justify-between pt-2 border-t border-brand-pink-light">
        <span className="font-bold text-brand-text text-sm">{review.name}</span>
        <span className="text-brand-text/35 text-xs">{review.date}</span>
      </div>
    </article>
  )
}
