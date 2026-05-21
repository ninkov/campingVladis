import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-lg bg-amber-500 flex items-center justify-center text-white font-bold">
        ⛺
      </div>
      <div>
        <div className="text-lg font-semibold">Camping Vladis</div>
        <div className="text-xs text-gray-500">Ахелой</div>
      </div>
    </Link>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);
  const headerRef = useRef(null);

  useEffect(() => {
    if (open) {
      const h = headerRef.current?.getBoundingClientRect().height || 80;
      document.body.style.setProperty('--header-height', `${h}px`);
      // prevent background scrolling when drawer is open on mobile
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.removeProperty('--header-height');
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.removeProperty('--header-height');
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <header
      ref={headerRef}
      className="bg-white/70 backdrop-blur-sm sticky top-0 z-40"
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Logo />
        <nav aria-label="Main navigation">
          <ul className="hidden md:flex items-center gap-6">
            <li>
              <Link to="/about" className="text-sm hover:underline">
                За нас
              </Link>
            </li>
            <li>
              <Link to="/gallery" className="text-sm hover:underline">
                Галерия
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-sm hover:underline">
                Контакт
              </Link>
            </li>
            <li>
              <Link to="/contact" className="btn-primary">
                Резервирай
              </Link>
            </li>
          </ul>
        </nav>
        <div className="md:hidden">
          <button
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="p-2 rounded-md border"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile drawer — mount only when open to avoid offscreen artefacts */}
      {open &&
        createPortal(
          <div
            className="fixed inset-x-0 bottom-0 z-50 transition-opacity overflow-hidden opacity-100 pointer-events-auto"
            aria-hidden={!open}
            style={{ top: 'var(--header-height, 4rem)' }}
          >
            <div
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-black/40"
            />
            <aside
              className="absolute right-4 top-3 w-[min(18rem,calc(100vw-2rem))] max-h-[calc(100dvh-var(--header-height,4rem)-1.5rem)] overflow-auto rounded-lg bg-white/90 p-6 shadow-lg backdrop-blur-sm"
              aria-label="Mobile menu"
            >
              <div className="flex items-center justify-between">
                <Logo />
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="text-2xl"
                >
                  ✕
                </button>
              </div>
              <nav className="mt-6">
                <ul className="flex flex-col gap-4">
                  <li>
                    <Link
                      to="/about"
                      onClick={() => {
                        setOpen(false);
                        setTimeout(
                          () => window.scrollTo({ top: 0, behavior: 'smooth' }),
                          220
                        );
                      }}
                      className="text-base"
                    >
                      За нас
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/gallery"
                      onClick={() => {
                        setOpen(false);
                        setTimeout(
                          () => window.scrollTo({ top: 0, behavior: 'smooth' }),
                          220
                        );
                      }}
                      className="text-base"
                    >
                      Галерия
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contact"
                      onClick={() => {
                        setOpen(false);
                        setTimeout(
                          () => window.scrollTo({ top: 0, behavior: 'smooth' }),
                          220
                        );
                      }}
                      className="text-base"
                    >
                      Контакт
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/contact"
                      onClick={() => {
                        setOpen(false);
                        setTimeout(
                          () => window.scrollTo({ top: 0, behavior: 'smooth' }),
                          220
                        );
                      }}
                      className="btn-primary inline-block mt-4"
                    >
                      Резервирай
                    </Link>
                  </li>
                </ul>
              </nav>
            </aside>
          </div>,
          document.body
        )}
    </header>
  );
}
