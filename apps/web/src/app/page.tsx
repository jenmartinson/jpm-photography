// apps/web/src/app/page.tsx
import { createClient } from 'next-sanity'
import Image from 'next/image'
import Link from 'next/link'

const client = createClient({
  projectId: '651sxvb1',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

export default async function Home() {
  // Fetch up to 3 photos tagged with "homepage"
  const photos = await client.fetch(
    `*[_type == "photo" && feature == true] | order(_createdAt desc)[0..2]{ 
      _id, 
      title, 
      description,
      "url": image.asset->url, 
      "alt": image.alt,
      "dimensions": image.asset->metadata.dimensions
    }`
  )

  return (
    <div className="max-w-6xl mx-auto space-y-16">
      {/* Statement Logo & Tagline Header */}
      <div className="text-center space-y-6 max-w-lg mx-auto mt-[-20px] md:mt-[-60px]">
        <Image 
          src="/jpm_logo.png" 
          alt="John P. Martinson" 
          width={500} 
          height={168} 
          className="h-58 w-auto object-contain mx-auto" 
          priority
        />
        <p className="text-xl text-zinc-500 leading-relaxed">
          A personal archive of a lifetime behind the camera.
        </p>
      </div>

      {/* Curated Preview Trio */}
      {photos && photos.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {photos.map((photo: any) => (
            <Link 
              key={photo._id} 
              href="/gallery" 
              className="group block space-y-3"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-zinc-50 rounded-sm">
                <Image
                  src={photo.url}
                  alt={photo.alt || photo.title || 'Portfolio photograph'}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority
                />
              </div>
              {photo.title && (
                <div className="flex justify-between items-center text-xs tracking-wider text-zinc-400 uppercase pt-1">
                  <span className="group-hover:text-zinc-900 transition-colors">
                    {photo.title}
                  </span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">
                    →
                  </span>
                </div>
              )}
            </Link>
          ))}
        </div>
      )}

      {/* Direct Call to Action */}
      <div className="text-center pt-4">
        <Link 
          href="/gallery" 
          className="inline-block border border-zinc-200 px-8 py-3 text-base text-zinc-800 hover:border-zinc-900 hover:bg-sky-950 hover:text-white transition-all duration-300"
        >
          Explore Full Gallery
        </Link>
      </div>
    </div>
  )
}