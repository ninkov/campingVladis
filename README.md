# Camping Vladis — React + Vite + Tailwind

This project is a modern single-page React application (Vite + Tailwind) for a camping and caravan site showcase.

Quick start

```bash
npm install
npm run dev
```

Generate LQIP placeholders (recommended before build)

```bash
# Generates src/data/placeholders.json with small base64 placeholders
npm run generate:lqip

# or automatically run before build
npm run build
```

Husky (pre-commit hooks)

```bash
npm run prepare
```

Build

```bash
npm run build
```

Deploy (Cloudflare Pages)

- Connect this GitHub repository in Cloudflare Pages.
- Framework preset: `Vite`
- Build command: `npm run build`
- Build output directory: `dist`
- Root directory: `/`
- Node.js version: `18` or `20`

Contact form

- The contact form posts to the Cloudflare Pages Function at `/api/contact`.
- Configure these Cloudflare Pages environment variables:
  - `RESEND_API_KEY`
  - `CONTACT_TO_EMAIL`
  - `CONTACT_FROM_EMAIL`
- `CONTACT_FROM_EMAIL` should use a sender verified in Resend, for example `Camping Vladis <contact@yourdomain.com>`.

Notes

- Image assets live in the `img/` folder. The gallery uses Vite asset URLs.
- A small build-time script (`scripts/generate-lqip.js`) creates `src/data/placeholders.json`. The file is generated during `npm run build` and is ignored by git.
- If you add or change images in `img/`, `npm run build` will regenerate the placeholders.

Troubleshooting

- If you see broken placeholders, ensure `sharp` is installed (it is declared as a devDependency). On some systems, `sharp` may require additional native libs — consult the `sharp` documentation.

Happy hacking — if you want visual tweaks or accessibility improvements, open an issue or send a PR.
