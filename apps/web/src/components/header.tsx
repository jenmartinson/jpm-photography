// apps/web/src/components/Header.tsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HeaderLogo } from './header-logo'

const NAV_LINKS = [
  { href: '/gallery', label: 'Gallery' },
  { href: '/about', label: 'About' },
  { href: '/connect', label: 'Connect' },
]

export function Header() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-zinc-100">
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 py-6 md:py-7 flex flex-col md:flex-row items-center justify-between gap-5 md:gap-0">
        {/* Centered on mobile, left-aligned on desktop */}
        <HeaderLogo />

        {/* Centered below logo on mobile, right-aligned on desktop */}
        <nav className="flex items-center gap-8 md:gap-10">
          {NAV_LINKS.map(({ href, label }) => {
            const active = pathname === href

            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? 'page' : undefined}
                className={`relative group text-xs md:text-sm uppercase tracking-[0.2em] font-light py-1 transition-colors ${
                  active ? 'text-sky-950' : 'text-zinc-500 hover:text-sky-950'
                }`}
              >
                {label}
                <span
                  className={`absolute left-0 -bottom-0.5 h-px bg-sky-950 transition-all duration-300 ${
                    active ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
