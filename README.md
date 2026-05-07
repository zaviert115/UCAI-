# UC AI Society

> The official website for the UC AI Society — a student-led club at the University of Canterbury, Christchurch, New Zealand.

**Live site:** [ucaisoc.nz](https://ucaisoc.nz) _(Vercel deploy pending)_  
**Email:** ucaisoc@outlook.com  
**Instagram:** [@ucai.soc](https://instagram.com/ucai.soc)  
**Facebook:** [UC AI Society](https://www.facebook.com/profile.php?id=61582126750231)

---

## Stack

| Concern    | Choice                                                |
| ---------- | ----------------------------------------------------- |
| Framework  | Next.js 16 App Router + TypeScript (strict)           |
| Styling    | Tailwind CSS v4 + shadcn/ui                           |
| Content    | MDX files via `next-mdx-remote` + `gray-matter`       |
| Fonts      | Inter Tight + JetBrains Mono (`next/font/google`)     |
| Email      | Resend SDK — `/api/contact` route handler             |
| AI demo    | Anthropic SDK — `claude-haiku-4-5` via `/api/ai-demo` |
| Analytics  | Vercel Analytics                                      |
| Deployment | Vercel (pending)                                      |

> **CSS import note:** Tailwind v4's PostCSS plugin uses the `"style"` export condition for all `@import` statements, which Turbopack doesn't support for sub-path package exports. `tw-animate-css` and `shadcn/dist/tailwind.css` are inlined directly into `app/globals.css`. Don't switch them back to `@import` — the dev server will 500.

---

## Pages

| Route               | Description                                                                                           |
| ------------------- | ----------------------------------------------------------------------------------------------------- |
| `/`                 | Hero, stats, pillars, events teaser, projects teaser, tutorials teaser, team, AI demo, sponsors, join |
| `/events`           | Full event listing with filter chips                                                                  |
| `/events/[slug]`    | Individual event with full MDX content                                                                |
| `/tutorials`        | Tutorial index grouped by category                                                                    |
| `/tutorials/[slug]` | Full tutorial content                                                                                 |
| `/projects`         | Member project showcase                                                                               |
| `/about`            | Mission, pillars, committee cards                                                                     |
| `/contact`          | Contact form + club details                                                                           |

---

## Getting started

```bash
git clone https://github.com/zaviert115/UCAI-.git
cd UCAI-
npm install
cp .env.example .env.local   # fill in your keys
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

| Variable             | Purpose                                                                                                                                       |
| -------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `RESEND_API_KEY`     | Contact form email delivery — free key at [resend.com](https://resend.com)                                                                    |
| `CONTACT_TO_EMAIL`   | Where form submissions are sent — `ucaisoc@outlook.com`                                                                                       |
| `CONTACT_FROM_EMAIL` | Verified Resend sender — use `onboarding@resend.dev` for local testing                                                                        |
| `ANTHROPIC_API_KEY`  | Powers the AI demo — free key at [console.anthropic.com](https://console.anthropic.com). Optional: demo renders a fallback message without it |

### Scripts

```bash
npm run dev        # Dev server (Turbopack)
npm run build      # Production build
npm run lint       # ESLint
npm run typecheck  # TypeScript strict check
```

---

## Adding content

All events and tutorials are MDX files in `/content/`. No CMS, no database — just open a PR.

### Event — `content/events/your-slug.mdx`

```yaml
---
title: 'Intro to LLMs'
date: '2026-07-10'
time: '6:00 PM – 8:00 PM'
location: 'Rehua 101, UC'
description: 'Short teaser shown on the events list.'
rsvpLink: 'https://...' # optional
coverImage: '/events/img.jpg' # optional — file goes in /public/events/
---
Full event description in Markdown...
```

### Tutorial — `content/tutorials/your-slug.mdx`

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

Branch convention: `content/event-slug` or `content/tutorial-slug` → open PR.

---

## Sponsors & partners

**Platinum**

- [University of Canterbury](https://www.canterbury.ac.nz)
- [UC Engineering Pūhanga](https://www.canterbury.ac.nz/engineering)

**With support from**

- [Claude](https://claude.ai) · [OpenAI](https://openai.com) · [Google Gemini](https://gemini.google.com)

To add a sponsor: drop a logo in `public/sponsors/` and add an entry to the `sponsors` object in `components/sections/SponsorsSection.tsx`.

---

## Project structure

```
app/
├── api/
│   ├── ai-demo/       Anthropic proxy
│   └── contact/       Resend email handler
├── events/            List + [slug] detail pages
├── tutorials/         List + [slug] detail pages
├── projects/          Member project showcase
├── about/
├── contact/
├── globals.css        All design system CSS (Tailwind v4 CSS-based config)
├── layout.tsx         Root layout — Nav, Footer, fonts, analytics
└── page.tsx           Home page

components/
├── layout/            Nav, Footer
├── sections/          Page-level components (Hero, EventsSection, etc.)
└── ui/                shadcn/ui primitives

content/
├── events/            MDX event files
└── tutorials/         MDX tutorial files

lib/
├── events.ts          getAllEvents(), getEventBySlug()
├── tutorials.ts       getAllTutorials(), getTutorialBySlug()
└── contact.ts         sendContactEmail()

public/
└── sponsors/          Sponsor + partner logos
```

---

## Roadmap

- [ ] **Vercel deployment** — connect repo, add env vars, enable branch protection on `main`
- [ ] **Supabase** — Postgres backend for member sign-ups, RSVPs, and project submissions
- [ ] **Home page middle section** — placeholder removed (terminal widget), replacement TBD
- [ ] **Full committee** — 3 of 6 team cards filled; remaining slots pending committee list
- [ ] **Discord server** — footer link is a placeholder until the server is live
- [ ] **StudentLink** — registration link placeholder in footer

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for branch naming, PR process, and code style.  
Questions → [ucaisoc@outlook.com](mailto:ucaisoc@outlook.com)
