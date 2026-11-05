const currency = new Intl.NumberFormat('es-BO', { style: 'currency', currency: 'USD' })

export default function StatsCards({ products }) {
  const totalUnits = products.reduce((sum, p) => sum + p.stock, 0)
  const inventoryValue = products.reduce((sum, p) => sum + p.stock * p.price, 0)
  const outOfStock = products.filter((p) => p.stock === 0).length

  const stats = [
    { label: 'Productos', value: products.length, accent: 'text-sky-400' },
    { label: 'Unidades en stock', value: totalUnits, accent: 'text-emerald-400' },
    { label: 'Valor del inventario', value: currency.format(inventoryValue), accent: 'text-violet-400' },
    { label: 'Agotados', value: outOfStock, accent: 'text-rose-400' },
  ]

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((s) => (
        <div key={s.label} className="rounded-2xl border border-slate-800 bg-slate-900 p-4">
          <p className="text-xs uppercase tracking-wider text-slate-400">{s.label}</p>
          <p className={`mt-1 text-2xl font-bold ${s.accent}`}>{s.value}</p>
        </div>
      ))}
    </div>
  )
}
