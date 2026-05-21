import React from 'react'
import GalleryGrid from '../components/GalleryGrid'

export default function Gallery() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Галерия</h1>
      <GalleryGrid />
    </div>
  )
}
