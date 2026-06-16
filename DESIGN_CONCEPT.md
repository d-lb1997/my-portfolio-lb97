# Portfolio Design Concept
**"Welcome to My Design World"**

---

## Concept Overview

A personal portfolio that doubles as an experience — not a website you scroll through, but a world you step into. The canvas is infinite. The grid breathes. Visitors don't browse; they *explore*.

The metaphor: a designer's living Figma file, open to the public. The infinite dot-grid canvas signals fluency in the tools of the craft before a single word is read. It communicates: *this person thinks in systems, in space, in structure.*

---

## Core Experience: The Infinite Canvas

The entire portfolio lives on a single, pan-and-zoomable dot-grid canvas — identical in feel to Figma, Miro, or FigJam.

- **Dot grid background**: subtle `#CCCCCC` dots on a near-white `#F5F5F5` background, spaced 24px apart
- **Zoom**: scroll wheel / pinch-to-zoom, range `0.25×` → `3×`
- **Pan**: click-and-drag on empty canvas space (or two-finger trackpad drag)
- **No scroll hijacking** — the canvas handles all spatial interaction natively
- Navigation sections ("frames") are placed on the canvas like artboards, with generous whitespace between them

---

## Visitor Cursor System

On every page load (and on refresh), each visitor is assigned:

1. A **unique color** from a curated palette
2. A **creative label** displayed in a pill-shaped badge next to a custom cursor arrow

The cursor mimics the collaborative presence cursors in Figma/Miro exactly — a small filled arrow with a colored rounded-rectangle name tag attached.

### Cursor Name Pool
Names are drawn randomly on load. Suggested vocabulary:

| Category | Names |
|---|---|
| The Admirers | `Portfolio Stalker`, `Silent Fan`, `Curious Bystander`, `Secret Admirer` |
| The Professionals | `Design Critic`, `Pixel Peeper`, `Color Theory Nerd`, `Grid Obsessed` |
| The Explorers | `Infinite Scroller`, `Canvas Wanderer`, `Frame Hopper`, `Artboard Tourist` |
| The Creatives | `Design Enthusiast`, `Vibe Seeker`, `Aesthetic Pilgrim`, `Moodboard Collector` |
| The Dramatic | `Talent Scout (Probably)`, `Future Collaborator`, `Uninvited Art Director`, `Just Here for Inspiration` |
| The Playful | `Ctrl+Z Addict`, `Dark Mode Evangelist`, `Sans Serif Supremacist`, `Helvetica Agnostic` |

### Cursor Color Palette
Each visitor receives one of the following accent colors:

```
#FF3CAC  — Hot Pink       (à la "Pink Panther")
#2DCC70  — Emerald Green  (à la "Robin Hood")
#3498DB  — Bright Blue    (à la "Jake")
#F39C12  — Amber Orange   (à la "Velma")
#00C9E4  — Cyan Blue      (à la "Check on Blue")
#A855F7  — Violet
#F43F5E  — Rose Red
#10B981  — Teal
```

---

## Visual Identity

### Color Palette

| Token | Value | Usage |
|---|---|---|
| `--canvas-bg` | `#F2F2F2` | Infinite canvas background |
| `--dot-color` | `#CCCCCC` | Grid dots |
| `--text-primary` | `#0A0A0A` | Headings, nav |
| `--text-secondary` | `#555555` | Body, captions |
| `--accent-pink` | `#FF3CAC` | Highlight, hover states |
| `--accent-green` | `#2DCC70` | Secondary accent |
| `--surface-white` | `#FFFFFF` | Cards, artboard frames |
| `--nav-bg` | `transparent` | Navbar |

### Typography

**Primary Font**: `Google Sans` (or `DM Sans` as fallback via Google Fonts)
- Clean, geometric, humanist — designer-native without feeling clinical
- Feels native to Figma's own UI; reinforces the canvas metaphor

```
Display / Hero:    Google Sans, 64–80px, weight 700, tracking -0.02em
Section Headers:   Google Sans, 32–40px, weight 600
Body:              Google Sans, 16–18px, weight 400, line-height 1.6
Nav Links:         Google Sans, 14px, weight 500, letter-spacing 0.04em, UPPERCASE
Cursor Labels:     Google Sans, 13px, weight 600, white on color
```

---

## Navigation

A minimal top navbar, pinned to the viewport (not the canvas).

```
┌─────────────────────────────────────────────────────────────┐
│  [Your Name / Logo Mark]        Home  About  Work  Contact  │
└─────────────────────────────────────────────────────────────┘
```

- **Position**: `fixed`, top-center, full width
- **Background**: transparent (canvas visible underneath)
- **Text color**: `#0A0A0A` (black)
- **Font**: Google Sans, 14px, weight 500, uppercase, 0.08em tracking
- **No border, no shadow** — floats cleanly above the canvas
- **Active state**: a small `2px` underline in the visitor's assigned cursor color (personalized detail)
- Nav links act as **"jump to frame"** anchors — smoothly panning + zooming the canvas to the relevant artboard section

---

## Canvas Sections / "Artboards"

Each page section lives as a distinct artboard on the canvas, separated by intentional whitespace. Visitors can navigate via the navbar or freely explore.

### Frame 1 — Home
**Canvas position**: center-origin `(0, 0)`

```
Left half:                        Right half:
────────────────────  |  ────────────────────────────
                      |
  Hey [bold] there    |     ↖ [cursor: Portfolio Stalker]
                      |
  welcome to          |
  my design world     |     ↖ [cursor: Design Enthusiast]
                      |
────────────────────  |  ────────────────────────────
```

- The word **"Hey"** is in `weight 700`, "there" in `weight 300` — visual contrast in a single line, mirroring the reference image exactly
- The right half shows 2–3 animated visitor cursors drifting slowly, as if others are already on the canvas (ambient presence, pre-scripted motion loops)
- A subtle **"scroll to explore / drag to navigate"** hint fades in below, then fades out after 3 seconds

### Frame 2 — About Me
**Canvas position**: `(+2400px, 0)` from Home

- A two-column artboard: left column has a photo or illustrated avatar, right column has bio text
- Tone: warm and first-person. Not a resumé — a designer talking to a human.
- Small badge labels (in the cursor pill style) scattered around: `"Based in [City]"`, `"5 years in the field"`, `"Currently: Open to work"` — as if sticky notes on a Figma frame

### Frame 3 — Work
**Canvas position**: `(0, +1800px)` from Home (below)

- A grid of project cards, each styled like a Figma frame/artboard with a visible frame label above
- Hover state: the card gently scales up `1.03×` with a soft shadow
- Each card has a colored top-border in one of the accent colors

### Frame 4 — Contact
**Canvas position**: `(+2400px, +1800px)` from Home (bottom-right)

- Minimal: name, email link, social handles (Dribbble, LinkedIn, GitHub)
- A single line CTA: `"Let's make something."`
- Optionally: a small live cursor invite — `"Drop your cursor here to say hi"` with a dummy input that generates a name tag

---

## Interactions & Motion

| Interaction | Behavior |
|---|---|
| Page load | Canvas fades in, visitor cursor materializes with a pop animation, name tag slides in from the left |
| Navbar click | Canvas smoothly pans + zooms to target artboard (ease-in-out, ~600ms) |
| Hover on project card | Scale `1.03×`, soft drop shadow, cursor changes to `pointer` |
| Canvas drag | Panning with `grab` cursor (custom cursor is suppressed during drag) |
| Zoom in/out | Smooth CSS `transform: scale()` on canvas wrapper |
| Cursor name generation | On load + on F5: new random name + color assigned instantly |
| Ambient cursors (Home) | 2–3 pre-scripted ghost cursors drift slowly around the right panel in looping paths |

---

## Technical Stack

| Layer | Choice |
|---|---|
| Framework | Next.js (App Router) |
| Styling | Tailwind CSS + CSS custom properties |
| Canvas engine | Custom `<canvas>` or CSS transform-based infinite grid |
| Font | Google Fonts — `DM Sans` or `Google Sans` equivalent |
| Animations | Framer Motion |
| Deployment | Vercel |
| Source | GitHub |
| Domain | Custom domain via Vercel DNS |

---

## The Signature Element

> **Personalized cursor presence on load.**

Every visitor gets a name and a color. It costs nothing to implement and delivers an outsized "wait, *this site knows me?*" moment — before the visitor even reads a word of content. It signals: this designer thinks about *people using things*, not just things existing. It is the most on-brand possible first impression for a UX/product designer.

---

## File & Folder Structure (Proposed)

```
/
├── app/
│   ├── layout.tsx          # Root layout, font import, cursor provider
│   ├── page.tsx            # Infinite canvas entry point
│   └── components/
│       ├── Canvas.tsx      # Infinite dot-grid canvas with pan/zoom
│       ├── Cursor.tsx      # Custom visitor cursor + name tag
│       ├── Navbar.tsx      # Fixed transparent top nav
│       ├── HomeFrame.tsx   # "Hey there" artboard
│       ├── AboutFrame.tsx  # About me artboard
│       ├── WorkFrame.tsx   # Project grid artboard
│       └── ContactFrame.tsx
├── public/
│   └── fonts/
├── styles/
│   └── globals.css
├── DESIGN_CONCEPT.md       # This file
└── README.md
```

---

*Last updated: June 2026*
