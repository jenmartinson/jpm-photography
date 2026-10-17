'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Photo } from './gallery-grid'

export function LightboxImage({ photo }: { photo: Photo }) {
  const [loaded, setLoaded] = useState(false)
  const title = photo.title
  const width = photo.dimensions?.width || 1200
  const height = photo.dimensions?.height || 800

  return (
    <div className="flex flex-col items-center justify-center gap-4 max-h-full w-full">
      {/* Image maximized while preserving aspect ratio */}
      <div className="relative">
        {!loaded && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            aria-hidden="true"
          >
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-zinc-700 border-t-zinc-200" />
          </div>
        )}
        <Image
          src={photo.url}
          alt={photo.alt || photo.description || photo.title || 'Enlarged image'}
          width={width}
          height={height}
          className={`max-w-[92vw] max-h-[80vh] w-auto h-auto object-contain transition-opacity duration-300 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
          sizes="100vw"
          priority
          onLoad={() => setLoaded(true)}
        />
      </div>

      {/* Title and description */}
      {(title || photo.description) && (
        <div
          className={`text-center transition-opacity duration-300 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {title && (
            <h2 className="text-lg md:text-2xl font-light tracking-wide text-white uppercase">
              {title}
            </h2>
          )}
          {photo.description && (
            <p className="mt-2 text-sm md:text-base text-zinc-300 max-w-3xl mx-auto leading-relaxed">
              {photo.description}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
