# PRD.md

# DDoni Frontend Quest Portfolio PRD

## 1. Product Summary

This project is an interactive frontend developer portfolio inspired by a 2D game map experience.

The goal is not to build a full game.  
The goal is to present DDoni’s frontend resume, projects, skills, and problem-solving experience through a lightweight, memorable, game-like interface.

Users should be able to explore a small 2D map with a character and interact with objects such as a laptop, resume board, component lab, performance monitor, and trouble room. Each object opens a focused portfolio modal.

The portfolio must also provide fast direct access to resume, projects, and contact information without requiring game exploration.

## 2. Target Users

### Primary Users

- Recruiters
- Hiring managers
- Frontend engineers reviewing the portfolio
- HR managers who need quick access to resume information

### Secondary Users

- Peers
- Mentors
- Developers interested in the implementation

## 3. Core Product Principle

The site may look playful, but it must behave like a professional portfolio.

The user must understand within 5 seconds:

- This is a frontend developer portfolio.
- The developer uses React, Next.js, TypeScript, and modern frontend tooling.
- The user can immediately access resume, projects, contact, and technical experience.
- The game mode is optional, not mandatory.

## 4. Product Concept

Working title:

DDoni’s Frontend Quest

Alternative titles:

- DDoni Dev Quest
- Frontend Quest Log
- DDoni’s Portfolio Map
- DDoni’s Dev Room

Recommended concept:

A small 2D top-view map where the visitor can move a character around and interact with stations.

Each station represents a resume section:

- Home Base: introduction
- Laptop: projects
- Resume Board: resume download and career summary
- Component Lab: reusable components and UI architecture
- Performance Monitor: optimization and rendering improvement experience
- Trouble Room: debugging and production issue handling
- Contact Terminal: email, GitHub, LinkedIn

## 5. Product Goals

### Goal 1: Make the portfolio memorable

The site should stand out compared to ordinary resume websites.

### Goal 2: Show frontend skill through the product itself

The implementation should demonstrate:

- Component architecture
- State management
- Responsive design
- Accessibility
- Performance awareness
- Clean TypeScript usage
- UI interaction design

### Goal 3: Keep resume information easy to access

No critical information should be hidden behind game interaction only.

The user must always have access to:

- Resume
- Projects
- Skills
- Contact

### Goal 4: Make it deployable and maintainable

The site should be easy to update when DDoni changes resume content, project details, skills, or links.

## 6. Non-Goals

This project should not become a full game.

Do not build:

- Complex combat system
- Inventory system beyond simple visual skill display
- Save/load game progress
- Multiplayer
- Complex physics
- Large open-world map
- Heavy 3D rendering
- Authentication
- Backend database

## 7. Recommended Tech Stack

### Core

- Next.js
- React
- TypeScript
- Tailwind CSS
- Phaser 3
- Zustand
- Motion or CSS transitions
- Vercel
- npm

### Optional

- Vitest
- React Testing Library
- Playwright
- Sentry
- GitHub Actions
- MDX for content

## 8. Architecture Direction

Use Next.js for the overall site and portfolio shell.

Use Phaser only for the interactive game map area.

Do not put all portfolio content inside Phaser.  
Portfolio content should remain in React components so it is accessible, SEO-friendly, and easy to maintain.

Recommended structure:

- React handles page layout, navigation, modals, resume content, and project cards.
- Phaser handles character movement, map rendering, object interaction, and interaction events.
- Zustand handles shared state between Phaser and React.

Example:

When the player interacts with the laptop object:

1. Phaser detects interaction.
2. Phaser calls a bridge function or updates Zustand state.
3. React opens the Projects modal.
4. The modal displays project content from TypeScript data files.

## 9. Key User Flows

### Flow 1: Recruiter Quick View

1. User enters the site.
2. User sees hero section with role and CTA buttons.
3. User clicks Resume.
4. Resume summary opens.
5. User clicks Download PDF or Contact.

Acceptance criteria:

- User can access resume within 1 click from the first screen.
- User does not need to move the character to access resume.
- Contact links are visible and functional.

### Flow 2: Interactive Exploration

1. User enters the site.
2. User sees a small game map.
3. User moves character using arrow keys or WASD.
4. User approaches an object.
5. User sees interaction hint.
6. User presses Enter or clicks/taps object.
7. Related modal opens.

Acceptance criteria:

- Movement feels responsive.
- Interaction hint appears clearly.
- Modal can be closed with Escape, close button, and outside click where appropriate.
- User can return to map without losing page state.

### Flow 3: Mobile View

1. User opens site on mobile.
2. User sees simplified controls or non-game card layout.
3. User can access all major portfolio sections.

Acceptance criteria:

- Game map must not block access to content.
- Mobile users can tap objects or use direct section cards.
- Resume, projects, and contact must be easy to access.

### Flow 4: Project Review

1. User opens Projects.
2. User sees project list.
3. User selects a project.
4. User sees structured case study.

Each project must include:

- Summary
- Problem
- My role
- Tech stack
- Key implementation
- Result or impact
- What I learned
- Link to demo, GitHub, or screenshot if available

## 10. Page Structure

### `/`

Main portfolio page.

Sections:

1. Hero
2. Quick CTA Navigation
3. Game Map Section
4. Fallback Portfolio Sections
5. Contact/Footer

### Optional future routes

- `/resume`
- `/projects/[slug]`
- `/about`

Initial version can be single-page.

## 11. Required UI Components

### Layout Components

- `Header`
- `HeroSection`
- `QuickActions`
- `GameSection`
- `FallbackPortfolio`
- `Footer`

### Game Components

- `GameCanvas`
- `PhaserGame`
- `gameConfig`
- `interactionRegistry`
- `gameEvents`

### Modal Components

- `BaseModal`
- `ProjectModal`
- `ResumeModal`
- `SkillsModal`
- `ExperienceModal`
- `ContactModal`

### Content Components

- `ProjectCard`
- `SkillInventory`
- `ExperienceTimeline`
- `ResumeSummary`
- `ContactLinks`

## 12. Game Map Objects

The first version should include these objects:

### Laptop

Purpose:

- Opens project list.

Label:

Projects

Modal:

ProjectModal

### Resume Board

Purpose:

- Opens resume summary and PDF download.

Label:

Resume

Modal:

ResumeModal

### Component Lab

Purpose:

- Shows component architecture, reusable UI, design system experience.

Label:

Component Lab

Modal:

ExperienceModal

### Performance Monitor

Purpose:

- Shows performance optimization experience.

Label:

Performance

Modal:

ExperienceModal

### Trouble Room

Purpose:

- Shows debugging, incident response, production issue handling.

Label:

Troubleshooting

Modal:

ExperienceModal

### Contact Terminal

Purpose:

- Shows email, GitHub, LinkedIn, and contact CTA.

Label:

Contact

Modal:

ContactModal

## 13. Resume Content Requirements

Use structured data files.

Recommended file:

`src/data/profile.ts`

Required fields:

```ts
export const profile = {
  name: 'DDoni',
  role: 'Frontend Developer',
  headline: '',
  summary: '',
  location: '',
  email: '',
  github: '',
  linkedin: '',
  resumePdfUrl: '',
};
```

## 14. Project Content Requirements

Recommended file:

`src/data/projects.ts`

Each project should follow:

```ts
export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  period?: string;
  role: string;
  techStack: string[];
  summary: string;
  problem: string;
  solution: string[];
  impact: string[];
  learned: string[];
  links?: {
    demo?: string;
    github?: string;
    caseStudy?: string;
  };
};
```

## 15. Skill Content Requirements

Recommended file:

`src/data/skills.ts`

Group skills by category:

- Frontend
- State Management
- Styling
- Testing
- Performance
- Collaboration
- Tools

Example:

```ts
export const skills = [
  {
    category: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript'],
  },
  {
    category: 'Styling',
    items: ['Tailwind CSS', 'CSS Modules', 'Styled Components'],
  },
];
```

## 16. UX Requirements

### First Screen

The first screen must include:

- Name or brand
- Frontend Developer title
- One-sentence summary
- Resume button
- Projects button
- Contact button

### Navigation

Provide both:

- Game exploration
- Direct navigation buttons

### Modal UX

All modals must:

- Have a visible close button
- Close on Escape
- Restore focus after closing
- Be keyboard navigable
- Have accessible title
- Avoid excessive animation

### Game UX

The game map must:

- Explain controls clearly
- Show interaction hints near objects
- Support keyboard
- Support click/tap interaction
- Not trap users inside the game area

## 17. Accessibility Requirements

The site must follow practical accessibility standards.

Required:

- Semantic HTML for all non-game content
- Buttons must be real `<button>` elements
- Links must be real `<a>` elements
- Modals must use accessible dialog patterns
- Keyboard access for modals and direct navigation
- Visible focus states
- Sufficient color contrast
- Alt text for meaningful images
- Reduced motion support

For game content:

- Provide non-game fallback cards for all content.
- Do not make the canvas the only way to access resume information.

## 18. Performance Requirements

Initial page should feel fast.

Requirements:

- Lazy-load the Phaser game if possible.
- Keep assets lightweight.
- Compress sprite sheets and images.
- Avoid large audio files in initial version.
- Avoid autoplay sound.
- Avoid heavy 3D.
- Use dynamic import for game section if needed.
- Optimize images with Next.js image handling when appropriate.

Target:

- Good Lighthouse performance score.
- No major layout shift.
- Fast access to text content before game assets fully load.

## 19. Responsive Requirements

Desktop:

- Full game map experience.
- Keyboard movement enabled.

Tablet:

- Game map can remain enabled with tap support.

Mobile:

- Provide simplified card-based fallback.
- Game map can be shown only if it remains usable.
- Resume, projects, and contact must be visible without horizontal scrolling.

## 20. Visual Direction

Style keywords:

- Professional but playful
- Pixel-inspired or clean 2D game UI
- Developer quest theme
- Not childish
- Not overly animated
- Clear readable typography

Recommended visual style:

- Clean dark or light UI
- Small pixel-map area
- Modern cards and modals
- Game UI elements used as accents, not distractions

## 21. Content Tone

The copy should sound confident, clear, and professional.

Avoid:

- Too much cuteness
- Overly casual jokes
- Vague phrases like “I love making things”
- Generic claims without proof

Prefer:

- Problem-solving language
- Technical ownership
- Specific frontend contributions
- Clear project outcomes

## 22. MVP Scope

The MVP must include:

- Hero section
- Quick CTA buttons
- Game map with character movement
- At least 5 interactable objects
- Modal system
- Resume modal
- Projects modal
- Skills/Experience modal
- Contact modal
- Mobile fallback
- Deployment-ready build

## 23. Future Enhancements

After MVP:

- Add project detail pages
- Add blog or dev notes
- Add animation polish
- Add Sentry
- Add Playwright tests
- Add analytics
- Add sound toggle
- Add custom pixel art
- Add downloadable PDF resume
- Add Korean/English language toggle

## 24. Definition of Done

The project is done when:

- `npm run build` succeeds.
- `npm run lint` succeeds.
- `npm run typecheck` succeeds.
- Main content is accessible without game interaction.
- Desktop game interaction works.
- Mobile fallback works.
- Resume, projects, and contact are reachable in one click.
- All placeholder links are replaced or clearly marked as TODO.
- README explains how to run, build, and update content.
