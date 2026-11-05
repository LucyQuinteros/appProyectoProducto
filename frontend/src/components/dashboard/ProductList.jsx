import ProductRow from './ProductRow'

export default function ProductList({ products, loading, error, lastUpdated, onRefresh, onSell }) {
  return (
    <section className="flex flex-col overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 px-5 py-4">
        <div>
          <h3 className="text-lg font-semibold">Inventario</h3>
          <p className="flex items-center gap-2 text-xs text-slate-400">
            <span className={`h-2 w-2 rounded-full ${error ? 'bg-rose-500' : 'animate-pulse bg-emerald-500'}`} />
            {error
              ? 'Sin conexión con la API'
              : lastUpdated
                ? `En vivo · actualizado ${lastUpdated.toLocaleTimeString()}`
                : 'Conectando…'}
          </p>
        </div>
        <button
          onClick={onRefresh}
          className="rounded-lg border border-slate-700 px-3 py-1.5 text-sm text-slate-300 transition hover:bg-slate-800"
        >
          Actualizar
        </button>
      </div>

      {error && <p className="bg-rose-500/10 px-5 py-3 text-sm text-rose-300">{error}</p>}

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-950/50 text-xs uppercase tracking-wider text-slate-400">
            <tr>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Nombre</th>
              <th className="px-4 py-3">Precio</th>
              <th className="px-4 py-3 text-center">Stock</th>
              <th className="px-4 py-3 text-right">Acción</th>
            </tr>
          </thead>
          <tbody>
            {loading && products.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-slate-400">
                  Cargando productos… (la API en Render puede tardar unos segundos en despertar)
                </td>
              </tr>
            )}
            {!loading && products.length === 0 && !error && (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-slate-400">
                  No hay productos registrados todavía.
                </td>
              </tr>
            )}
            {products.map((p) => (
              <ProductRow key={p.id} product={p} onSell={onSell} />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
