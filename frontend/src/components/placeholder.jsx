

export default function Placeholder({ className = '', label }) {
  return (
    <div
      className={`relative flex items-center justify-center bg-white border border-line overflow-hidden ${className}`}
    >
      <svg width="40%" height="40%" viewBox="0 0 24 24" fill="none" stroke="#C7C3B4" strokeWidth="1">
        <rect x="2" y="4" width="20" height="16" rx="1" />
        <path d="M2 16l5-5 4 4 5-6 6 7" />
        <circle cx="8" cy="9" r="1.3" />
      </svg>
      {label && (
        <span className="absolute bottom-1.5 left-1.5 text-[10px] text-stone">{label}</span>
      )}
    </div>
  )
}