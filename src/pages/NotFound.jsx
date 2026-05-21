import React from 'react';
import { Link } from 'react-router-dom';
import wallImage from '../../img/wall.jpeg';

export default function NotFound() {
  return (
    <section className="relative min-h-[calc(100vh-9rem)] overflow-hidden">
      <img
        src={wallImage}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-black/45" />

      <div className="container relative z-10 mx-auto flex min-h-[calc(100vh-9rem)] items-center px-4 py-16 md:py-24">
        <div className="max-w-2xl text-white">
          <p className="text-sm font-semibold uppercase tracking-wide text-amber-200">
            404
          </p>
          <h1 className="mt-3 text-4xl font-bold">Страницата не е намерена</h1>
          <p className="mt-4 max-w-xl text-white/85">
            Адресът може да е променен или страницата вече да не съществува.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/" className="btn-primary">
              Към началото
            </Link>
            <Link
              to="/contact"
              className="btn border border-white/30 bg-white/15 text-white hover:bg-white/25"
            >
              Контакт
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
