# Dhvaniq homepage

Static homepage using the existing product tokens, local Inter/Inter Tight fonts, official SVG logos, and custom native SVG illustrations. Login and early access link to app.dhvaniq.com.

## Preview

Run `python3 -m http.server 4173` from this directory and open http://localhost:4173.

## Editing

- `index.html`: approved copy and page structure; inline SVGs inherit the page fonts.
- `styles.css`: responsive layout and interaction styling.
- `assets/tokens.css`: light-theme tokens copied from the Dhvaniq design system.
- `scripts/illustrations.py`: editable source of product illustrations. Run `python3 scripts/illustrations.py` to rebuild SVG files and synchronize inline illustrations.
- `DESIGN.md`: design decisions and layout comparison.

Illustrations use fictional sample conversations. The owner requested removal of visible preview and availability labels. Early-access positioning remains; label removal does not verify production readiness.

No build tool or CMS is required. Astro and Sanity are deferred.
