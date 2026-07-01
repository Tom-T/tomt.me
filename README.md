# tomt.me — hire-me landing page

A single-page, fully static "professional calling card" for Tom Tijerina, built to be
served as-is by **Cloudflare Pages**. No build step, no framework, no npm dependencies —
Cloudflare serves this directory directly.

## Files

| File            | Purpose                                                            |
| --------------- | ----------------------------------------------------------------- |
| `index.html`    | The page (semantic HTML, all sections).                           |
| `styles.css`    | Single stylesheet; mobile-first, `prefers-color-scheme` light/dark. |
| `script.js`     | Tiny vanilla JS (just keeps the footer year current). Page works without it. |
| `favicon.svg`   | SVG favicon (TT monogram).                                         |
| `og-image.svg`  | Social preview art. **See "Placeholders" — needs a PNG for LinkedIn.** |
| `robots.txt`    | Allows all crawlers; references sitemap.                           |
| `_headers`      | Cloudflare Pages security headers (CSP, HSTS, nosniff, etc.).      |
| `README.md`     | This file.                                                        |

## Local preview

No tooling required. Any static server works, e.g.:

```bash
cd projects/tomt-me-site
python3 -m http.server 8080
# open http://localhost:8080
```

## Deploy to Cloudflare Pages

> BUILD ARTIFACT ONLY — nothing here has been deployed. Do the steps below yourself when ready.

### Option A — Dashboard drag-and-drop (simplest)

1. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → **Upload assets**.
2. Name the project (e.g. `tomt-me`).
3. Drag the **contents** of this directory (not the parent folder) into the uploader.
4. Deploy. You get a `*.pages.dev` preview URL to verify before attaching the domain.

### Option B — Wrangler CLI

```bash
# From inside projects/tomt-me-site/
npx wrangler pages deploy ./ --project-name tomt-me
```

(Build command: none. Output directory: the directory itself / `./`.)

## Attaching the custom domain — READ THIS FIRST

> ⚠️ **CRITICAL — DO NOT BREAK EMAIL.** `tomt.me` uses **Migadu** for email. Its **MX
> records** (and the SPF / DKIM / DMARC TXT records) MUST stay intact. Email delivery
> and the website are independent — do not let one clobber the other.

Attach the domain the **safe** way:

1. In the Pages project → **Custom domains** → **Set up a custom domain** → enter
   `tomt.me` (and/or `www.tomt.me`).
2. Cloudflare will add a **CNAME** (or a `@` flattened/`A`+`AAAA` for the apex) that
   points the website only. **Accept only the record Cloudflare proposes for the
   website host.**
3. **Do NOT delete, edit, or "replace all" the existing DNS records.** In particular:
   - **Leave every `MX` record exactly as-is** (Migadu inbound mail).
   - **Leave the Migadu `TXT` records** (SPF `v=spf1 include:spf.migadu.com ...`,
     DKIM `key1._domainkey` / `key2._domainkey` CNAMEs, and any DMARC `_dmarc` TXT).
   - **Leave the Migadu ownership/verification records** if present.
4. After attaching, **verify email still flows**: send a test message to `tom@tomt.me`
   and confirm it arrives, and send one out. Only then consider the change complete.

If Cloudflare ever offers to "scan and import" or "replace" DNS records during setup,
review the diff carefully and **keep all MX/TXT mail records**.

## Placeholders that still need filling

- [ ] **Résumé PDF** — the hero "Résumé" button links to `/resume.pdf`. Drop a
      `resume.pdf` file into this directory before deploying, or the link 404s.
- [ ] **OG social image** — `index.html` references `https://tomt.me/og-image.png`.
      LinkedIn/Twitter previews want a raster **PNG** (1200×630). Convert the provided
      `og-image.svg`:
      ```bash
      # one option (ImageMagick or rsvg-convert / resvg)
      rsvg-convert -w 1200 -h 630 og-image.svg -o og-image.png
      ```
      …then commit `og-image.png` alongside. (Or swap the meta tags to point at a
      different image URL.)
- [ ] **Relytical link** — `index.html`, Selected work card → replace the `href="#"`
      (`Live site — link coming`) with the real URL.
- [ ] **Mainframe-modernization links** — replace the two `href="#"` placeholders
      (GitHub repo + live demo) once published.
- [ ] **Video embeds** — the Video section has two 16:9 placeholders with commented
      example markup for YouTube and Cloudflare Stream `<iframe>`s. Replace the
      `.video__placeholder` block(s) with a real iframe. The `_headers` CSP already
      allow-lists `youtube-nocookie.com`, `youtube.com`, and `cloudflarestream.com`
      under `frame-src` — trim whichever you don't use.
- [ ] **Sitemap (optional)** — `robots.txt` points at `/sitemap.xml`, which isn't
      included (single page). Add one if desired, or remove the `Sitemap:` line.

## Notes

- **Accessibility:** skip link, semantic landmarks, labeled sections, keyboard-focusable
  CTAs with visible focus rings, `role="img"` + `aria-label` on the video placeholders.
- **Privacy:** the public page intentionally contains **no phone number**. Contact is
  email, LinkedIn, and cal.com only.
- **Performance:** self-contained, no external fonts/CDNs, system font stack.
