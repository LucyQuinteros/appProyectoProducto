import { getErrorMessage } from '../../api/productsApi'
import { useProducts } from '../../hooks/useProducts'
import { useToasts } from '../../hooks/useToasts'
import Navbar from '../layout/Navbar'
import Toast from '../ui/Toast'
import ProductForm from './ProductForm'
import ProductList from './ProductList'
import StatsCards from './StatsCards'

export default function Dashboard() {
  const { products, loading, error, lastUpdated, refresh, addProduct, sellOne } = useProducts()
  const { toasts, notify, dismiss } = useToasts()

  const handleCreate = async (values) => {
    try {
      const created = await addProduct(values)
      notify(`Producto "${created.name}" registrado.`)
    } catch (err) {
      notify(getErrorMessage(err), 'error')
      throw err
    }
  }

  const handleSell = async (product) => {
    try {
      await sellOne(product)
      notify(`Venta registrada: ${product.name}`)
    } catch (err) {
      notify(err.message, 'error')
    }
  }

  return (
    <div className="flex min-h-full flex-col">
      <Navbar />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-6 p-6">
        <div>
          <h2 className="text-2xl font-bold">Panel de Control de Ventas e Inventario</h2>
          <p className="text-sm text-slate-400">Gestiona los productos de la tabla products en tiempo real.</p>
        </div>
        <StatsCards products={products} />
        <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
          <div className="lg:sticky lg:top-20 lg:self-start">
            <ProductForm onSubmit={handleCreate} />
          </div>
          <ProductList
            products={products}
            loading={loading}
            error={error}
            lastUpdated={lastUpdated}
            onRefresh={refresh}
            onSell={handleSell}
          />
        </div>
      </main>
      <Toast toasts={toasts} onDismiss={dismiss} />
    </div>
  )
}
