// apps/web/src/app/about/page.tsx
import { createClient } from 'next-sanity'
import { PortableText, PortableTextComponents } from '@portabletext/react'
import { notFound } from 'next/navigation'

const client = createClient({
  projectId: '651sxvb1',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

// Custom styling for rich text elements to match your minimalist aesthetic
const portableTextComponents: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="text-2xl font-light tracking-tight text-zinc-900 mt-8 mb-4">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-xl font-light tracking-tight text-zinc-900 mt-6 mb-3">
        {children}
      </h2>
    ),
    normal: ({ children }) => (
      <p className="text-zinc-600 leading-relaxed mb-6 font-light">
        {children}
      </p>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside text-zinc-600 space-y-2 mb-6 font-light">
        {children}
      </ul>
    ),
  },
  marks: {
    link: ({ value, children }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="underline underline-offset-4 text-zinc-900 hover:text-zinc-600 transition-colors"
      >
        {children}
      </a>
    ),
    strong: ({ children }) => (
      <strong className="font-medium text-zinc-900">{children}</strong>
    ),
  },
}

export default async function AboutPage() {
  const page = await client.fetch(
    `*[_type == "page" && slug.current == "about"][0]{
      title,
      content
    }`
  )

  if (!page) {
    notFound()
  }

  return (
    <article className="max-w-2xl mx-auto py-6">
      {page.title && (
        <h1 className="text-2xl font-light tracking-tight text-zinc-500 mb-4 border-b border-zinc-100 pb-4 text-center md:text-left">
            {page.title}
        </h1>
      )}
      {page.content && (
        <div className="pt-2">
          <PortableText value={page.content} components={portableTextComponents} />
        </div>
      )}
    </article>
  )
}