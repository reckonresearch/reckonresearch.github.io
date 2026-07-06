# Reckon Research — Static Website

Pure HTML/CSS static website for [reckonresearch.com](https://www.reckonresearch.com). No build step, no framework, no JavaScript dependencies. Fully crawlable by search engines and passes Google's Rich Results Test.

## Stack

| Layer | Technology |
|---|---|
| Markup | Semantic HTML5 |
| Styles | Plain CSS (custom properties, no preprocessor) |
| Scripts | Vanilla JS (theme toggle, copy buttons, scroll spy) |
| Fonts | Google Fonts CDN (Playfair Display, Source Serif 4, JetBrains Mono, Inter) |
| SEO | JSON-LD structured data (Organization, WebSite, WebPage, ResearchProject) |
| Deploy | GitHub Actions → GitHub Pages |

## File Structure

```
reckon-static/
├── index.html          ← Main page (all content)
├── css/
│   └── style.css       ← All styles (light + dark mode)
├── assets/
│   ├── reckon-logo.png         ← Full logo, navy (light mode)
│   ├── reckon-logo-white.png   ← Full logo, white (dark mode mobile)
│   ├── reckon-mark.png         ← Emblem only, navy (light mode sidebar)
│   ├── reckon-mark-white.png   ← Emblem only, white (dark mode sidebar)
│   └── favicon.ico             ← Nautical chart + mark favicon
├── robots.txt
├── sitemap.xml
├── CNAME               ← www.reckonresearch.com
└── .github/
    └── workflows/
        └── deploy.yml  ← GitHub Pages auto-deploy on push to main
```

## Local Preview

No build step needed. Open directly in a browser:

```bash
# Option 1: Python (built-in)
python3 -m http.server 8080 --directory .
# then open http://localhost:8080

# Option 2: Node (npx)
npx serve .
```

## Deploy to GitHub Pages

1. Push this repo to GitHub (any account)
2. Go to **Settings → Pages → Source → GitHub Actions**
3. The `deploy.yml` workflow fires on every push to `main`
4. Set custom domain: **Settings → Pages → Custom domain** → `www.reckonresearch.com`
5. Check **Enforce HTTPS**

## Content Editing

All content lives in `index.html`. Each section is clearly commented:

- `<!-- 1.0 Reckon Research -->` — hero / mission
- `<!-- 2.0 Why placement -->` — thesis
- `<!-- 3.0 Research agenda -->` — roadmap
- `<!-- 4.0 berth -->` — open-source tool
- `<!-- 5.0 Who we are -->` — team
- `<!-- 6.0 Working with us -->` — contact

To update the Substack URL, search for `reckonresearch.substack.com` and replace with your URL.

## Design System

| Token | Light | Dark |
|---|---|---|
| Brand navy | `#0D1F5C` | `#0D1F5C` |
| Background | `#FFFFFF` | `#0D1425` |
| Sidebar bg | `#F8F9FB` | `#0A1130` |
| Foreground | `#1A2340` | `#D8E0F0` |
| Section labels | `#8A93A8` | `#4A5578` |
| Dividers | `#E8EBF0` | `rgba(255,255,255,0.08)` |

Fonts: **Playfair Display** (headings) · **Source Serif 4** (body) · **JetBrains Mono** (code) · **Inter** (labels/UI)

## SEO

The page includes:
- `<title>`, `<meta name="description">`, `<link rel="canonical">`
- Open Graph and Twitter Card meta tags
- JSON-LD: `Organization`, `WebSite`, `WebPage`, `ResearchProject`
- `sitemap.xml` and `robots.txt`

Test with [Google's Rich Results Test](https://search.google.com/test/rich-results) using `https://www.reckonresearch.com/`.

## License

MIT © 2026 Reckon Research
