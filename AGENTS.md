# AGENTS

## Repo Shape
- This repo is the production site. There is no build step, package manager, or test/lint/typecheck setup.
- Public routes are folder-based pages such as `/academy/` backed by `academy/index.html`.
- Root `*.html` files like `about.html` are legacy redirect stubs. They are `noindex,follow` compatibility pages, not the canonical content.
- Most apps are single-file pages with inline HTML/CSS/JS and CDN-loaded dependencies. There is no bundler or shared app framework to update centrally.

## Preview / Verification
- `README.md` mentions `python3 -m http.server`, but for real route checks use the repo's extensionless preview server instead: `python3 preview_server.py --host 127.0.0.1 --port 8123`
- Use the preview server to verify extensionless routes such as `/academy`, `/ai`, `/webscience`.
- For simple static checks, open the actual page files and confirm metadata directly; there is no automated verification suite.

## Routing Conventions
- Canonical public URLs use trailing-slash folder routes, e.g. `https://pashtuneinstein.com/academy/`.
- If you rename or add a public page, update the folder route first. Only touch the root stub if you need to preserve old `.html` links.
- Redirect stubs should stay `noindex,follow` and point to the trailing-slash canonical route.
- Those stubs are soft redirects implemented in HTML/JS. If the task requires true HTTP `301` behavior for Search Console, that must be done in Cloudflare, not by editing the stub page alone.

## SEO / Discovery Files
- Keep page metadata in sync manually; there is no shared template.
- When adding, removing, or renaming canonical pages, update all of these if affected:
  - `sitemap.xml`
  - `robots.txt` if the sitemap location changes
  - `llms.txt`
  - `llms-full.txt`
  - page-level JSON-LD and breadcrumb schema in the edited HTML files
- If the route should be discoverable from the site UI, also update the manual link hubs in `index.html` and `academy/index.html`.
- `resources/index.html` is the main-domain crawlable hub for off-domain PDFs and blog links; keep it in sync if those featured resources change.
- JS-heavy pages should keep meaningful crawlable HTML near the top of `<body>` plus `noscript` fallback text; do not rely on client-side rendering alone for discoverability.
- Blog (`blog.pashtuneinstein.com`) is a separate subdomain. Its sitemap and cross-linking back to the main site should be managed on the blog side. Ensure blog posts link to the main domain for SEO cross-verification.

## PWA / Offline
- If you add or remove major top-level routes or shared assets, update `sw.js` `APP_SHELL`; the service worker pre-caches explicit paths.
- `manifest.json` has hard-coded shortcuts for a few flagship routes; update them only when those promoted destinations change.
- `pwa.js` registers `sw.js` from the site root, so root-relative paths matter.

## Content Hotspots
- Main landing page: `index.html`
- Main route hub: `academy/index.html`
- Crawlable resource hub: `resources/index.html`
- Route pages: `<route>/index.html`
- Local routing preview: `preview_server.py`
- PWA files: `manifest.json`, `pwa.js`, `sw.js`

## Deployment
- GitHub Pages serves this repo directly from committed files, with the custom domain set in `CNAME`.
- Cloudflare can add production redirects that do not exist in this repo; do not assume a repo-side HTML refresh is equivalent to the live edge redirect behavior.
