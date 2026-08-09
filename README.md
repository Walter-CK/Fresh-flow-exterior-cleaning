# Fresh Flow Exterior Cleaning

A static, multi-page marketing site built in the same layout convention as the Brightbeats reference: each page has its own folder and `index.html`, and all shared styles and behaviour live at the project root.

## Preview locally

From this folder, run a simple local web server:

```powershell
cd C:\Users\wmacl\Documents\Playground\FreshFlow
python -m http.server 8080
```

Then open `http://localhost:8080`. A local server is recommended because navigation uses hosting-ready root paths such as `/services/`.

## Project structure

```text
FreshFlow/
├── index.html             Home
├── services/index.html    Service breakdowns
├── gallery/index.html     Placeholder gallery + lightbox
├── about/index.html       Local story and service area
├── contact/index.html     Quote form and contact details
├── styles.css             Shared visual system and responsive layout
├── script.js              Shared nav, reveals, lightbox and form behaviour
└── images/
    ├── favicon.svg
    └── logo/              Drop the final supplied logo assets here
```

## Before launch

1. Replace every visible `[REPLACE: ...]` marker with real business information.
2. Add the final Fresh Flow logo under `images/logo/`. The temporary text brand can then be swapped for an `<img>` in the repeated page headers/footers.
3. Replace the Unsplash URLs with real Fresh Flow photography, especially the gallery placeholders.
4. Update the placeholder email address in `script.js` so the quote form opens the correct inbox, or connect the form to a preferred form service.
5. Add a deployed domain to canonical/OG URL tags if required, plus social preview artwork.

All placeholder photography is clearly labelled in page copy and alt text; it is not presented as Fresh Flow work.
