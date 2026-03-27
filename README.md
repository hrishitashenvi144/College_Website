# Diastas University Portal

A hyper-dynamic, production-ready university web application built with React 18, featuring advanced animations, AI-powered chatbot, interactive campus map, and gamified placements.

\---

## Table of Contents

* [Tech Stack](#tech-stack)
* [Features Overview](#features-overview)
* [Project Structure](#project-structure)
* [Getting Started](#getting-started)
* [Environment Variables](#environment-variables)
* [Pages \& Routes](#pages--routes)
* [Global Systems](#global-systems)
* [AI Chatbot (G-Bot)](#ai-chatbot-g-bot)
* [Campus Map](#campus-map)
* [Placements Page](#placements-page)
* [Theming](#theming)
* [Data Layer](#data-layer)
* [Security \& Performance](#security--performance)
* [Deployment](#deployment)
* [Accreditations](#accreditations)

\---

## Tech Stack

|Category|Library / Tool|
|-|-|
|UI Framework|React 18|
|Styling|Tailwind CSS (with `darkMode: 'class'`)|
|Animation|Framer Motion, GSAP + ScrollTrigger|
|3D / WebGL|Three.js|
|Particles|tsParticles|
|Carousels|Swiper.js|
|Charts|Recharts|
|Lottie|lottie-react|
|Routing|React Router DOM v6|
|Forms|React Hook Form + Zod|
|Icons|lucide-react|
|Fonts|Inter, Space Grotesk (Google Fonts)|
|Sanitization|DOMPurify|
|AI Backend|Anthropic Claude API (via Vercel serverless function)|

\---

## Features Overview

### Global

* **Custom Cursor** — 8px dot + 36px hollow ring with spring delay; hover, click, and text-hover states; disabled on touch devices
* **5-Theme System** — Dark, Light, Ocean Blue, Forest Green, Sunset Orange; persisted via `localStorage`; CSS custom properties on `<html>`
* **Glassmorphism** — `.glass`, `.glass-strong`, and `.glow` utility classes
* **Page Transitions** — Framer Motion `PageWrapper` with fade + translateY enter/exit
* **Scroll Animations** — `useScrollReveal` hook with stagger via `useInView`
* **Particle Background** — tsParticles globally; 60 particles normally, 120 on hero sections; color syncs with active theme

### Loading Screen (first visit only)

* Full-screen Lottie walking character
* Letter-by-letter stagger reveal of "DIASTAS UNIVERSITY"
* Progress bar sweep
* Radial wipe-out transition into homepage
* Session-gated via `sessionStorage`

### Navbar

* Transparent → glassmorphism on scroll past 80px
* Animated underline indicator using Framer Motion `layoutId`
* Theme switcher popover (5 swatches)
* Full-screen mobile overlay menu

\---

## Project Structure

```
src/
├── components/
│   ├── layout/          # Navbar.jsx, Footer.jsx
│   ├── ui/              # CustomCursor, ParticleBackground, PageWrapper, ScrollReveal, GlowCard
│   ├── mascot/          # GBot.jsx, GuidedTour.jsx, ChatPanel.jsx
│   └── shared/          # StatsCounter, AnnouncementTicker, ThemeSwitcher
├── pages/
│   ├── Home.jsx
│   ├── About.jsx
│   ├── Academics.jsx
│   ├── AcademicDetail.jsx
│   ├── Research.jsx
│   ├── Campus.jsx
│   ├── Admissions.jsx
│   ├── Contact.jsx
│   ├── Alumni.jsx
│   └── Placements.jsx
├── context/
│   └── ThemeContext.jsx
├── hooks/
│   ├── useScrollReveal.js
│   ├── useCursorPosition.js
│   └── useCounterAnimation.js
├── data/
│   └── data.js
├── styles/
│   └── index.css
├── App.jsx
└── main.jsx
```

\---

## Getting Started

### Prerequisites

* Node.js 18+
* npm or yarn
* Vercel CLI (for local serverless function testing)

### Installation

```bash
git clone https://github.com/your-org/diastas-portal.git
cd diastas-portal
npm install
```

### Development

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

\---

## Environment Variables

Create a `.env.local` file in the project root:

```env
VITE\_ANTHROPIC\_KEY=your\_anthropic\_api\_key\_here
```

> \*\*Never commit API keys.\*\* All keys are accessed only via `import.meta.env.VITE\_` prefix. The chatbot backend proxies requests through a Vercel serverless function — the key is never exposed to the browser.

\---

## Pages \& Routes

|Route|Page|Description|
|-|-|-|
|`/`|Home|Hero, stats, ticker, quick links, testimonials|
|`/about`|About / Legacy|Parallax hero, timeline, leadership, alumni wall|
|`/academics`|Academics|Department cards with unique animations, course catalog, comparison tool|
|`/academics/:dept`|Department Detail|Programs, faculty, searchable syllabus|
|`/research`|Research|Labs, publications explorer, projects, global collaborations|
|`/campus`|Campus Map|Interactive 2D map, walkable stick figure, heatmaps, building info panels|
|`/admissions`|Admissions|Eligibility checker, multi-step form, important dates, FAQ|
|`/contact`|Contact|Form, Google Maps embed, department contacts|
|`/alumni`|Alumni|Directory, success stories, donation tiers, events|
|`/placements`|Placements|Gamified EXP bars, animated hiring sequence, department-wise breakdown|

All pages are **lazy-loaded** via `React.lazy` + `Suspense`.

\---

## Global Systems

### Custom Cursor

Implemented in `src/components/ui/CustomCursor.jsx`.

* Dot: 8px, electric blue, zero lag
* Ring: 36px hollow, 80ms spring delay via `useSpring`
* Hover on links/buttons: ring expands to 60px, 15% blue fill
* Click: dot bursts (scale 3 → 0 in 200ms)
* Text hover: ring morphs to I-beam
* Disabled via `@media (pointer: coarse)`

### Theme System

Implemented in `src/context/ThemeContext.jsx`.

```js
// Available themes
const THEMES = \['dark', 'light', 'ocean', 'forest', 'sunset'];
```

Themes are applied as a class on `<html>` and defined as CSS custom properties in `index.css`. The active theme is saved to `localStorage` under the key `diastas-theme`.

### Particle Background

Configured in `src/components/ui/ParticleBackground.jsx`.

* 60 particles globally, 120 on hero sections
* Accent color auto-syncs with active theme
* Disposes on component unmount to prevent memory leaks

### Glassmorphism Utilities

Defined in `src/styles/index.css`:

```css
.glass        { background: rgba(255,255,255,0.05); backdrop-filter: blur(20px); border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; }
.glass-strong { backdrop-filter: blur(40px); }
.glow         { box-shadow: 0 0 40px var(--accent); }
```

\---

## AI Chatbot (G-Bot)

### Architecture

The chatbot runs through a **Vercel serverless function** at `/api/chat`. This ensures the Anthropic API key is never exposed to the client.

```
Browser → POST /api/chat → Vercel Function → Anthropic API → Response
```

### Serverless Function (`/api/chat.js`)

```js
import Anthropic from '@anthropic-ai/sdk';

export default async function handler(req, res) {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC\_KEY });
  const { messages } = req.body;

  const response = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max\_tokens: 300,
    system: `You are G-Bot, the friendly AI assistant for Diastas University...`,
    messages,
  });

  res.json({ content: response.content });
}
```

### System Prompt

G-Bot is primed with Diastas University context: 26,000 students, 1,800 faculty, NAAC A+ grade, Top 50 NIRF ranking, Greater Noida campus, available programs, admissions process, and campus facilities.

### Features

* Full conversation history sent on every request (no memory between sessions)
* 800ms typing indicator with 3-dot bounce animation
* Suggestion chips on open: "What programs are offered?", "How do I apply?", "What's the fee structure?", "Tell me about research", "Campus facilities?"
* DOMPurify sanitizes all user inputs before sending
* Error fallback UI if API call fails

### Guided Tour (first visit)

G-Bot appears center-bottom, bounces in, and sequentially highlights 5 UI elements with pulsing ring overlay. Completion saved to `localStorage` under `diastas-tour-done`.

\---

## Campus Map

Implemented in `src/pages/Campus.jsx`.

### Map Features

* Large 2D top-down illustrated campus built on an HTML canvas / positioned div
* 13+ buildings: Academic Block A \& B, Library, Admin Block, Auditorium, Sports Complex, Boys \& Girls Hostels, Cafeteria, Medical Center, Research Labs, Innovation Hub, Parking
* Pathways, green areas, and parking zones
* Pan (click + drag) and zoom (mouse wheel / +/- buttons)
* Mini-map thumbnail (120×90px) with viewport rectangle indicator

### Activity Heatmap

Translucent red (high activity) and yellow (medium activity) overlays on buildings with high / medium foot traffic. Opacity and colors are theme-aware and set to \~40% translucency to remain unobtrusive.

### Stick Figure Character

* 24px animated SVG/CSS stick figure
* **Mouse mode**: smoothly lerps toward cursor at 8% per frame via `requestAnimationFrame`
* **Keyboard mode**: arrow keys and WASD move the character at 3px/frame
* **Mobile mode**: D-pad control appears at bottom-left (4 directional buttons)
* Walking leg animation plays while moving; idle breathing bob when stopped
* Character flips horizontally based on X velocity
* Wears a tiny Diastas-colored shirt

### Building Interaction

* Hover → glassmorphism tooltip with building name + Unsplash thumbnail
* Click / walk into building → right-side panel slides in (350px wide, full height) showing name, photo, description, floors, facilities, operating hours
* Specific hover images per building (sleeping student → Academic Block A, chaotic math → Academic Block B, SHHHENCE megaphone → Library, etc.)
* Click outside or close button to dismiss panel

\---

## Placements Page

Route: `/placements`

### Gamified EXP Bars

Placement statistics are displayed as experience/progress bars that animate to fill on page load. Each bar shows:

* Company name and logo placeholder
* Placement percentage
* Number of students placed
* Average package

### Hiring Animation

On scroll, stick figures "jump" into company logo placeholders with a "Level Up!" / "Hired!" popup notification above their heads using Framer Motion spring animations.

### Department Breakdown

Clicking any company's stat bar opens a breakdown panel showing the percentage of students placed in that company **per department** — visualized as a secondary set of mini-bars or a Recharts bar chart, color-coded by department.

### Stats Counters

Animated counters on load:

* 95%+ Overall Placement Rate
* 180+ Recruiting Companies
* ₹42 LPA Highest Package
* ₹8.5 LPA Average Package

\---

## Theming

### Available Themes

|Theme|Background|Surface|Accent|Text|
|-|-|-|-|-|
|Dark (default)|`#0A0A0F`|`#12121A`|`#3B82F6`|`#F1F5F9`|
|Light|`#F8FAFC`|`#FFFFFF`|`#2563EB`|`#0F172A`|
|Ocean Blue|`#020B18`|`#0A1628`|`#06B6D4`|`#E0F7FA`|
|Forest Green|`#020F05`|`#071A09`|`#22C55E`|`#F0FDF4`|
|Sunset Orange|`#0F0800`|`#1A1000`|`#F97316`|`#FFF7ED`|

Switched via navbar popover (5 circular swatches). Persisted in `localStorage` under key `diastas-theme`.

\---

## Data Layer

All mock data lives in `src/data/data.js` as named exports:

|Export|Description|
|-|-|
|`departments`|8 departments with programs, faculty, achievements|
|`faculty`|20 faculty members with bio, publications, email|
|`alumni`|15 alumni with story, company, achievement|
|`publications`|20 research papers with abstract, DOI, citations|
|`researchLabs`|6 labs with equipment, recent publications|
|`events`|8 events with date, type, location|
|`announcements`|10 ticker strings|
|`testimonials`|8 student testimonials|
|`buildingInfo`|Campus building metadata (keyed by building id)|
|`timelineData`|8 milestones from 2010–2024|
|`leadershipTeam`|6 leaders with bio, education, publications|
|`courses`|30 courses with credits, eligibility, syllabus link|
|`faqItems`|12 FAQs for admissions page|
|`admissionDates`|8 key dates with type and color tag|
|`collaborations`|47 global partner institutions|

\---

## Security \& Performance

### Security

* **DOMPurify** strips all HTML from form inputs before use or API calls
* **Honeypot fields** on all public forms: hidden `<input name="website">` with `display: none` and `tabIndex={-1}` to catch bots
* **Zod validation** on all form schemas (email format, 10-digit Indian phone, percentage ranges 0–100)
* **CSP headers** configured in `vercel.json` for the serverless API route
* **API key isolation**: Anthropic key lives only in Vercel environment variables, accessed server-side only

### Performance

* All pages lazy-loaded via `React.lazy` + `Suspense`
* Static data components wrapped in `React.memo`
* Search/filter inputs debounced 300ms
* All images use `loading="lazy"`
* Three.js and tsParticles dispose on component unmount
* GSAP ScrollTrigger kills all triggers on unmount
* `requestAnimationFrame` loops cancelled on unmount
* All API calls wrapped in `try/catch` with error UI fallback

\---

## Deployment

### Lovable.dev

1. Push to GitHub
2. Add necessary details
3. Deploy

The serverless function is automatically picked up by Lovable.

\---

## Accreditations

Diastas University holds the following accreditations, displayed in the footer and About page:

* **NAAC A+** — National Assessment and Accreditation Council, Grade A+
* **NBA** — National Board of Accreditation (accredited programs in Engineering, Technology, and Management)

Badge components are included in `src/components/shared/AccreditationBadges.jsx` and rendered in the site footer and the About page hero section.

\---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'feat: add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

\---

## 

