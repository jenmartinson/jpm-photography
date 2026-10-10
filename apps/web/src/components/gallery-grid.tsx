// apps/web/src/components/GalleryGrid.tsx
'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { LightboxImage } from './lightbox-image'

export interface Photo {
  _id: string
  title?: string
  url: string
  alt?: string
  dimensions?: {
    width: number
    height: number
  }
}

export function GalleryGrid({ photos }: { photos: Photo[] }) {
  // Track selected photo by index
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const activePhoto = activeIndex !== null ? photos[activeIndex] : null

  // Navigation handlers
  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev !== null ? (prev + 1) % photos.length : null))
  }, [photos.length])

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) =>
      prev !== null ? (prev - 1 + photos.length) % photos.length : null
    )
  }, [photos.length])

  const handleClose = () => setActiveIndex(null)

  // Keyboard listener for Escape, Left, and Right keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeIndex === null) return

      if (e.key === 'Escape') {
        handleClose()
      } else if (e.key === 'ArrowRight') {
        handleNext()
      } else if (e.key === 'ArrowLeft') {
        handlePrev()
      }
    }

    if (activeIndex !== null) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [activeIndex, handleNext, handlePrev])

  return (
    <>
      {/* Masonry Grid */}
      <div className="columns-1 sm:columns-2 md:columns-3 gap-8 space-y-8">
        {photos.map((photo, index) => (
          <div
            key={photo._id}
            onClick={() => setActiveIndex(index)}
            className="break-inside-avoid cursor-pointer group relative overflow-hidden"
          >
            <Image
              src={photo.url}
              alt={photo.alt || photo.title || 'Gallery image'}
              width={photo.dimensions?.width || 1200}
              height={photo.dimensions?.height || 800}
              className="w-full h-auto bg-zinc-50 transition-transform duration-700 ease-out group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ))}
      </div>

{/* Fullscreen Lightbox Overlay */}
{activePhoto && activeIndex !== null && (
  <div
    className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4 md:p-10 backdrop-blur-sm transition-opacity duration-200"
    onClick={handleClose}
  >
    {/* Header Controls: Counter & Close */}
    <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-20 text-xs tracking-widest text-zinc-400 uppercase">
      <span>
        {activeIndex + 1} / {photos.length}
      </span>
      <button
        onClick={handleClose}
        className="hover:text-white transition-colors p-2"
        aria-label="Close viewer"
      >
        Close [ESC]
      </button>
    </div>

    {/* Centered Image Frame */}
    <div
    className="relative w-full h-full max-w-5xl max-h-[80vh] flex flex-col items-center justify-center"
    onClick={(e) => e.stopPropagation()}
    >
    <LightboxImage key={activePhoto._id} photo={activePhoto} />
    </div>

    {/* Left Arrow Button (Rendered on top with SVG icon) */}
    {photos.length > 1 && (
      <button
        onClick={(e) => {
          e.stopPropagation()
          handlePrev()
        }}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 z-20 transition-colors bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md"
        aria-label="Previous photo"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>
    )}

    {/* Right Arrow Button (Rendered on top with SVG icon) */}
    {photos.length > 1 && (
      <button
        onClick={(e) => {
          e.stopPropagation()
          handleNext()
        }}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 z-20 transition-colors bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md"
        aria-label="Next photo"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    )}
  </div>
)}
    </>
  )
}