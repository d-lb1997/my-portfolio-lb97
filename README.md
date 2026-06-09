# Lukas — Portfolio

Open `index.html` in your browser to preview this minimal portfolio.

Files of interest:
- `index.html`, `work.html`, `about.html`, `contact.html`
- `assets/styles.css` — site styles
- `assets/cursor.js` — custom Figma-style active cursor (dot, ring, label)

- `assets/cursor.js` — custom Figma-style active cursor (arrow + label)

Portrait image:
- I added a neutral SVG placeholder at `assets/images/portrait.svg` and updated the homepage hero to use it.
- To include your attached photo instead, save the provided image into the project as `assets/images/portrait.png` (or `.jpg`) — it will automatically be used in place of the placeholder.

Notes:
- On touch devices the custom cursor is disabled and the system cursor is used.
- To serve locally with a simple http server (recommended):

  ```bash
  # from the project folder
  python3 -m http.server 8000
  # then open http://localhost:8000
  ```
