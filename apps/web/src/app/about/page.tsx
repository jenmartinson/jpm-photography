// apps/web/src/app/about/page.tsx
import { createClient } from 'next-sanity'
import { PortableText, PortableTextComponents } from '@portabletext/react'
import Image from 'next/image'
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
      <h1 className="text-lg md:text-2xl font-light tracking-wide text-zinc-900 mt-8 mb-4">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-base md:text-xl font-light tracking-wide text-zinc-900 mt-6 mb-3">
        {children}
      </h2>
    ),
    normal: ({ children }) => (
      <p className="text-zinc-600 leading-relaxed mb-6">
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
      content,
      "imageUrl": image.asset->url,
      "imageAlt": image.asset->altText,
      "imageDimensions": image.asset->metadata.dimensions
    }`
  )

  if (!page) {
    notFound()
  }

  const image = page.imageUrl
    ? {
        url: page.imageUrl as string,
        alt: (page.imageAlt as string) || page.title || 'About',
        width: (page.imageDimensions?.width as number) || 800,
        height: (page.imageDimensions?.height as number) || 1000,
      }
    : null

  return (
    <article className="max-w-5xl mx-auto pt-6 md:pt-8">
      <div
        className={
          image
            ? 'grid items-start gap-10 md:grid-cols-[minmax(0,20rem)_1fr] md:gap-14'
            : ''
        }
      >
        {image && (
          <Image
            src={image.url}
            alt={image.alt}
            width={image.width}
            height={image.height}
            className="h-auto w-full object-contain bg-zinc-50"
            sizes="(max-width: 768px) 100vw, 20rem"
            priority
          />
        )}

        <div>
          {page.title && (
            <h1 className="text-lg md:text-2xl font-light tracking-wide text-zinc-800 uppercase text-center md:text-left mb-8">
              {page.title}
            </h1>
          )}
          {page.content && (
            <div className="pt-2">
              <PortableText value={page.content} components={portableTextComponents} />
            </div>
          )}
        </div>
      </div>
    </article>
  )
}