import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Tienda 3D' },
  { to: '/panel', label: 'Panel de Ventas' },
  { to: '/computadora', label: 'Computadora 3D' },
]

export default function Navbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-slate-800 bg-slate-950/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 py-3">
        <NavLink to="/" className="text-xl font-black tracking-tight">
          Tech<span className="text-sky-400">Store</span>
        </NavLink>
        <ul className="flex gap-1">
          {links.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end
                className={({ isActive }) =>
                  `rounded-lg px-3 py-2 text-sm font-medium transition ${
                    isActive ? 'bg-sky-500 text-white' : 'text-slate-300 hover:bg-slate-800'
                  }`
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
