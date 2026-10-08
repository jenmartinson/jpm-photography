import { createClient } from 'next-sanity'
import Link from 'next/link'
import { GalleryGrid } from '../../components/gallery-grid'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '651sxvb1', 
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
})

export default async function GalleryPage({
  searchParams,
}: {
  searchParams: Promise<{ tag?: string }>;
}) {
  const { tag: selectedTag } = await searchParams;

  const tags = await client.fetch(`*[_type == "tag"]{ title, "slug": slug.current }`);

  // Explicitly typing query as 'string' bypasses TypeGen's literal query matching
  const query: string = selectedTag
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
      }`;

  const params: Record<string, unknown> = selectedTag ? { tag: selectedTag } : {};

  const photos = await client.fetch(query, params);

  return (
    <div className="space-y-12">
      {/* Minimal Filter Navigation */}
      <div className="flex justify-center gap-4 border-b border-zinc-100 pb-4 overflow-x-auto">
        <Link 
          href="/gallery" 
          className={`text-sm ${!selectedTag ? 'text-black font-medium' : 'text-zinc-400 hover:text-zinc-700'}`}
        >
          All
        </Link>
        {tags.map((t: { title: string; slug: string }) => (
          <Link 
            key={t.slug} 
            href={`/gallery?tag=${t.slug}`}
            className={`text-sm ${selectedTag === t.slug ? 'text-black font-medium' : 'text-zinc-400 hover:text-zinc-700'}`}
          >
            {t.title}
          </Link>
        ))}
      </div>

      {/* Interactive Gallery & Lightbox */}
      <GalleryGrid photos={photos} />
    </div>
  )
}