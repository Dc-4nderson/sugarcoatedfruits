const FLAVOR_EMOJI = { Watermelon: '🍉', Strawberry: '🍓', Grape: '🍇', Blueberry: '🫐' }
const PRODUCT_EMOJI = (name) =>
  name.includes('Grape') ? '🍇' : name.includes('Pineapple') ? '🍍' : '🍓'

export default function CartItem({ item, index, onUpdate, onRemove }) {
  return (
    <div className="flex gap-3 p-3 bg-brand-pink-light rounded-2xl">
      <span className="text-3xl select-none pt-0.5">{PRODUCT_EMOJI(item.name)}</span>

      <div className="flex-1 min-w-0">
        <p className="font-bold text-brand-text text-sm truncate">{item.name}</p>
        <p className="text-xs text-brand-text/60 mt-0.5">
          {item.size} &middot; {FLAVOR_EMOJI[item.flavor]} {item.flavor}
        </p>

        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={() => onUpdate(index, item.quantity - 1)}
            className="w-7 h-7 rounded-full bg-brand-pink text-white font-bold text-base flex items-center justify-center hover:bg-brand-pink-dark transition-colors"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="font-bold text-brand-text w-5 text-center text-sm">{item.quantity}</span>
          <button
            onClick={() => onUpdate(index, item.quantity + 1)}
            className="w-7 h-7 rounded-full bg-brand-pink text-white font-bold text-base flex items-center justify-center hover:bg-brand-pink-dark transition-colors"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex flex-col items-end justify-between shrink-0">
        <button
          onClick={() => onRemove(index)}
          className="text-brand-text/30 hover:text-brand-red transition-colors text-xl leading-none"
          aria-label="Remove item"
        >
          ×
        </button>
        <span className="font-bold text-brand-pink text-sm">
          ${(item.unitPrice * item.quantity).toFixed(2)}
        </span>
      </div>
    </div>
  )
}
