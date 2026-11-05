import axios from 'axios'

const DEFAULT_API_URL = 'https://appproyectoproducto.onrender.com/api/v1/products'

export const API_URL = (import.meta.env.VITE_API_URL || DEFAULT_API_URL).replace(/\/+$/, '')

const http = axios.create({
  baseURL: API_URL,
  timeout: 60000,
  headers: { 'Content-Type': 'application/json' },
})

export async function getProducts() {
  const { data } = await http.get('')
  return data
}

export async function createProduct({ name, price, stock, image_url = null }) {
  const { data } = await http.post('', {
    name,
    price: Number(price),
    stock: Number(stock),
    image_url: image_url || null,
  })
  return data
}

/**
 * Actualiza el stock de un producto.
 * Usa PATCH /{id} con { stock }; si el backend sólo expone PUT,
 * reintenta con PUT /{id} enviando el producto completo.
 */
export async function updateStock(product, stock) {
  try {
    const { data } = await http.patch(`/${product.id}`, { stock })
    return data
  } catch (error) {
    if (error.response?.status !== 405) throw error
    const { id, ...rest } = product
    const { data } = await http.put(`/${id}`, { ...rest, stock })
    return data
  }
}

export function getErrorMessage(error) {
  if (error.response) {
    const { status, data } = error.response
    const detail = typeof data?.detail === 'string' ? data.detail : null
    if (status === 404 || status === 405) {
      return `El backend no tiene habilitado el endpoint de actualización de stock (HTTP ${status}).`
    }
    return detail ? `Error ${status}: ${detail}` : `Error del servidor (HTTP ${status}).`
  }
  if (error.code === 'ECONNABORTED') {
    return 'La API tardó demasiado en responder (Render puede estar despertando). Intenta de nuevo.'
  }
  return 'No se pudo conectar con la API.'
}
