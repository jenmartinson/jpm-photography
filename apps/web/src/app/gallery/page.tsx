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
  searchParams: Promise<{ tag?: string; photo?: string }>;
}) {
  const { tag: selectedTag, photo: initialPhotoId } = await searchParams;

  const tags = await client.fetch(`*[_type == "tag" && slug.current != "homepage"]{ title, "slug": slug.current }`);

  // Explicitly typing query as 'string' bypasses TypeGen's literal query matching
  const query: string = selectedTag
    ? `*[_type == "photo" && $tag in tags[]->slug.current] {
        _id,
        title,
        description,
        "url": image.asset->url,
        "alt": image.asset->altText,
        "dimensions": image.asset->metadata.dimensions
      }`
    : `*[_type == "photo"] {
        _id,
        title,
        description,
        "url": image.asset->url,
        "alt": image.asset->altText,
        "dimensions": image.asset->metadata.dimensions
      }`;

  const params: Record<string, unknown> = selectedTag ? { tag: selectedTag } : {};

  const photos = await client.fetch(query, params);

  return (
    <div className="space-y-12">
      {/* Minimal Filter Navigation */}
      <div className="flex justify-center pt-6 md:pt-8">
        <div className="inline-flex flex-wrap items-center justify-center gap-1 bg-zinc-100 p-1">
          {[
            { label: 'All', href: '/gallery', active: !selectedTag },
            ...tags.map((t: { title: string; slug: string }) => ({
              label: t.title,
              href: `/gallery?tag=${t.slug}`,
              active: selectedTag === t.slug,
            })),
          ].map(({ label, href, active }) => (
            <Link
              key={href}
              href={href}
              aria-current={active ? 'page' : undefined}
              className={`px-4 py-1.5 text-xs md:text-sm uppercase tracking-[0.2em] font-light transition-colors ${
                active
                  ? 'bg-sky-950 text-white shadow-sm'
                  : 'text-zinc-700 hover:text-sky-950 hover:bg-white'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>

      {/* Interactive Gallery & Lightbox */}
      <GalleryGrid photos={photos} initialPhotoId={initialPhotoId} />
    </div>
  )
}