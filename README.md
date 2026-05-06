# UC AI Society — Website

Official website for the UC AI Society, a student-led club at the University of Canterbury, Christchurch, New Zealand. We help students understand and use AI in practical, ethical, and real-world ways.

**Live site:** [ucaisoc.nz](https://ucaisoc.nz) _(pending Vercel deploy)_
**Contact:** ucaisoc@outlook.com
**Instagram:** [@ucai.soc](https://instagram.com/ucai.soc)
**Facebook:** [UC AI Society](https://www.facebook.com/profile.php?id=61582126750231)

---

## What's in this repo

This is a Next.js 16 App Router site built from scratch in May 2026. The full design was implemented in one session — glow hero, constellation canvas animation, events/tutorials system, team section, AI demo, sponsors strip, and join CTA.

### Pages

| Route               | Description                                                                                               |
| ------------------- | --------------------------------------------------------------------------------------------------------- |
| `/`                 | Home — hero, stats, pillars, events teaser, projects, tutorials teaser, team, AI demo, sponsors, join CTA |
| `/events`           | Full events listing with filter chips (upcoming / workshop / panel / all)                                 |
| `/events/[slug]`    | Individual event page with full MDX content                                                               |
| `/tutorials`        | Tutorial index grouped by category                                                                        |
| `/tutorials/[slug]` | Full tutorial content                                                                                     |
| `/about`            | Mission, what we do, committee cards                                                                      |
| `/contact`          | Contact form + club details                                                                               |

### Content

All events and tutorials are MDX files — no CMS, no database, no paid services required to run the site.

```
content/
  events/      ← one .mdx file per event
  tutorials/   ← one .mdx file per tutorial
```

Adding content = opening a PR with a new `.mdx` file. No code knowledge required.

---

## Tech stack

| Concern    | Choice                                                                |
| ---------- | --------------------------------------------------------------------- |
| Framework  | Next.js 16 (App Router) + TypeScript strict                           |
| Styling    | Tailwind CSS v4 + shadcn/ui — CSS-based config, no tailwind.config.ts |
| MDX        | `next-mdx-remote` + `gray-matter`                                     |
| Fonts      | Inter Tight + JetBrains Mono via `next/font/google`                   |
| Email      | Resend SDK via `/api/contact` route handler                           |
| AI demo    | Anthropic SDK — `claude-haiku-4-5` proxied through `/api/ai-demo`     |
| Analytics  | Vercel Analytics (no cookie banner needed)                            |
| Deployment | Vercel (pending)                                                      |

### Known quirk — CSS imports

Tailwind CSS v4's PostCSS plugin resolves `@import` statements using the `"style"` export condition, which Turbopack doesn't handle for sub-path exports. `tw-animate-css` and `shadcn/dist/tailwind.css` are therefore **inlined directly** into `app/globals.css` rather than imported. Don't switch them back to `@import` — the dev server will 500.

---

## Sponsors & partners

**Platinum**

- University of Canterbury — [canterbury.ac.nz](https://www.canterbury.ac.nz)
- UC Engineering Pūhanga — [canterbury.ac.nz/engineering](https://www.canterbury.ac.nz/engineering)

**With support from**

- [Claude](https://claude.ai) (Anthropic)
- [OpenAI](https://openai.com)
- [Google Gemini](https://gemini.google.com)

Logo files live in `public/sponsors/`. To add a sponsor: drop a PNG/JPG in that folder, then add an entry to the `sponsors` object in `components/sections/SponsorsSection.tsx`.

---

## Getting started

### Prerequisites

- Node.js 20+ (`node -v`)
- npm 10+ (bundled with Node)

### Setup

```bash
git clone https://github.com/zaviert115/UCAI-.git
cd UCAI-
npm install
cp .env.example .env.local
# fill in .env.local, then:
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

| Variable             | Required         | Description                                                                                                                         |
| -------------------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `RESEND_API_KEY`     | For contact form | Free key at [resend.com](https://resend.com)                                                                                        |
| `CONTACT_TO_EMAIL`   | For contact form | `ucaisoc@outlook.com`                                                                                                               |
| `CONTACT_FROM_EMAIL` | For contact form | Verified sender in Resend (use `onboarding@resend.dev` for local testing)                                                           |
| `ANTHROPIC_API_KEY`  | For AI demo      | Free key at [console.anthropic.com](https://console.anthropic.com) — demo still renders without it, just returns a fallback message |

---

## Available scripts

```bash
npm run dev        # Dev server (Turbopack)
npm run build      # Production build
npm run lint       # ESLint
npm run typecheck  # TypeScript check (strict)
```

---

## Adding content

### New event

Create `content/events/your-slug.mdx`:

```yaml
---
title: 'Intro to LLMs'
date: '2026-07-10'
time: '6:00 PM – 8:00 PM'
location: 'Rehua 101, UC'
description: 'Short teaser shown on the events list.'
rsvpLink: 'https://...' # optional
coverImage: '/events/img.jpg' # optional — put image in /public/events/
---
Full event description in Markdown...
```

Branch name: `content/event-your-slug` → open PR.

### New tutorial

Create `content/tutorials/your-slug.mdx`:

```yaml
---
title: 'Prompt Engineering 101'
category: 'Prompt Engineering'
author: 'Your Name'
date: '2026-07-01'
readTime: 8
description: 'Short teaser shown on the tutorials list.'
---
Full tutorial in Markdown...
```

Branch name: `content/tutorial-your-slug` → open PR.

---

## Roadmap / under consideration

- **Supabase** — considering adding a Postgres backend via Supabase for member sign-ups, event RSVPs, or a project showcase with real data. Current MDX-file approach is fine while the site is mostly content-driven; Supabase would unlock dynamic features without managing our own server.
- **Vercel deployment** — repo is ready to connect. Steps: push to GitHub → new Vercel project → add env vars → enable branch protection on `main`. Preview deploys happen automatically on every PR.
- **MiniTerminal section** — placeholder removed from home page, to be replaced with something new (TBD).
- **Remaining committee cards** — team section currently has 3 real members (Ryder Earp-Jones, Owen Leary, Zavier Taylor) + 3 placeholder slots. Fill these in via PR once the full committee list is confirmed.
- **Discord link** — footer Discord link is `#` placeholder, update once the server is set up.
- **StudentLink** — footer "StudentLink sign-up" is a placeholder for the UC StudentLink registration link.

---

## Project structure

```
app/
  api/
    ai-demo/       Anthropic proxy route
    contact/       Resend email route handler
  events/          List + detail pages
  tutorials/       List + detail pages
  about/
  contact/
  globals.css      All design system CSS (Tailwind v4 CSS-based config)
  layout.tsx       Root layout — Nav, Footer, fonts, analytics
  page.tsx         Home page
components/
  layout/          Nav, Footer
  sections/        Page-level components (Hero, EventsSection, etc.)
  ui/              shadcn/ui primitives
content/
  events/          MDX event files
  tutorials/       MDX tutorial files
lib/
  events.ts        getAllEvents(), getEventBySlug()
  tutorials.ts     getAllTutorials(), getTutorialBySlug()
  contact.ts       sendContactEmail() — thin Resend wrapper
types/             TypeScript interfaces (Event, Tutorial)
public/
  sponsors/        Sponsor and partner logos
```

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for branch naming, PR process, and code style.

Questions → open an issue or email [ucaisoc@outlook.com](mailto:ucaisoc@outlook.com).
