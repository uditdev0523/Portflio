# Udit Pratap Singh — Engineering Portfolio // DEV_001

> **Production-Quality Developer Portfolio inspired by the KIMI — GRIDO1 Racing Systems Visual Language & Telemetry Art Direction.**

Reinterpreted for a high-velocity software engineer, Computer Science student, and AI / Data Science enthusiast.

---

## 🏎️ Design System & Art Direction

Inspired by Formula 1 telemetry dashboards, racing editorial layouts, and technical cockpits:

* **Background (Light Editorial Canvas):** `#F7FAFB`
* **Primary Text:** `#090A0B`
* **Dark Telemetry Sections:** `#0E0F14`
* **Raised Surfaces:** `#1B1D24` / `#141720`
* **Accent Cyan (Electric F1 Telemetry):** `#02D2E3`
* **Muted Technical Labels:** `#B6C1C8` / `#64748B`
* **Borders & Axis Grids:** `#DFE5E9` (Light) / `#2A2E39` (Dark)
* **Status Badges:** Cyan (Live / Nominal), Amber (Active Study / Warning), Red (Anomaly / Critical)

### Typography

* **Oswald** (Google Fonts): Oversized headings, developer identity, telemetry numbers, and section markers.
* **Space Grotesk** (Google Fonts): Navigation, editorial paragraphs, technical telemetry specs, labels, and buttons.
* **JetBrains Mono**: Terminal code feeds, coordinates, timestamps, and hash signatures.

---

## 📁 Architecture Overview

```
portflio/
├── index.html                      # Semantic, accessible HTML5 single-page architecture
├── server.js                       # Zero-dependency local development server (Node ESM)
├── package.json                    # Project configuration and script runner
├── README.md                       # Comprehensive engineering documentation
└── assets/
    ├── css/
    │   ├── style.css               # Core layout, design tokens, responsive typography
    │   └── telemetry.css           # Preloader veil, custom cursor, modals, animations
    ├── js/
    │   ├── app.js                  # Application orchestrator, modal system, ticker
    │   ├── projects-data.js        # Structured project telemetry & architecture registry
    │   ├── telemetry-audio.js      # Procedural Web Audio API sound synthesizer
    │   ├── contour-canvas.js       # Topographic aerodynamic canvas (requestAnimationFrame)
    │   └── cursor.js               # Precision reticle custom cursor with magnetic hover
    ├── images/
    │   ├── hero-portrait.svg       # Editorial developer portrait with biometric HUD framing
    │   ├── netrasetu-preview.svg   # Retinal fundus scan, Grad-CAM saliency & inference telemetry
    │   ├── fleet-telematics-preview.svg # GPS route map, OBD-II CAN-bus gauges & log stream
    │   ├── voice-cloning-preview.svg # Audio waveform, MFCC spectrogram & vocoder forensic HUD
    │   ├── bike-rides-preview.svg  # Superbike wireframe chassis & responsive web UI preview
    │   └── result-system-preview.svg # Relational schema diagram & GPA distribution telemetry
    └── docs/
        └── resume.html             # Clean printable curriculum vitae (Print to PDF ready)
```

---

## ⚡ Core Technical Capabilities

1. **Telemetry Preloader Veil:**
   * Procedural boot sequence with 0% to 100% progress ticker.
   * Real-time initialization log checks (`KERNEL`, `SENSORS`, `AKTU PARAMETERS`).
2. **Topographic Contour Background (`hero-contour-canvas`):**
   * High-performance Canvas 2D running with `requestAnimationFrame`.
   * Dual-harmonic sinusoidal elevation curves creating an aerodynamic wind tunnel feel.
   * Auto-pauses offscreen via `IntersectionObserver` and respects `prefers-reduced-motion`.
3. **Procedural Telemetry Audio (`telemetry-audio.js`):**
   * Native browser **Web Audio API** synthesizer.
   * Zero external MP3/WAV files (zero latency, zero network roundtrips).
   * Generates crisp F1-style UI beeps, tone sweeps, and boot arpeggios.
   * Header toggle with live animated soundwave indicator (muted by default).
4. **Precision Reticle Cursor (`cursor.js`):**
   * Dual-layer custom cursor: outer telemetry ring + inner cyan coordinate dot.
   * Smooth spring lerp interpolation (`ease: 0.18`) and interactive magnetic hover recoil.
   * Automatically disabled on mobile/touch screens.
5. **Project Telemetry Inspector Modal:**
   * Dynamic modal rendering deep architectural breakdowns for all 5 projects.
   * Hardware latency, model profiles, and telemetry metrics readouts.
   * Direct GitHub and live deployment links.
6. **Curriculum Vitae Modal & Print Dispatch:**
   * Integrated modal with clean editorial resume.
   * One-click `[ PRINT / SAVE AS PDF ]` with dedicated CSS `@media print` rules.
7. **Verified Content & Academic Integrity:**
   * Separates verified competencies from *Active Study* tracks.
   * Evaluated academic performance: **8.20 CGPA** at NIET / Dr. A.P.J. Abdul Kalam Technical University (AKTU), B.Tech 2025–2029.
   * Verified links to GitHub repositories, LinkedIn, and live project deployments.

---

## 🚀 Local Development Setup

No build tools or heavy node_modules installations are required!

### Option A: Using the built-in Node server (Recommended)

Requires Node.js 18+ (tested on Node v24):

```bash
# Start local telemetry server
npm start
# or
node server.js
```

Open your browser to: **`http://localhost:3000`**

### Option B: Using Python

```bash
python -m http.server 3000
```

### Option C: Direct File Opening

Double-click `index.html` to open directly in any modern web browser (Chrome, Edge, Firefox, Safari).

---

## 🌐 Production Deployment Guide

### Deploying to GitHub Pages

1. Initialize git (if not already done) and commit the files:
   ```bash
   git init
   git add .
   git commit -m "feat: Udit Pratap Singh KIMI Telemetry Portfolio v2"
   ```
2. Link your GitHub repository:
   ```bash
   git remote add origin https://github.com/uditdev0523/Portfolio-website-.git
   git branch -M main
   git push -u origin main --force
   ```
3. In your GitHub repository settings:
   * Go to **Settings** &rarr; **Pages**.
   * Under **Build and deployment**, select **Source: Deploy from a branch**.
   * Choose branch **`main`** / root **`/`** and click **Save**.
   * Your site will be live within seconds!

### Deploying to Vercel / Netlify

* **Vercel:** Drag and drop the folder into the Vercel dashboard or run `vercel`.
* **Netlify:** Drag and drop into the Netlify Drop dashboard or run `netlify deploy --prod`.
* Zero build command required (`Build command: none`, `Publish directory: .`).

---

## 📄 License & Attribution

* **Engineering Portfolio & Content:** &copy; 2026 Udit Pratap Singh.
* **Art Direction:** Inspired by the visual telemetry aesthetic of KIMI / GRIDO1 Racing Systems.
* **License:** MIT License.
