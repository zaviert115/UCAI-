# UC AI Society Website

The official website for the UC AI Society — a student-led club at the University of Canterbury, Christchurch, NZ, focused on helping students understand and use AI in practical, ethical, and real-world ways.

**Live site:** [ucaisoc.nz](https://ucaisoc.nz) (once deployed)

---

## Tech stack

- [Next.js 16](https://nextjs.org) (App Router) + TypeScript
- [Tailwind CSS v4](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com)
- Content: MDX files in `/content/` (no external CMS)
- Contact form: [Resend](https://resend.com)
- Deployment: [Vercel](https://vercel.com)
- Analytics: Vercel Analytics (privacy-friendly, no cookie banner needed)

---

## Getting started

### Prerequisites

- Node.js 20 or later (`node -v` to check)
- npm 10 or later (comes with Node)
- Git

### Setup

```bash
# 1. Clone the repo
git clone https://github.com/ucaisoc/website.git
cd website

# 2. Install dependencies
npm install

# 3. Copy the example env file and fill in your values
cp .env.example .env.local
# Edit .env.local — see the "Environment variables" section below

# 4. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment variables

| Variable             | Required               | Description                                        |
| -------------------- | ---------------------- | -------------------------------------------------- |
| `RESEND_API_KEY`     | Yes (for contact form) | Get a free key at [resend.com](https://resend.com) |
| `CONTACT_TO_EMAIL`   | Yes                    | Email address where form submissions are sent      |
| `CONTACT_FROM_EMAIL` | Yes                    | Verified sender address in your Resend account     |

For local testing without a real Resend account, set `CONTACT_FROM_EMAIL=onboarding@resend.dev` — this uses Resend's test sender.

---

## Adding content

### Events

Create a new file in `content/events/`:

```
content/events/your-event-slug.mdx
```

Frontmatter schema:

```yaml
---
title: 'Your Event Title'
date: '2026-07-15' # ISO 8601 date — determines upcoming vs past
time: '6:00 PM – 8:00 PM'
location: 'Rehua 101, UC'
description: 'One-paragraph teaser shown on the events list page.'
rsvpLink: 'https://...' # optional — shown as a button on the event page
coverImage: '/events/your-image.jpg' # optional — put images in /public/events/
---
Your full event description in Markdown...
```

Then open a PR with the branch name `content/event-your-event-name`.

### Tutorials

Create a new file in `content/tutorials/`:

```
content/tutorials/your-tutorial-slug.mdx
```

Frontmatter schema:

```yaml
---
title: 'Your Tutorial Title'
category: 'Getting Started' # groups tutorials on the index page
author: 'Your Name'
date: '2026-07-01'
readTime: 8 # estimated reading time in minutes
description: 'One-paragraph teaser.'
---
Your tutorial content in Markdown...
```

Then open a PR with the branch name `content/tutorial-your-tutorial-name`.

---

## Project structure

```
app/                  Next.js App Router pages and API routes
  api/contact/        Contact form route handler
  events/             Event list + detail pages
  tutorials/          Tutorial list + detail pages
  about/              About page
  contact/            Contact page
components/
  layout/             Nav, Footer, PageContainer
  sections/           Page-level composed components
  ui/                 shadcn/ui primitives
content/
  events/             MDX files for events
  tutorials/          MDX files for tutorials
lib/
  events.ts           getAllEvents(), getEventBySlug()
  tutorials.ts        getAllTutorials(), getTutorialBySlug()
  contact.ts          sendContactEmail()
types/                TypeScript interfaces
public/               Static assets
```

---

## Available scripts

```bash
npm run dev        # Start development server
npm run build      # Production build
npm run start      # Start production server (after build)
npm run lint       # Run ESLint
npm run typecheck  # Run TypeScript compiler check
```

---

## Deployment

This site deploys automatically to Vercel when PRs are merged to `main`. To set this up:

1. Push the repo to GitHub
2. Connect the GitHub repo to a new Vercel project
3. Add the environment variables in Vercel's project settings
4. Enable branch protection on `main` in GitHub (Settings → Branches)

Vercel will create a preview deployment for every PR automatically.

---

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for branch naming, PR process, and code style notes.

Questions? Open an issue or email [committee@ucaisoc.nz](mailto:committee@ucaisoc.nz).
