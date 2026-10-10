import './globals.css'
import { Header } from '../components/header'
import { Source_Sans_3 } from 'next/font/google'

const sourceSans3 = Source_Sans_3({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'], // Light, Regular, Medium, Semi-Bold
  variable: '--font-source-sans',
  display: 'swap',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={sourceSans3.variable}>
      <body className="font-sans antialiased text-zinc-900 bg-white">
        <Header />
        <main className="flex-grow max-w-7xl mx-auto w-full px-6 md:px-12">
          {children}
        </main>

        <footer className="py-8 text-center text-sm text-zinc-500 mt-20">
          © {new Date().getFullYear()} John P. Martinson. All rights reserved.
        </footer>
      </body>
    </html>
  )
}