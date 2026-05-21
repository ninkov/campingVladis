import React from 'react'
import { Link } from 'react-router-dom'

const heroImg = new URL('../../img/6.jpeg', import.meta.url).href

export default function Hero() {
  return (
    <section className="relative rounded-lg overflow-hidden card hero-fade">
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/15 to-black/40"></div>
      <div className="h-[60vh] min-h-[360px] md:h-[72vh] bg-cover bg-center" style={{ backgroundImage: `url('${heroImg}')` }} />
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl text-white">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight drop-shadow-md">Camping Vladis</h1>
            <p className="mt-4 text-lg md:text-xl text-white/90">Отпуснете се край огъня, усетете тишината и гледката на звездите.</p>
            <div className="mt-6 flex gap-3">
              <Link to="/gallery" className="btn-primary bg-amber-500 hover:bg-amber-600">Разгледай Галерия</Link>
              <Link to="/contact" className="btn-ghost">Резервирай</Link>
            </div>
          </div>
        </div>
      </div>
      <svg className="absolute -bottom-1 left-0 w-full" viewBox="0 0 1440 60" preserveAspectRatio="none"><path d="M0,40 C240,10 480,70 720,40 C960,10 1200,70 1440,40 L1440 60 L0 60 Z" fill="#fbfbf7" /></svg>
    </section>
  )
}
