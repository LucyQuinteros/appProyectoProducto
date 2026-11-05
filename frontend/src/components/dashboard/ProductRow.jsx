import { useState } from 'react'

const currency = new Intl.NumberFormat('es-BO', { style: 'currency', currency: 'USD' })

function ProductThumb({ src }) {
  const [failed, setFailed] = useState(false)
  if (src && !failed) {
    return <img src={src} alt="" onError={() => setFailed(true)} className="h-9 w-9 rounded-lg object-cover" />
  }
  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-800 text-sky-400">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden>
        <rect x="3" y="4" width="18" height="12" rx="2" />
        <path d="M8 20h8M12 16v4" />
      </svg>
    </div>
  )
}

function StockBadge({ stock }) {
  const style =
    stock === 0
      ? 'bg-rose-500/15 text-rose-300 ring-rose-500/30'
      : stock <= 5
        ? 'bg-amber-500/15 text-amber-300 ring-amber-500/30'
        : 'bg-emerald-500/15 text-emerald-300 ring-emerald-500/30'
  return (
    <span className={`inline-flex min-w-16 justify-center rounded-full px-3 py-1 text-sm font-semibold ring-1 ${style}`}>
      {stock}
    </span>
  )
}

export default function ProductRow({ product, onSell }) {
  const soldOut = product.stock <= 0

  return (
    <tr className="border-t border-slate-800 transition hover:bg-slate-800/40">
      <td className="px-4 py-3 text-slate-500">#{product.id}</td>
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <ProductThumb src={product.image_url} />
          <span className="font-medium">{product.name}</span>
        </div>
      </td>
      <td className="px-4 py-3 text-slate-300">{currency.format(product.price)}</td>
      <td className="px-4 py-3 text-center">
        <StockBadge stock={product.stock} />
      </td>
      <td className="px-4 py-3 text-right">
        <button
          onClick={() => onSell(product)}
          disabled={soldOut}
          className="rounded-lg bg-emerald-500 px-3 py-2 text-sm font-semibold text-white transition hover:bg-emerald-400 active:scale-95 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
        >
          {soldOut ? 'Agotado' : 'Vender 1 Unidad'}
        </button>
      </td>
    </tr>
  )
}
