import { useCallback, useEffect, useRef, useState } from 'react'
import { createProduct, getErrorMessage, getProducts, updateStock } from '../api/productsApi'

const POLL_INTERVAL_MS = 5000

export function useProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastUpdated, setLastUpdated] = useState(null)
  const pendingRef = useRef(new Map())

  const refresh = useCallback(async () => {
    try {
      const data = await getProducts()
      const pending = pendingRef.current
      setProducts(
        [...data]
          .sort((a, b) => a.id - b.id)
          .map((p) => (pending.has(p.id) ? { ...p, stock: pending.get(p.id) } : p)),
      )
      setError(null)
      setLastUpdated(new Date())
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
    const id = setInterval(refresh, POLL_INTERVAL_MS)
    return () => clearInterval(id)
  }, [refresh])

  const addProduct = useCallback(async (values) => {
    const created = await createProduct(values)
    setProducts((prev) => [...prev, created])
    return created
  }, [])

  const sellOne = useCallback(async (product) => {
    if (product.stock <= 0) return
    const newStock = product.stock - 1
    pendingRef.current.set(product.id, newStock)
    setProducts((prev) => prev.map((p) => (p.id === product.id ? { ...p, stock: newStock } : p)))

    try {
      const updated = await updateStock(product, newStock)
      if (pendingRef.current.get(product.id) === newStock) pendingRef.current.delete(product.id)
      if (updated && typeof updated.stock === 'number') {
        setProducts((prev) =>
          prev.map((p) =>
            p.id === product.id && !pendingRef.current.has(p.id) ? { ...p, ...updated } : p,
          ),
        )
      }
    } catch (err) {
      pendingRef.current.delete(product.id)
      setProducts((prev) =>
        prev.map((p) => (p.id === product.id ? { ...p, stock: p.stock + 1 } : p)),
      )
      throw new Error(getErrorMessage(err), { cause: err })
    }
  }, [])

  return { products, loading, error, lastUpdated, refresh, addProduct, sellOne }
}
