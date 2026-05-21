import React, { useState, useEffect, useRef } from 'react'

const images = [
  new URL('../../img/1.jpeg', import.meta.url).href,
  new URL('../../img/2.jpeg', import.meta.url).href,
  new URL('../../img/3.jpeg', import.meta.url).href,
  new URL('../../img/4.jpeg', import.meta.url).href,
  new URL('../../img/5.jpeg', import.meta.url).href,
  new URL('../../img/6.jpeg', import.meta.url).href,
  new URL('../../img/7.jpeg', import.meta.url).href,
  new URL('../../img/8.jpeg', import.meta.url).href,
  new URL('../../img/9.jpeg', import.meta.url).href,
  new URL('../../img/10.jpeg', import.meta.url).href,
  new URL('../../img/11.jpeg', import.meta.url).href,
  new URL('../../img/12.jpeg', import.meta.url).href,
  new URL('../../img/13.jpeg', import.meta.url).href
]

export default function GalleryGrid() {
  const [openIndex, setOpenIndex] = useState(-1)
  const [loaded, setLoaded] = useState(() => images.map(() => false))
  const closeBtnRef = useRef(null)
  const dialogRef = useRef(null)
  const previousActiveRef = useRef(null)

  function open(i) {
    setOpenIndex(i)
  }
  function close() {
    setOpenIndex(-1)
  }
  function prev() {
    setOpenIndex((s) => (s - 1 + images.length) % images.length)
  }
  function next() {
    setOpenIndex((s) => (s + 1) % images.length)
  }

  function handleThumbLoad(i) {
    setLoaded((prev) => {
      const copy = [...prev]
      copy[i] = true
      return copy
    })
  }

  // Cleanup any leftover body styles (in case of HMR or previous modal left styles)
  useEffect(() => {
    if (document?.body) {
      if (document.body.style.paddingRight) document.body.style.paddingRight = ''
      if (document.body.style.overflow === 'hidden') document.body.style.overflow = ''
      if (document.body.style.position === 'fixed') document.body.style.position = ''
      if (document.body.style.top) document.body.style.top = ''
      if (document.body.style.left) document.body.style.left = ''
      if (document.body.style.right) document.body.style.right = ''
      if (document.body.style.width) document.body.style.width = ''
    }
    return () => {
      // ensure nothing remains if component unmounts
      if (document?.body) {
        document.body.style.paddingRight = ''
        document.body.style.overflow = ''
        document.body.style.position = ''
        document.body.style.top = ''
        document.body.style.left = ''
        document.body.style.right = ''
        document.body.style.width = ''
      }
    }
  }, [])

  // no runtime base64 placeholders by default — gallery shows a subtle pulse LQIP

  useEffect(() => {
    if (openIndex < 0) return
    previousActiveRef.current = document.activeElement

    function onKey(e) {
      if (e.key === 'Escape') {
        e.preventDefault()
        close()
        return
      }
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        prev()
        return
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        next()
        return
      }
      if (e.key === 'Tab') {
        // simple focus trap
        const focusable = dialogRef.current?.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])') || []
        if (focusable.length === 0) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault()
            last.focus()
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault()
            first.focus()
          }
        }
      }
    }

    window.addEventListener('keydown', onKey)

    // Position-lock the body to avoid layout shifts across devices/browsers
    const prevStyles = {
      overflow: document.body.style.overflow || '',
      position: document.body.style.position || '',
      top: document.body.style.top || '',
      left: document.body.style.left || '',
      right: document.body.style.right || '',
      width: document.body.style.width || ''
    }
    const scrollY = window.scrollY || window.pageYOffset || 0
    document.body.style.position = 'fixed'
    document.body.style.top = `-${scrollY}px`
    document.body.style.left = '0'
    document.body.style.right = '0'
    document.body.style.width = '100%'
    document.body.style.overflow = 'hidden'

    // focus close button when opened
    setTimeout(() => {
      closeBtnRef.current?.focus()
    }, 0)

    return () => {
      window.removeEventListener('keydown', onKey)
      // restore focus
      previousActiveRef.current?.focus?.()
      // restore body styles and scroll
      document.body.style.overflow = prevStyles.overflow
      document.body.style.position = prevStyles.position
      document.body.style.top = prevStyles.top
      document.body.style.left = prevStyles.left
      document.body.style.right = prevStyles.right
      document.body.style.width = prevStyles.width
      window.scrollTo(0, scrollY)
    }
  }, [openIndex])

  return (
    <div className="flow-root">
      <div className="-m-2 columns-1 sm:columns-2 lg:columns-3">
        {images.map((src, i) => (
          <figure key={i} className="break-inside mb-4 p-2">
            <div onClick={() => open(i)} className="group relative rounded-lg overflow-hidden card transform hover:scale-105 transition-shadow duration-300 cursor-pointer">
              {!loaded[i] && (
                <div style={{height: '260px'}} className="absolute inset-0 rounded-lg overflow-hidden bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse" />
              )}
              <img src={src} alt={`Camping ${i + 1}`} className="w-full object-cover block" style={{height: '260px'}} loading="lazy" onLoad={() => handleThumbLoad(i)} />
              <div className="absolute left-0 right-0 bottom-0 p-3 bg-black/30 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200">Къмпинг момент {i + 1}</div>
            </div>
            <figcaption className="sr-only">Къмпинг момент {i + 1}</figcaption>
          </figure>
        ))}
      </div>

      {openIndex >= 0 && (
        <div className="fixed inset-0 z-50 p-4">
          <div onClick={close} className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            <div ref={dialogRef} onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" className="pointer-events-auto fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[86vw] max-w-[720px] max-h-[calc(100vh-80px)] rounded-lg flex items-center justify-center z-50 transition-transform duration-200 ease-out scale-100">
              <div className="absolute left-4 top-3 text-sm text-white bg-black/30 px-3 py-1 rounded">{openIndex + 1} / {images.length}</div>
              <button ref={closeBtnRef} onClick={close} aria-label="Close" className="absolute right-3 top-3 text-white text-2xl bg-black/30 rounded p-1 z-40">✕</button>
              <button onClick={prev} aria-label="Previous image" className="absolute left-2 top-1/2 -translate-y-1/2 text-white bg-black/30 rounded-full p-2 z-40 hover:bg-black/50">◀</button>
              <div className="bg-gray-800/70 rounded-lg p-2 flex items-center justify-center">
                <img src={images[openIndex]} alt={`Camping ${openIndex + 1}`} className="max-h-[calc(100vh-160px)] max-w-full w-auto h-auto rounded-lg object-contain block mx-auto drop-shadow-lg" />
              </div>
              <button onClick={next} aria-label="Next image" className="absolute right-2 top-1/2 -translate-y-1/2 text-white bg-black/30 rounded-full p-2 z-40 hover:bg-black/50">▶</button>
            </div>
        </div>
      )}
    </div>
  )
}
