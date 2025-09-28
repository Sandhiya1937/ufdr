'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const menuItems = [
  {
    title: 'Dashboard',
    href: '/dashboard'
  },
  {
    title: 'Cases',
    href: '/cases'
  },
  {
    title: 'AI Assistant',
    href: '/ai'
  },
  {
    title: 'Analytics',
    href: '/analytics'
  },
  {
    title: 'Reports',
    href: '/reports'
  }
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <div className="logo-icon">UF</div>
          <div className="logo-text">
            <div className="logo-title">UFDR</div>
            <div className="logo-subtitle">Analytic Tool</div>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <Link 
            key={item.title}
            href={item.href}
            className={`nav-link ${pathname === item.href ? 'active' : ''}`}
          >
            <span className="nav-text">{item.title}</span>
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="footer-text">
          © 2024 by UFDR Analytics
        </div>
      </div>
    </div>
  )
}
