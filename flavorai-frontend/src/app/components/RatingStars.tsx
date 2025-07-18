'use client'

type Props = {
  value?: number
  onRate?: (value: number) => void
}

export default function RatingStars({ value = 0, onRate }: Props) {
  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map(star => (
        <button
          type="button"
          key={star}
          onClick={() => onRate?.(star)}
          className={star <= value ? 'text-yellow-400 cursor-pointer' : 'text-gray-400 cursor-pointer'}
        >
          ★
        </button>
      ))}
    </div>
  )
}
