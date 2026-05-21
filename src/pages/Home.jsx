import React from 'react'
import Hero from '../components/Hero'

export default function Home() {
  return (
    <div>
      <Hero />
      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Добре дошли в Camping Vladis</h2>
            <p className="text-lg text-gray-700 mb-6">Насладете се на тихи вечери край огъня, палатки под звездите и плажна близост. Предлагаме място за къмпинг, каравани и специални услуги за приятни преживявания.</p>
            {/* CTA buttons kept in Hero; removed duplicate buttons here */}
          </div>
          <div>
            <div className="rounded-lg overflow-hidden card">
              <img src={new URL('../../img/2.jpeg', import.meta.url).href} alt="Camping spot" className="w-full h-56 object-cover" />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
