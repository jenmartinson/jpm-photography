// apps/web/src/components/HeaderLogo.tsx
import Link from 'next/link'

export function HeaderLogo() {
  return (
    <Link href="/" className="flex items-center gap-3 group">
      {/* Hand-drawn style camera icon */}
      <svg 
        className="h-8 w-8 text-[#1D3557] group-hover:opacity-80 transition-opacity" 
        viewBox="0 0 48 48" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2.2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <path d="M15 14h18l2.5 4H41a2 2 0 012 2v20a2 2 0 01-2 2H7a2 2 0 01-2-2V20a2 2 0 012-2h5.5L15 14z" />
        <circle cx="24" cy="29" r="7" />
        <circle cx="24" cy="29" r="3" />
        <path d="M11 23h.01" />
      </svg>
      <span className="text-[16px] text-zinc-500 tracking-tight pt-2">
        John P. Martinson
      </span>
    </Link>
  )
}