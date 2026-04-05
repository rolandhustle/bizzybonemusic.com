# Adding New Albums to the Bizzy Bone Discography

## Quick Start

To add a new album:

1. Create a `.md` file in `src/content/discography/`
2. Place the cover image in `public/covers/`
3. Run `npm run build`
4. Deploy to Vercel

The filename (without `.md`) becomes the URL slug automatically.
Example: `src/content/discography/my-album.md` → `/discography/my-album`

---

## Frontmatter Template

Copy and paste this into your new `.md` file:

```markdown
---
title: "Album Title Here"
slug: "album-slug-here"
releaseDate: "YYYY-MM-DD"
label: "Label Name"
type: "solo"
coverImage: "album-slug-here.jpg"
description: "Full description of the album. Be detailed — this appears on the album page and is used as the SEO meta description (first sentence only)."
quote: "A memorable lyric from the album."
quoteSong: "Song Title"
buyLink: "https://example.com/buy-link"
buyLinkType: "amazon"
chartPeak: "#1 Billboard 200"
certification: "Platinum"
---
```

---

## Field Reference

| Field | Required | Description |
|-------|----------|-------------|
| `title` | ✅ | Full album title |
| `slug` | ✅ | URL-safe identifier — use hyphens, no spaces (e.g. `the-gift`) |
| `releaseDate` | ✅ | ISO 8601 date: `YYYY-MM-DD` |
| `label` | ✅ | Record label name |
| `type` | ✅ | One of: `solo`, `btnth`, `collab` |
| `coverImage` | — | Filename only (e.g. `my-album.jpg`) — file must be in `public/covers/` |
| `description` | ✅ | Full description. First sentence used as SEO meta description. |
| `quote` | — | Pull quote lyric shown on album page |
| `quoteSong` | — | Song the quote is from |
| `buyLink` | — | Full URL to purchase/stream |
| `buyLinkType` | — | One of: `official`, `amazon`, `discogs`, `ebay` |
| `chartPeak` | — | e.g. `#3 Billboard 200` |
| `certification` | — | e.g. `Gold`, `Platinum`, `4× Platinum` |

### `type` values and their grid accent colors
- `solo` — blue accent (`#6b8cae`)
- `btnth` — green accent (`#7ba088`) — Bone Thugs-N-Harmony releases
- `collab` — gold accent (`#c9a962`) — collaborations with other artists

---

## Cover Images

- Place the cover image in `public/covers/`
- Name it to match `coverImage` in frontmatter
- Square images work best (aspect ratio 1:1)
- Minimum recommended size: 400×400px
- Supported formats: JPG, PNG, WebP

If `coverImage` is omitted or the file is missing, the site renders a dark placeholder tile.

---

## Downloading Cover Art

The `scripts/download-covers.js` script downloads Wikipedia cover art for the default 6 albums.

```bash
npm run download-covers
```

This runs automatically before each build (`prebuild` script). If a file already exists and is valid, it is skipped.

---

## Development

```bash
npm run dev      # Start dev server at localhost:4321
npm run build    # Build for production (runs download-covers first)
npm run preview  # Preview the production build locally
```

---

## Deploying to Vercel

The `vercel.json` is already configured. Just:

1. Push to your GitHub repo
2. Import the repo in [vercel.com](https://vercel.com)
3. Vercel auto-detects Astro and sets `npm run build` / `dist` output

Or deploy via CLI:
```bash
npx vercel --prod
```

---

## Example: Adding "Crossroads 2000" (hypothetical)

**1. Create** `src/content/discography/crossroads-2000.md`:

```markdown
---
title: "Crossroads 2000"
slug: "crossroads-2000"
releaseDate: "2000-06-15"
label: "Ruthless Records"
type: "btnth"
coverImage: "crossroads-2000.jpg"
description: "A reimagining of the 1995 classic. Bone Thugs-N-Harmony return to their spiritual roots with updated production while honoring the sound that defined a generation."
quote: "We miss our friends and family."
quoteSong: "Tha Crossroads (2000)"
buyLink: "https://www.amazon.com/example"
buyLinkType: "amazon"
chartPeak: "#12 Billboard 200"
certification: "Gold"
---
```

**2. Add** `public/covers/crossroads-2000.jpg`

**3. Build:**
```bash
npm run build
```

Done. The album appears in the grid sorted by release date, with its own page at `/discography/crossroads-2000`.
