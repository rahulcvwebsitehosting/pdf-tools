# PDF Tools - Free Online PDF Utilities

A collection of browser-based utility tools for PDF, image, text, developer tasks, calculators, and file conversion. Everything runs 100% client-side — no uploads, no servers.

Built by [Rahul S](https://rahulshyam-portfolio.vercel.app/)

## Features

- **100+ free tools** — PDF merge/split/compress, JSON formatter, image converter, calculators & more
- **Universal File Converter** (`/converter`) — 82 WASM-based handlers (FFmpeg, ImageMagick, pandoc, 7-Zip, etc.)
- **Zero server uploads** — all processing in your browser via WebAssembly
- **Privacy first** — files never leave your device
- **Dark/Light theme** — persistent toggle across sessions
- **Free forever** — no sign-ups, no paywalls

## Tech Stack

- Next.js 16
- TypeScript
- Tailwind CSS v4
- pdf-lib, Tesseract.js, Transformers.js
- **convert-master** — Vite-based WASM converter (handlers: FFmpeg, ImageMagick, pandoc, libopenmpt, 7-Zip, eSpeak-ng, FluidSynth, etc.)

## Local Dev

```bash
npm install
npm run dev
```

Large binary assets (WASM, data files) in `public/converter/` are tracked via Git LFS.
