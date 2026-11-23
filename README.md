<h1 align="center">Ngoc Phuong — Personal Developer Portfolio</h1>

<p align="center">
  Interactive multi-theme portfolio of <strong>Hoang Thi Ngoc Phuong</strong> — Software Engineer, AI & Computer Vision Developer, and IT Student at The University of Danang – University of Science and Technology (DUT).
</p>

## Overview

This portfolio showcases my projects, technical stack, academic journey, and community involvement across software engineering and AI/Computer Vision. It is built with:

- **Next.js 16 (App Router)** + **React 19** + **TypeScript**
- **Tailwind CSS v4** with semantic CSS variables across **7 real-time visual themes**
- **Three.js / React Three Fiber / `@chibi3d/runtime`** for 3D theme worlds and an interactive **3D Mechanical Keyboard** in the Tech Stack section with Web Audio SFX
- **Velite** content pipeline for structured YAML (`bio`, `resume`, `expertise`) and MDX (`projects`, `blogs`)
- **Biome**, **Vitest**, and **axe-core** for formatting, linting, unit/integration testing, and accessibility checks

## Key Features

| Section / Area | Highlights |
| --- | --- |
| **Hero & Navigation** | Centered portrait frame, animated stack ribbons, quick links (GitHub, LinkedIn, Facebook, Email, CV), custom circular avatar navbar, and 7-theme switcher (`light`, `dark`, `cyberpunk`, `ethereal`, `horizon`, `mirage`, `simple`). |
| **Interactive About Me** | 6 clickable activity & project photo cards (GDGoC – DUT, DUT HarvestAI, VoiceTurk, FairInsight, Hue Science & Engineering Fair, TINPATH) that flip/reveal concise summaries on click, alongside bio, key strengths, and color-coded `Skills & Tools` pills. |
| **3D Mechanical Keyboard Tech Stack** | Interactive 28-key 3D mechanical keyboard (`@chibi3d/runtime`) mapped to my skills with custom white SVG keycap legends, mechanical press/release sound effects (`Web Audio API`), hover/tap/physical-key support, and `IntersectionObserver` lazy-mounting for smooth page transitions. |
| **Featured Projects & Detail Modal** | Interactive project cards for **FairInsight**, **VoiceTurk**, and **AgriHarvest AI** — clicking any project opens a modal with a large preview, 4 clickable gallery thumbnails, tech tags, and direct links to the live website, demo video, or GitHub repository. |
| **Experience & Education** | Timeline covering my Career Objective, GDG on Campus – DUT, Gimme Idea, DSUC Blockchain Club, and B.E. in Information Technology at DUT. |
| **Blog & Contact** | MDX technical articles, RSS feed (`/rss.xml`), sitemap (`/sitemap.xml`), and a Resend-powered contact form (`/api/contact`). |

## Project Structure

```text
src/
  app/                 # Next.js App Router pages, API routes, OG/RSS/sitemap
  components/
    icons/             # Custom brand & social icons
    keyboard/          # 3D interactive mechanical keyboard scene, input & Web Audio SFX
    layout/            # Navbar, Footer, ProjectDetailModal, ProjectList, BlogList
    sections/          # Hero, AboutContent, Expertise, Experience, ProjectsPreview, Contact
    seo/               # JSON-LD structured data components
    theme/             # 7-theme provider, WebGL/GLSL scenes, and visual effects
  content/
    bio/               # Personal profile, summary, social links, CV
    blogs/             # MDX blog posts
    expertise/         # 28 skills across 6 categories
    projects/          # FairInsight, VoiceTurk, AgriHarvest AI (MDX + galleries)
    resume/            # Experience, activities, and DUT education
  hooks/               # Scroll, theme, motion & low-data preference hooks
  lib/                 # Theme registry, site config, utilities, schemas
  styles/              # Global CSS, theme tokens, animations
public/
  assets/
    images/            # Portraits, About photo cards, project covers & galleries
    keyboard/          # 3D keycap model (.glb) and 28 white 512x512 SVG keycap logos
    keycap-sounds/     # Mechanical key press & release audio (.mp3)
  fonts/               # 3D typeface JSON for Three.js text geometry
```

## Getting Started

### Prerequisites

- **Node.js** `>= 22.0.0`
- **npm** `>= 10`

### Installation & Local Development

```bash
# Install dependencies
npm install --legacy-peer-deps

# Start Velite watcher + Next.js dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build & Start

```bash
# Clean, build Velite content, and build Next.js production bundle
npm run build

# Run production server
npm run start
```

### Quality Checks

```bash
npm run lint          # Biome lint
npm run format        # Biome format
npm run type-check    # Velite build + TypeScript check
npm run test          # Vitest test suite
npm run check:bundle  # Initial JS bundle budget check
```

## Environment Variables

Create a `.env.local` file for the contact form email service (Resend):

```env
RESEND_API_KEY=your_resend_api_key
```

> If `RESEND_API_KEY` is not set, the site builds and runs normally, while `POST /api/contact` returns `503`.

## Contact

- **Name:** Hoang Thi Ngoc Phuong
- **Email:** [hoangngocphuongcute@gmail.com](mailto:hoangngocphuongcute@gmail.com)
- **GitHub:** [github.com/PHUOBG](https://github.com/PHUOBG)
- **LinkedIn:** [linkedin.com/in/ngọc-phương-7a6267411](https://www.linkedin.com/in/ng%E1%BB%8Dc-ph%C6%B0%C6%A1ng-7a6267411)
- **Facebook:** [facebook.com/phuong0v0](https://www.facebook.com/phuong0v0)
- **CV:** [canva.link/cv-cua-fuong](https://canva.link/cv-cua-fuong)

## License

Personal portfolio of Hoang Thi Ngoc Phuong. All rights reserved.
