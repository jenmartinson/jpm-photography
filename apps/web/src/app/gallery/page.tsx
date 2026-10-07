// apps/web/src/app/gallery/page.tsx
import { createClient } from 'next-sanity'
import Link from 'next/link'
import { GalleryGrid } from '../../components/gallery-grid'

const client = createClient({
  projectId: '651sxvb1', 
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

export default async function Gallery(props: {
  searchParams: Promise<{ tag?: string }>
}) {
  const searchParams = await props.searchParams
  const selectedTag = searchParams.tag

  const tags = await client.fetch(`*[_type == "tag"]{ title, "slug": slug.current }`)
  
  const query = selectedTag 
    ? `*[_type == "photo" && $tag in tags[]->slug.current] { 
        _id, 
        title, 
        "url": image.asset->url, 
        "alt": image.alt,
        "dimensions": image.asset->metadata.dimensions
      }`
    : `*[_type == "photo"] { 
        _id, 
        title, 
        "url": image.asset->url, 
        "alt": image.alt,
        "dimensions": image.asset->metadata.dimensions
      }`
    
  const photos = await client.fetch(query, { tag: selectedTag || '' })

  return (
    <div className="space-y-12">
      {/* Minimal Filter Navigation */}
      <div className="flex gap-4 border-b border-zinc-100 pb-4 overflow-x-auto">
        <Link 
          href="/gallery" 
          className={`text-sm ${!selectedTag ? 'text-black font-medium' : 'text-zinc-400 hover:text-zinc-700'}`}
        >
          All
        </Link>
        {tags.map((tag: any) => (
          <Link 
            key={tag.slug} 
            href={`/gallery?tag=${tag.slug}`}
            className={`text-sm ${selectedTag === tag.slug ? 'text-black font-medium' : 'text-zinc-400 hover:text-zinc-700'}`}
          >
            {tag.title}
          </Link>
        ))}
      </div>

      {/* Interactive Gallery & Lightbox */}
      <GalleryGrid photos={photos} />
    </div>
  )
}