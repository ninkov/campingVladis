import React from 'react'

export default function Footer() {
  return (
    <footer className="bg-white border-t mt-auto md:static fixed bottom-0 left-0 w-full z-40">
      <div className="container mx-auto px-4 py-4 text-center text-sm">
        © {new Date().getFullYear()} Camping Vladis — всички права запазени
      </div>
    </footer>
  )
}
