import './globals.css'
import Link from 'next/link'
import Image from 'next/image'
import { Header } from '../components/header'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-zinc-900 antialiased min-h-screen flex flex-col">
        <Header />

        <main className="flex-grow max-w-7xl mx-auto w-full px-6 md:px-12">
          {children}
        </main>

        <footer className="py-8 text-center text-xs text-zinc-400 mt-20">
          © {new Date().getFullYear()} John P. Martinson. All rights reserved.
        </footer>
      </body>
    </html>
  )
}