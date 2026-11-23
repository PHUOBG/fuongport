# Development & Contribution Guide

This repository is the personal portfolio of **Hoang Thi Ngoc Phuong**.

## Local Workflow

1. Install dependencies: `npm install --legacy-peer-deps`
2. Start dev server with Velite content watch: `npm run dev`
3. Format & lint: `npm run lint && npm run format`
4. Type-check: `npm run type-check`
5. Run tests: `npm run test`
6. Build production bundle: `npm run build`
7. Check bundle budget: `npm run check:bundle`

## Standards

- **Accessibility first:** Interactive components must support keyboard navigation, focus management, and proper ARIA labels.
- **Motion & performance:** Respect `prefers-reduced-motion` and lazy-load heavy 3D/WebGL scenes (`IntersectionObserver` + `next/dynamic`).
- **Image optimization:** Always pass `sizes` to `next/image` and avoid `unoptimized`.
- **Environment variables:** Validate server-only environment variables via `src/lib/env.server.ts`.
- **Content updates:** Edit YAML/MDX files under `src/content/` and run `npm run velite` (or `npm run build`) to regenerate typed data.
