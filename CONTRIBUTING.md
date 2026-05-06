# Contributing to UC AI Society Website

Thanks for helping improve the UC AI SOC website. Whether you're fixing a typo, adding a tutorial, or shipping a feature — you're welcome here.

---

## Branch naming

| Type                        | Pattern                     | Example                       |
| --------------------------- | --------------------------- | ----------------------------- |
| New feature                 | `feature/short-description` | `feature/dark-mode`           |
| Bug fix                     | `fix/short-description`     | `fix/mobile-nav-overlap`      |
| Content (event or tutorial) | `content/type-name`         | `content/event-intro-to-llms` |
| Docs / README               | `docs/short-description`    | `docs/update-env-vars`        |

Work on a branch, never directly on `main`.

---

## Commit messages

Use [Conventional Commits](https://www.conventionalcommits.org/) as a guide, but don't stress about it:

```
feat: add sponsors strip to home page
fix: correct mobile nav z-index
content: add intro to LLMs event
docs: clarify env var setup in README
```

One commit per logical change. Squash "WIP" commits before opening a PR.

---

## Pull request process

1. Fork the repo (external contributors) or create a branch (committee members with access)
2. Make your changes on a descriptive branch
3. Make sure `npm run lint`, `npm run typecheck`, and `npm run build` all pass locally
4. Open a PR against `main` and fill in the PR template
5. At least one committee member must review and approve before merging
6. CI must pass (lint + typecheck + build)

---

## Code style

- TypeScript strict mode — no `any` without a comment explaining why
- Functional React components, hooks, no class components
- `async/await` over `.then()`
- Named exports for components (`export function MyComponent`)
- Prettier handles formatting automatically on commit via Husky
- No comments unless the "why" is genuinely non-obvious

---

## Adding an event (no code required)

1. Create a file in `content/events/your-event-slug.mdx`
2. Copy the frontmatter template from the README
3. Write the event description in Markdown below the frontmatter
4. Open a PR with branch `content/event-your-event-name`

The site will automatically show it as "upcoming" or "past" based on the `date` field.

## Adding a tutorial (no code required)

1. Create a file in `content/tutorials/your-tutorial-slug.mdx`
2. Copy the frontmatter template from the README
3. Write the tutorial in Markdown below the frontmatter
4. Open a PR with branch `content/tutorial-your-tutorial-name`

---

## Questions?

Open a GitHub issue or email [committee@ucaisoc.nz](mailto:committee@ucaisoc.nz).
