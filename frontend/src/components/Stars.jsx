

export default function Stars({ rating = 4, reviews }) {
  return (
    <div className="flex items-center gap-1 text-xs">
      <span className="star tracking-tight">
        {'★'.repeat(rating)}
        <span className="text-line">{'★'.repeat(5 - rating)}</span>
      </span>
      {reviews != null && <span className="text-stone">({reviews})</span>}
    </div>
  )
}