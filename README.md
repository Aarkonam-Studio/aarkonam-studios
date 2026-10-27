# AARKONAM STUDIOS — PRODUCTION WEB PLATFORM

> **"BUILDING WORLDS BEYOND THE SCREEN"**  
> Premium digital headquarters for **Aarkonam Studios**, an independent game development, interactive world simulation, and next-generation creative technology studio.

---

## 1. Design Identity: Emerald Noir

The visual system is engineered around **Emerald Noir**, uniting dark fantasy majesty, celestial science fiction, and restrained luxury:

- **Atmosphere**: Void Black (`#050706`), Deep Black-Green (`#07120F`), Dark Emerald (`#063B2C`).
- **Interactive Identity**: Studio Emerald (`#087F5B`), Bright Emerald (`#10B981`), Emerald Cyan Glow (`#00E5BD`).
- **Restrained Accents**: Antique Gold (`#C6A15B`), Highlight Gold (`#E5C76B`).
- **Interface & Typography**: Brushed Silver (`#C7CDD1`), Steel Grey (`#7E878C`), Muted Text (`#9AA6A1`).
- **Typography Families**:
  - `Cinzel` — Cinematic editorial headings and monument titles.
  - `Orbitron` — HUD telemetry, status readouts, cardinal minimap data, and badge codes.
  - `Inter` — High-legibility UI, editorial copy, and accessible forms.

---

## 2. Page Directory & Architecture

1. **Home (`/`) — Cinematic Game Menu**
   - Full-screen game menu terminal with `home-background.png`.
   - Studio wordmark in upper-left; live digital HUD clock & system online status in upper-right.
   - Central architectural title with emerald diamond rule and official tagline.
   - Interactive vertical menu (`01 STUDIO`, `02 GAMES`, `03 PROJECTS`, `04 TEAM`, `05 CONTACT`).
   - Tactile keyboard navigation: `↑` and `↓` arrow keys cycle active items; `Enter` activates.
   - Bottom-left tactical radar & coordinates (`18.5204° N, 73.8567° E`).
   - Bottom build telemetry: `BUILD 0.1.0 / INDIA / 2026`.

2. **Studio (`/studio`) — Digital Sanctuary & Philosophy**
   - Cinematic hero featuring *The Grand Emerald Archives* (`studio-grand-archive.png`).
   - Core ethos narrative, creative capabilities, and founding principles.
   - Telemetry card with studio location, focus disciplines, and active operations.
   - Interactive cross-portal routing cards leading directly into Games and Projects.

3. **Games (`/games`) — Active Realms Portfolio**
   - Spotlight showcase featuring *Leviathan: Emerald Odyssey* (`game-emerald-flagship.jpg`).
   - Complete development archive with *Sanctum of the Void* (`game-gothic-citadel.jpg`) and *Aetheria: Neon Horizons* (`game-coastal-metropolis.jpg`).
   - Interactive **Expand Intel** modal with high-res art, gameplay features, lore excerpts, and technical rendering specs.
   - Honest, verified production disclosures without speculative release dates.

4. **Projects (`/projects`) — Applied Technology & AI**
   - Featured technology showcase: *Aarkonam World Engine* (`game-neo-aarkonam-dusk.jpg`) with procedural urban transit generation benchmarks.
   - Real, functional category filter tabs (`ALL`, `Web Development`, `AI / AUTOMATION`, `SYSTEMS & SOFTWARE`).
   - Technical specifications for *Sentinel: Neural Agent Framework*, *Chronos Volumetric Pipeline*, and *Nexus Studio Telemetry Hub*.

5. **Team (`/team`) — Leadership & Architects**
   - Official founding leadership strictly adhering to provided records:
     - **Safin Mulani** — Chief Executive Officer (CEO)
     - **Mohd Sumair** — Chief Technology Officer (CTO)
     - **Adeba Firdous** — Chief Financial Officer (CFO)
   - Organizational taxonomy covering Worldcraft, Systems & Engineering, Applied AI, and Governance.

6. **Contact (`/contact`) — Transmission Portal**
   - High-fidelity project inquiry form with accessible labels, client-side validation, error states, and submitting animation.
   - Isolated service layer (`src/services/contactService.js`) with production endpoint support and safe development simulation.
   - Studio telemetry and inquiry directives for bilateral confidentiality and developer pitches.

7. **Not Found (`404`) — Disconnected Coordinate**
   - Themed sector recovery screen guiding users back to the main terminal or games catalog.

---

## 3. Tech Stack & Dependencies

- **Framework**: React 19 + JSX
- **Bundler & Dev Server**: Vite 8
- **Styling**: Vanilla Modern CSS + CSS Custom Properties (Design Tokens) + BEM-inspired naming
- **Routing**: Zero-overhead HTML5 History API Client Router (`src/context/RouterContext.jsx`)
- **Assets**: Official studio transparent wordmarks, emblems, and 4K cinematic backgrounds.

---

## 4. Local Execution & Build Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or pnpm

### Quick Start
```bash
# 1. Install dependencies
npm install

# 2. Start Vite development server
npm run dev

# 3. Open in browser
# http://localhost:5173
```

### Production Build
```bash
# Compile and optimize for production
npm run build

# Preview production build locally
npm run preview
```

---

## 5. Environment Configuration

To connect the contact form to a live serverless function, Formspree, or Resend endpoint:

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
2. Set your custom endpoint:
   ```env
   VITE_CONTACT_API_ENDPOINT=https://your-api.domain.com/v1/inquiries
   ```
*(If left unset, the form operates in sandbox simulation mode with instant UI feedback.)*
