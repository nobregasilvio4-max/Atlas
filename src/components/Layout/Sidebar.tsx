import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuthContext } from '../../contexts/AuthContext'
import {
  LayoutDashboard,
  TrendingUp,
  FileText,
  Settings,
  Users,
  Package,
} from 'lucide-react'
import { cn } from '../../lib/utils'

interface NavItem {
  href: string
  label: string
  icon: React.ReactNode
}

const Sidebar: React.FC = () => {
  const { user } = useAuthContext()
  const isAdmin = user?.user_metadata?.role === 'admin'

  const clientNavItems: NavItem[] = [
    { href: '/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
    { href: '/dashboard/invest', label: 'Investir', icon: <TrendingUp className="h-5 w-5" /> },
    { href: '/dashboard/reports', label: 'Relatórios', icon: <FileText className="h-5 w-5" /> },
    { href: '/dashboard/settings', label: 'Configurações', icon: <Settings className="h-5 w-5" /> },
  ]

  const adminNavItems: NavItem[] = [
    { href: '/admin', label: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
    { href: '/admin/users', label: 'Usuários', icon: <Users className="h-5 w-5" /> },
    { href: '/admin/plans', label: 'Planos', icon: <Package className="h-5 w-5" /> },
  ]

  const navItems = isAdmin ? adminNavItems : clientNavItems

  return (
    <aside className="w-64 bg-gray-800 border-r border-gray-700 p-4 hidden md:block">
      <nav className="flex flex-col space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.href}
            end={item.href === (isAdmin ? '/admin' : '/dashboard')} // `end` prop for exact match on index routes
            className={({ isActive }) =>
              cn(
                'flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                isActive
                  ? 'bg-yellow-400 text-gray-900'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              )
            }
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}

export default Sidebar
