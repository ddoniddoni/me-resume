# CODEX_PROMPTS.md

# Codex Prompts

Use these prompts in order.

## 1. Start the project

```txt
Read PRD.md, AGENTS.md, and IMPLEMENTATION_PLAN.md first.

Build this project phase by phase.
Start with Phase 0 and Phase 1 only.
Do not implement Phaser yet.
Use npm, not pnpm or yarn.
Keep the first version recruiter-friendly, accessible, and easy to extend.

After implementation, report:
- Changed files
- Commands run
- Remaining TODOs
```

## 2. Build modal system

```txt
Continue with Phase 2 from IMPLEMENTATION_PLAN.md.
Implement the modal store and accessible modal system.
Use npm scripts for all commands.
Do not start Phaser until the modal system and fallback portfolio are working.

After implementation, report:
- Changed files
- Commands run
- Remaining TODOs
```

## 3. Build fallback portfolio

```txt
Continue with Phase 3 from IMPLEMENTATION_PLAN.md.
Create the non-game fallback portfolio section.
All resume, project, skill, experience, and contact content must be reachable without game interaction.

After implementation, report:
- Changed files
- Commands run
- Remaining TODOs
```

## 4. Add Phaser game MVP

```txt
Continue with Phase 4 from IMPLEMENTATION_PLAN.md.
Install Phaser with npm.
Create the client-only GameSection and basic Phaser scene.
Add player movement and interactable objects that open React modals through the Zustand store.

After implementation, report:
- Changed files
- Commands run
- Remaining TODOs
```

## 5. Accessibility and mobile pass

```txt
Continue with Phase 5 from IMPLEMENTATION_PLAN.md.
Improve mobile fallback and accessibility.
Make sure the portfolio is usable without the Phaser canvas.
Make modals keyboard-accessible and ensure visible focus states.

After implementation, report:
- Changed files
- Commands run
- Remaining TODOs
```

## 6. Performance and final polish

```txt
Continue with Phase 6 and Phase 7 from IMPLEMENTATION_PLAN.md.
Lazy-load the game where appropriate.
Improve visual polish without adding heavy dependencies.
Run npm run lint, npm run typecheck, npm run build, and npm run test if available.

After implementation, report:
- Changed files
- Commands run
- Check results
- Remaining TODOs
```
