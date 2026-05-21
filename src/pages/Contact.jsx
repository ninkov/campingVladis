import React, { useState } from 'react';

const reservationEmail = 'info@campingvladis.example';

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    dates: '',
    message: '',
  });
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');

  function updateField(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus('submitting');
    setError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        throw new Error('Съобщението не беше изпратено.');
      }

      setStatus('sent');
      setForm({
        name: '',
        phone: '',
        email: '',
        dates: '',
        message: '',
      });
    } catch (err) {
      setStatus('error');
      setError(err.message);
    }
  }

  return (
    <section className="container mx-auto px-4 py-8 md:py-12">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(320px,420px)]">
        <div>
          <h1 className="text-3xl font-bold mb-4">Контакт</h1>
          <p className="max-w-2xl text-gray-600">
            Изпратете запитване за свободни места, дати и условия. Формата ще
            изпрати съобщение директно до нас.
          </p>

          <dl className="mt-8 grid gap-5 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-semibold text-gray-500">Имейл</dt>
              <dd className="mt-1">
                <a className="accent" href={`mailto:${reservationEmail}`}>
                  {reservationEmail}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm font-semibold text-gray-500">Локация</dt>
              <dd className="mt-1">Ахелой, България</dd>
            </div>
          </dl>
        </div>

        <form
          className="rounded-lg border border-gray-200 bg-white/70 p-5 shadow-sm"
          onSubmit={handleSubmit}
        >
          <div className="grid gap-4">
            <label className="grid gap-2 text-sm font-medium">
              Име
              <input
                className="rounded-md border border-gray-300 bg-white px-3 py-2 text-base outline-none focus:border-ember"
                name="name"
                type="text"
                value={form.name}
                onChange={updateField}
                autoComplete="name"
                required
              />
            </label>

            <label className="grid gap-2 text-sm font-medium">
              Телефон
              <input
                className="rounded-md border border-gray-300 bg-white px-3 py-2 text-base outline-none focus:border-ember"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={updateField}
                autoComplete="tel"
              />
            </label>

            <label className="grid gap-2 text-sm font-medium">
              Имейл
              <input
                className="rounded-md border border-gray-300 bg-white px-3 py-2 text-base outline-none focus:border-ember"
                name="email"
                type="email"
                value={form.email}
                onChange={updateField}
                autoComplete="email"
                required
              />
            </label>

            <label className="grid gap-2 text-sm font-medium">
              Желани дати
              <input
                className="rounded-md border border-gray-300 bg-white px-3 py-2 text-base outline-none focus:border-ember"
                name="dates"
                type="text"
                value={form.dates}
                onChange={updateField}
                placeholder="например 12-15 юли"
              />
            </label>

            <label className="grid gap-2 text-sm font-medium">
              Съобщение
              <textarea
                className="min-h-32 resize-y rounded-md border border-gray-300 bg-white px-3 py-2 text-base outline-none focus:border-ember"
                name="message"
                value={form.message}
                onChange={updateField}
                required
              />
            </label>

            <button type="submit" className="btn-primary justify-center">
              {status === 'submitting' ? 'Изпращане...' : 'Изпрати запитване'}
            </button>

            {status === 'sent' && (
              <p className="text-sm font-medium text-pine">
                Съобщението е изпратено успешно.
              </p>
            )}

            {status === 'error' && (
              <p className="text-sm font-medium text-red-700">
                {error || 'Възникна грешка при изпращането.'}
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
