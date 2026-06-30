# AGENTS.md

# AGENTS.md

You are working on DDoni’s Frontend Quest Portfolio.

This repository is a professional frontend developer portfolio with a lightweight 2D game-like interaction layer. The portfolio must be memorable, but it must remain fast, accessible, and recruiter-friendly.

## 1. Core Mission

Build an interactive portfolio where users can explore a small 2D map and open resume/project/skill/contact sections by interacting with objects.

However, never make the game the only way to access important information.

Always preserve direct access to:

- Resume
- Projects
- Skills
- Contact

## 2. Product Priorities

Prioritize in this order:

1. Recruiter usability
2. Accessibility
3. Performance
4. Clean frontend architecture
5. Visual polish
6. Game-like interaction

Do not sacrifice usability for visual effects.

## 3. Tech Stack

Use:

- Next.js
- React
- TypeScript
- Tailwind CSS
- Phaser 3
- Zustand
- npm

Use optional libraries only when needed.

Avoid adding heavy dependencies without a clear reason.

## 4. Repository Structure

Use this structure unless there is a strong reason to change it:

```txt
src/
  app/
    page.tsx
    layout.tsx
    globals.css

  components/
    layout/
      Header.tsx
      Footer.tsx

    sections/
      HeroSection.tsx
      QuickActions.tsx
      GameSection.tsx
      FallbackPortfolio.tsx

    modals/
      BaseModal.tsx
      ProjectModal.tsx
      ResumeModal.tsx
      ExperienceModal.tsx
      ContactModal.tsx

    portfolio/
      ProjectCard.tsx
      SkillInventory.tsx
      ExperienceTimeline.tsx
      ContactLinks.tsx

  game/
    PhaserGame.ts
    config.ts
    scenes/
      PortfolioScene.ts
    objects/
      Player.ts
      InteractableObject.ts
    events.ts
    interactions.ts

  store/
    portfolioStore.ts

  data/
    profile.ts
    projects.ts
    skills.ts
    experiences.ts

  lib/
    cn.ts
    constants.ts

public/
  assets/
    sprites/
    maps/
    images/
  resume/
    resume.pdf
```

## 5. Commands

Assume these commands exist or add them to `package.json`:

```bash
npm run dev
npm run build
npm run lint
npm run typecheck
npm run test
npm run format
```

Before finishing a task, run the most relevant checks.

For UI-only changes:

```bash
npm run lint
npm run typecheck
```

For broader changes:

```bash
npm run build
npm run lint
npm run typecheck
```

If tests exist:

```bash
npm run test
```

## 6. Coding Standards

### TypeScript

- Use strict TypeScript.
- Avoid `any`.
- Prefer explicit types for public data structures.
- Keep content data typed.
- Use discriminated unions where helpful for modal state.

### React

- Prefer small components.
- Keep components focused.
- Do not mix Phaser game logic into React UI components.
- Use React for modals, content, navigation, and accessibility.
- Use Phaser only for map rendering, character movement, and object interactions.

### State Management

Use Zustand for shared state between Phaser and React.

Recommended modal state:

```ts
type ModalType =
  'resume' | 'projects' | 'skills' | 'experience' | 'contact' | null;

type PortfolioState = {
  activeModal: ModalType;
  activeExperienceId?: string;
  openModal: (modal: ModalType, options?: { experienceId?: string }) => void;
  closeModal: () => void;
};
```

### Styling

- Use Tailwind CSS.
- Keep class names readable.
- Extract repeated UI patterns into components.
- Avoid overusing arbitrary values.
- Maintain visible focus states.

### Content

- Do not hard-code portfolio content inside components.
- Put profile, projects, skills, and experience data in `src/data`.
- Use TODO markers for missing real information.
- Do not invent fake resume details.

## 7. Game Architecture Rules

Phaser must be isolated from React as much as possible.

Allowed:

- Phaser emits interaction events.
- Phaser reads object definitions.
- Phaser updates Zustand or calls registered callbacks.
- React reacts to state changes and opens modals.

Not allowed:

- Rendering resume text inside Phaser canvas only
- Building modals inside Phaser
- Putting large business logic in Phaser scenes
- Requiring game movement to access critical content

## 8. Required Game Interactions

Create a small map with these interactable objects:

1. Laptop → opens Projects modal
2. Resume Board → opens Resume modal
3. Component Lab → opens component/architecture experience
4. Performance Monitor → opens performance experience
5. Trouble Room → opens debugging/issue experience
6. Contact Terminal → opens Contact modal

Each interactable object should have:

```ts
type InteractableId =
  | 'projects'
  | 'resume'
  | 'components'
  | 'performance'
  | 'troubleshooting'
  | 'contact';

type InteractableObject = {
  id: InteractableId;
  label: string;
  x: number;
  y: number;
  interactionType: 'modal';
  modalType: ModalType;
  experienceId?: string;
};
```

## 9. Accessibility Rules

Accessibility is mandatory.

All important content must exist outside canvas.

Modals must:

- Use accessible dialog semantics
- Have a title
- Have a close button
- Close on Escape
- Restore focus when closed
- Trap focus while open if practical
- Avoid keyboard traps

Buttons:

- Use `<button>` for actions
- Use `<a>` for navigation links
- Add clear labels

Motion:

- Respect `prefers-reduced-motion`
- Do not use excessive animations

Canvas:

- Add a text explanation near the game
- Provide direct cards below or beside the game for the same content
- Do not rely on canvas for SEO or accessibility

## 10. Performance Rules

The portfolio must feel fast.

- Lazy-load the game if possible.
- Do not block text content while game assets load.
- Keep sprite/image assets small.
- Avoid autoplay audio.
- Do not add 3D libraries unless explicitly requested.
- Avoid large animation libraries unless needed.
- Use dynamic imports for heavy client-only code.
- Keep bundle size reasonable.

## 11. Responsive Rules

Desktop:

- Show full game map.
- Enable keyboard controls.

Mobile:

- Provide fallback cards.
- Do not force keyboard-style movement.
- Allow tap interaction if the game is shown.
- Ensure CTA buttons are visible immediately.

## 12. UI/UX Rules

The first viewport must include:

- DDoni name or brand
- Frontend Developer title
- One-sentence value proposition
- Resume button
- Projects button
- Contact button

Game controls must be explained:

Example:

```txt
Move with WASD / Arrow Keys. Press Enter near an object to interact.
```

Do not hide essential navigation.

Use playful language only in labels, not in important resume explanations.

## 13. Content Rules

Use professional language.

Good:

```txt
Built reusable UI components to improve consistency and maintainability.
```

Avoid:

```txt
I love making cute websites and fun stuff.
```

Every project should include:

- Problem
- Role
- Tech stack
- Implementation
- Result
- Learning

If real metrics are unavailable, do not fabricate metrics. Use qualitative impact.

## 14. Testing Expectations

At minimum, verify:

- Page renders
- CTA buttons open correct modals
- Modal close behavior works
- Main content exists outside canvas
- TypeScript passes
- Build passes

If Playwright is added, test:

- Resume CTA
- Projects CTA
- Contact CTA
- Modal keyboard close
- Mobile fallback visibility

## 15. Git and PR Rules

Each task should produce a focused change.

### Git Workflow

- Use `develop` as the main development branch.
- Do not use `main` for daily development work.
- Create short-lived feature branches from `develop`.
- Use branch names that describe the work clearly.
- Prefer these branch prefixes:
  - `feature/*` for new features
  - `fix/*` for bug fixes
  - `docs/*` for documentation changes
  - `refactor/*` for refactoring
  - `chore/*` for setup, config, dependency, or maintenance work
- Keep feature branches small and merge them back into `develop` frequently.
- Run lint, tests, or build checks before pushing when the related scripts exist.
- Use `main` later as the stable release branch.
- When releasing, merge `develop` into `main` and create a version tag such as `v0.1.0`.
- Use `hotfix/*` branches only for urgent production fixes after `main` becomes active.

Example:

```bash
git checkout develop
git pull
git checkout -b feature/auth
```

### Commit Message Rules

Use Conventional Commits.

Format:

```txt
type(scope): subject
```

Rules:

- Use lowercase English for `type`, `scope`, and `subject`.
- Keep the subject short, clear, and action-oriented.
- Do not end the subject with a period.
- Make one commit represent one logical change.
- Avoid vague messages such as `update`, `fix`, `wip`, or `asdf`.

Allowed types:

- `feat`: new feature
- `fix`: bug fix
- `docs`: documentation only
- `style`: formatting or style changes without behavior changes
- `refactor`: code restructuring without behavior changes
- `test`: tests
- `chore`: config, dependency, setup, or maintenance work
- `build`: build system or package changes
- `ci`: CI workflow changes
- `perf`: performance improvement
- `revert`: revert a previous commit

Recommended scopes for this project:

- `auth`
- `hatch`
- `character`
- `diary`
- `care`
- `home`
- `ui`
- `db`
- `prisma`
- `3d`
- `docs`
- `config`

Examples:

```txt
feat(auth): add signup page
feat(hatch): implement server-side character draw
fix(diary): ignore empty lines when counting diary content
refactor(care): extract action cooldown constants
docs(tasks): mark project setup checklist done
chore(prisma): add seed script
```

Before final response:

- Summarize changed files
- Explain implementation decisions
- Mention commands run
- Mention anything not completed
- Mention any placeholders requiring user input

Do not claim a check passed unless it was actually run.

## 16. Security and Privacy

Do not commit secrets.

Do not include private personal information unless explicitly provided.

Use placeholder values with TODO comments for:

- Email
- Phone
- LinkedIn
- GitHub
- Resume PDF
- Company-specific confidential details

## 17. Design Guardrails

The design should feel:

- Clean
- Memorable
- Professional
- Slightly game-like
- Frontend-engineer oriented

Avoid:

- Childish visuals
- Excessive pixel clutter
- Slow intro animation
- Background music by default
- Hidden resume information
- Tiny text
- Low contrast

## 18. Definition of Done for Codex Tasks

A task is complete only when:

- Implementation matches PRD intent.
- TypeScript errors are resolved.
- Lint errors are resolved where practical.
- The page is usable without game interaction.
- The code is organized by responsibility.
- No fake personal data is invented.
- Final response includes commands run and remaining TODOs.
