# Frontend · TechStore 3D

Aplicación React + Vite + Tailwind CSS para la gestión de inventario y ventas de dispositivos electrónicos.

## Vistas

| Ruta           | Descripción                                                                 |
| -------------- | --------------------------------------------------------------------------- |
| `/`            | Tienda 3D interactiva (Three.js con `@react-three/fiber` y `@react-three/drei`) |
| `/panel`       | Panel de control de ventas e inventario (GET, POST y actualización de stock) |
| `/computadora` | Visor 3D de una computadora con `OrbitControls` (rotar y hacer zoom)         |

## Configuración

```bash
cp .env.example .env   # ajusta VITE_API_URL si es necesario
npm install
npm run dev
```

## API

Definida en `src/api/productsApi.js`:

- `GET    {VITE_API_URL}` – lista productos (el panel consulta cada 5 s).
- `POST   {VITE_API_URL}` – crea un producto `{ name, price, stock }`.
- `PATCH  {VITE_API_URL}/{id}` – actualiza el stock `{ stock }` (si responde 405, reintenta con `PUT` enviando el producto completo).

## Estructura

```
src/
├── api/productsApi.js        # Cliente Axios
├── hooks/                    # useProducts (estado + polling), useToasts
└── components/
    ├── store/                # Tienda 3D (escena, estantes, letreros)
    ├── devices/              # Modelos 3D: Computer, Mouse, Phone, Tablet
    ├── computer/             # Visor 3D de computadora
    ├── dashboard/            # Panel de ventas (formulario, tabla, métricas)
    ├── layout/               # Navbar
    └── ui/                   # Toasts
```

## Scripts

- `npm run dev` – servidor de desarrollo
- `npm run build` – build de producción en `dist/`
- `npm run lint` – oxlint
