import { useState } from 'react'

const EMPTY = { name: '', price: '', stock: '' }

export default function ProductForm({ onSubmit }) {
  const [values, setValues] = useState(EMPTY)
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => setValues((v) => ({ ...v, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await onSubmit({
        name: values.name.trim(),
        price: parseFloat(values.price),
        stock: parseInt(values.stock, 10),
      })
      setValues(EMPTY)
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass =
    'w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/30'

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-5">
      <h3 className="text-lg font-semibold">Registrar nuevo producto</h3>
      <label className="flex flex-col gap-1 text-sm">
        <span className="text-slate-300">Nombre</span>
        <input
          name="name"
          required
          value={values.name}
          onChange={handleChange}
          placeholder="Ej: Laptop Lenovo IdeaPad"
          className={inputClass}
        />
      </label>
      <div className="grid grid-cols-2 gap-3">
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-slate-300">Precio (USD)</span>
          <input
            name="price"
            type="number"
            min="0"
            step="0.01"
            required
            value={values.price}
            onChange={handleChange}
            placeholder="0.00"
            className={inputClass}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          <span className="text-slate-300">Stock</span>
          <input
            name="stock"
            type="number"
            min="0"
            step="1"
            required
            value={values.stock}
            onChange={handleChange}
            placeholder="0"
            className={inputClass}
          />
        </label>
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="rounded-lg bg-sky-500 px-4 py-2 font-semibold text-white transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? 'Guardando…' : 'Agregar producto'}
      </button>
    </form>
  )
}
