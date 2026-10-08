// apps/web/src/components/Header.tsx
import Link from 'next/link'
import { HeaderLogo } from './header-logo'

export function Header() {
  return (
    <header className="flex flex-col md:flex-row items-center justify-between py-6 md:py-8 gap-5 md:gap-0 mb-6 px-0 md:px-8">
      {/* Centered on mobile, left-aligned on desktop */}
      <HeaderLogo />

      {/* Centered below logo on mobile, right-aligned on desktop */}
      <nav className="flex items-center gap-6 md:gap-8 text-sm text-zinc-600">
        <Link href="/about" className="hover:text-black transition-colors">
          About
        </Link>
        <Link href="/gallery" className="hover:text-black transition-colors">
          Gallery
        </Link>
{/*         <Link href="/connect" className="hover:text-black transition-colors">
          Connect
        </Link> */}
      </nav>
    </header>
  )
}