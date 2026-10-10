'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Photo } from './gallery-grid'

export function LightboxImage({ photo }: { photo: Photo }) {
  const [loaded, setLoaded] = useState(false)
  const caption = photo.title || photo.alt

  return (
    <>
      <div className="relative w-full h-full">
        {/* Skeleton */}
        <div
          className={`absolute inset-0 bg-zinc-800/60 animate-pulse transition-opacity duration-300 ${
            loaded ? 'opacity-0' : 'opacity-100'
          }`}
          aria-hidden="true"
        />

        <Image
          src={photo.url}
          alt={photo.alt || photo.title || 'Enlarged image'}
          fill
          className={`object-contain transition-opacity duration-300 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
          sizes="100vw"
          priority
          onLoad={() => setLoaded(true)}
        />
      </div>

      {/* Caption fades in with the image */}
      {caption && (
        <p
          className={`mt-4 text-xs tracking-widest text-zinc-400 text-center uppercase transition-opacity duration-300 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {caption}
        </p>
      )}
    </>
  )
}