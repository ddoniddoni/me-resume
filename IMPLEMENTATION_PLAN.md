# IMPLEMENTATION_PLAN.md

# Implementation Plan

This document breaks the portfolio into Codex-friendly implementation tasks.

Each task should be small enough for a coding agent to complete in one pass.

## Phase 0: Project Setup

### Task 0.1 — Initialize Project

Create a Next.js project using TypeScript, Tailwind CSS, and npm.

Requirements:

- App Router enabled
- TypeScript enabled
- Tailwind CSS configured
- ESLint configured
- Basic folder structure created
- `npm run dev`, `npm run build`, `npm run lint`, and `npm run typecheck` available

Acceptance criteria:

- Local dev server runs
- Build succeeds
- Basic home page renders

Suggested Codex prompt:

```txt
Initialize this repository as a Next.js TypeScript Tailwind portfolio project using npm. Create the folder structure described in AGENTS.md. Add scripts for dev, build, lint, typecheck, format, and test where appropriate. Keep the initial page minimal but working.
```

## Phase 1: Portfolio Shell

### Task 1.1 — Build Main Layout

Create:

- Header
- HeroSection
- QuickActions
- Footer
- Basic responsive layout

Hero must include:

- DDoni brand/name
- Frontend Developer title
- One-sentence summary
- Resume button
- Projects button
- Contact button

Acceptance criteria:

- User understands the portfolio purpose immediately
- CTA buttons are visible on first screen
- Layout works on desktop and mobile

Suggested Codex prompt:

```txt
Build the main portfolio shell according to PRD.md and AGENTS.md. Implement Header, HeroSection, QuickActions, and Footer. Use placeholder profile data from src/data/profile.ts. The first viewport must clearly show that this is a frontend developer portfolio and include Resume, Projects, and Contact CTAs.
```

### Task 1.2 — Add Content Data Files

Create:

- `src/data/profile.ts`
- `src/data/projects.ts`
- `src/data/skills.ts`
- `src/data/experiences.ts`

Use typed data structures.

Do not invent private personal information.  
Use TODO placeholders where needed.

Acceptance criteria:

- Data files export typed content
- Components can import content from data files
- No important portfolio text is hard-coded in UI components

Suggested Codex prompt:

```txt
Create typed data files for profile, projects, skills, and experiences based on PRD.md. Use realistic placeholder content with TODO comments where DDoni needs to provide real details. Do not invent private contact information or fake metrics.
```

## Phase 2: Modal System

### Task 2.1 — Create Modal Store

Create Zustand store for active modal state.

Required state:

- activeModal
- activeExperienceId
- openModal
- closeModal

Acceptance criteria:

- Any component can open and close modals
- Modal type is strongly typed
- No `any`

Suggested Codex prompt:

```txt
Implement a Zustand portfolio store for modal state. It should support resume, projects, skills, experience, and contact modals, plus optional activeExperienceId. Use strict TypeScript and avoid any.
```

### Task 2.2 — Build Accessible BaseModal

Create `BaseModal`.

Requirements:

- Accessible title
- Close button
- Escape close
- Backdrop
- Focus handling where practical
- Responsive sizing
- Reduced motion consideration

Acceptance criteria:

- Modal can be opened and closed
- Keyboard users can close it
- Close button has clear label
- Content is rendered in React, not canvas

Suggested Codex prompt:

```txt
Build an accessible BaseModal component for this portfolio. It should support title, children, close button, Escape close, backdrop click close if appropriate, and good keyboard behavior. Use Tailwind CSS and TypeScript.
```

### Task 2.3 — Build Portfolio Modals

Create:

- ResumeModal
- ProjectModal
- ExperienceModal
- ContactModal

Acceptance criteria:

- Resume modal displays career summary and PDF CTA placeholder
- Project modal displays project cards
- Experience modal displays selected experience by ID
- Contact modal displays contact links with TODO placeholders if data is missing

Suggested Codex prompt:

```txt
Build ResumeModal, ProjectModal, ExperienceModal, and ContactModal using the data files. Connect them to the Zustand modal store. Ensure all critical content is accessible as normal React-rendered HTML.
```

## Phase 3: Non-Game Fallback Portfolio

### Task 3.1 — Build FallbackPortfolio Section

Create a normal scrollable portfolio section with cards for:

- Projects
- Resume
- Skills
- Component experience
- Performance experience
- Troubleshooting experience
- Contact

Acceptance criteria:

- All important content is accessible without game interaction
- Mobile users can use this section comfortably
- Cards open the same modals as game objects

Suggested Codex prompt:

```txt
Create a FallbackPortfolio section with responsive cards for all major portfolio areas. The cards should open the same modals as the game interactions. This section is required for accessibility, SEO, and mobile usability.
```

## Phase 4: Game Map MVP

### Task 4.1 — Install and Configure Phaser

Add Phaser to the project.

Recommended install command:

```bash
npm install phaser
```

Create:

- `src/game/config.ts`
- `src/game/PhaserGame.ts`
- `src/game/scenes/PortfolioScene.ts`
- `src/components/sections/GameSection.tsx`

Acceptance criteria:

- Phaser canvas renders only on client side
- Next.js server rendering does not break
- Game section has loading or fallback behavior

Suggested Codex prompt:

```txt
Add Phaser 3 to the project and create a client-only GameSection that renders a basic Phaser scene. Ensure this works with Next.js App Router and does not break SSR. Keep the implementation isolated under src/game.
```

### Task 4.2 — Add Player Movement

Implement simple player movement.

Controls:

- WASD
- Arrow keys

Acceptance criteria:

- Player can move around map
- Movement is smooth enough
- Player remains within map bounds
- Control instructions are visible

Suggested Codex prompt:

```txt
Implement simple keyboard player movement in the Phaser PortfolioScene. Support WASD and arrow keys. Keep the player within map bounds and display clear control instructions in the React GameSection.
```

### Task 4.3 — Add Interactable Objects

Add objects:

- Laptop
- Resume Board
- Component Lab
- Performance Monitor
- Trouble Room
- Contact Terminal

Acceptance criteria:

- Objects render on map
- Player proximity is detected
- Interaction hint appears
- Pressing Enter near object opens correct modal
- Clicking or tapping object also opens correct modal if practical

Suggested Codex prompt:

```txt
Add interactable objects to the Phaser map based on PRD.md. Each object should have an id, label, position, modalType, and optional experienceId. When the player is near an object, show an interaction hint. Pressing Enter should open the corresponding React modal through the Zustand store.
```

### Task 4.4 — Improve Map Visuals

Add simple visual polish.

Requirements:

- Lightweight 2D map
- Distinct object markers
- Clear labels or hints
- No heavy assets required

Acceptance criteria:

- Map is understandable
- User can identify what to interact with
- Visual style is playful but professional

Suggested Codex prompt:

```txt
Improve the Phaser map visuals while keeping assets lightweight. Use simple shapes or small sprites for the MVP. Make objects visually distinct and add readable labels or interaction hints. Do not add large assets.
```

## Phase 5: Responsive and Accessibility

### Task 5.1 — Mobile Fallback

Ensure mobile users can access all content without game controls.

Acceptance criteria:

- Fallback cards are visible and usable on mobile
- Game does not block layout
- CTA buttons remain accessible
- No horizontal overflow

Suggested Codex prompt:

```txt
Audit and improve the mobile experience. Ensure the portfolio is fully usable without the Phaser game. The fallback cards, CTAs, modals, and contact links must work well on small screens.
```

### Task 5.2 — Accessibility Pass

Improve:

- Modal labels
- Focus states
- Keyboard interactions
- Reduced motion
- Semantic HTML
- Alt text

Acceptance criteria:

- Keyboard user can navigate major sections
- Modals are keyboard accessible
- Canvas is not the only access path
- Visible focus states exist

Suggested Codex prompt:

```txt
Perform an accessibility pass based on AGENTS.md. Ensure modals have accessible labels, keyboard close behavior, visible focus states, semantic buttons/links, and non-canvas fallback content for all important information.
```

## Phase 6: Performance and Polish

### Task 6.1 — Lazy Load Game

Ensure game code does not unnecessarily block initial portfolio content.

Acceptance criteria:

- Text content renders before or independently of game load
- Phaser is dynamically imported if appropriate
- Loading state is graceful

Suggested Codex prompt:

```txt
Optimize the GameSection so the Phaser game is lazy-loaded or client-loaded without blocking the main portfolio content. Add a graceful loading state and ensure build still succeeds.
```

### Task 6.2 — Final Polish

Improve:

- Spacing
- Typography
- Button states
- Modal transitions
- Empty placeholders
- README

Acceptance criteria:

- Site feels cohesive
- No obvious placeholder links except TODO-marked fields
- README explains local development and content updates

Suggested Codex prompt:

```txt
Do a final polish pass. Improve spacing, typography, button states, modal transitions, and README documentation. Do not add heavy new dependencies. Keep the site professional, fast, and recruiter-friendly.
```

## Phase 7: Verification

### Task 7.1 — Run Checks

Run:

```bash
npm run lint
npm run typecheck
npm run build
```

If tests exist:

```bash
npm run test
```

Acceptance criteria:

- All checks pass or failures are clearly documented
- Final response includes commands run
- Remaining TODOs are listed

Suggested Codex prompt:

```txt
Run the project checks: lint, typecheck, build, and tests if available. Fix any issues that are in scope. Report the commands run, results, changed files, and remaining TODOs.
```

## MVP Completion Checklist

- [ ] Hero section complete
- [ ] Quick CTA buttons complete
- [ ] Typed data files complete
- [ ] Zustand modal store complete
- [ ] Accessible modal system complete
- [ ] Resume modal complete
- [ ] Projects modal complete
- [ ] Experience modal complete
- [ ] Contact modal complete
- [ ] Fallback portfolio section complete
- [ ] Phaser game renders
- [ ] Player movement works
- [ ] Interactable objects work
- [ ] Game opens React modals
- [ ] Mobile fallback works
- [ ] Accessibility pass complete
- [ ] Performance pass complete
- [ ] README complete
- [ ] Build passes
