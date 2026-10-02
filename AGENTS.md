# Agent Instructions
- **Never update this file**

## Project

Janus Journey is an open-source application for organizing personal tasks
and structured Journeys.

Users can manage simple standalone Tasks and Folders or create Journeys
for larger objectives that benefit from organization, progress tracking,
history, and sharing.

A Journey can contain Folders and Tasks and represents a structured path
without enforcing a mandatory execution order.

## Technology Stack

- React v19, TypeScript v6, and Vite v8.
- Tailwind CSS v4 is integrated through `@tailwindcss/vite`
- Zustand v5 for UI state management.
- TankStack React Query v5.
- Use existing dependencies when they already provide the required functionality.

## Commands

- Development: `npm run start`
- Lint: `npm run lint`

## Constraints

- TypeScript includes `src/` and enables `noUnusedLocals`, `noUnusedParameters`, `noFallthroughCasesInSwitch`, and `erasableSyntaxOnly`; remove unused symbols before building.
- Never install, remove, upgrade, or replace a dependency without explicit user authorization.
- If a task requires a dependency that is not currently installed, stop before implementing that part and ask the user for permission to install it.
- When requesting permission, state the dependency name and briefly explain why it is required.
- Never create, remove and move a file without explicit use authorization. Ask for permision **always** before do it for **every** case.

## Code Conventions

- Prioritize readable, maintainable code over clever abstractions or micro-optimizations.
- Use descriptive names and avoid unnecessary abbreviations.
- Declare functions and React components using arrow functions.
- Use `lowerCamelCase` for functions, utilities, variables, hooks, and constants.
- Use `UpperCamelCase` for React components and component files.
- Do not use global variables or global mutable state.
- Keep constants scoped as locally as possible.
- Prefer early returns and extracted logic over deeply nested conditions.
- Avoid overly compact one-liners when they reduce readability.
- **NEVER** define more than one React component in the same file.
- **EVER** React component MUST live in its own dedicated file.
- Do not create helper/internal React components inside another component file.
- If a component needs to be split, create a separate file for each resulting component.
- **NEVER** use more than 2 `useEffect` hooks in a single component.
- If a third `useEffect` is needed, refactor immediately using a `Component` + `ComponentContainer` structure.
- `ComponentContainer` handles lifecycle, side effects, and orchestration.
- `Component` handles rendering and user interaction.
- Do not use custom hooks just to hide excessive `useEffect` complexity.

## Tailwind CSS Conventions
- Prefer Tailwind CSS built-in utilities, naming conventions, and design patterns instead of creating custom alternatives.
- Always prefer Tailwind canonical utilities suggested by Tailwind CSS IntelliSense (e.g. `tracking-wider` instead of `tracking-[0.05em]`) and avoid arbitrary values when an equivalent built-in utility exists.
- Keep class lists minimal: avoid redundant, overlapping, duplicated, or conflicting utilities (e.g. unnecessary combinations of `p-*` with equivalent `px-*`/`py-*`, or `block lg:block`).
- Before adding a utility, check whether an existing class already provides or overrides the same behavior.
- When custom Tailwind theme tokens, colors, utilities, or animations are required, define them in `index.css`

## Testing Conventions

- Tests define expected application behavior. Production code MUST satisfy the tests, not the other way around.
- NEVER modify, weaken, bypass, or artificially accommodate a valid failing test just to make it pass.
- When a test fails, first determine whether:
  1. production behavior violates the test, or
  2. the test contradicts the current specification.
- Only modify an existing test when the specification or expected behavior has actually changed.
- Tests MUST reproduce real user behavior. Do not add artificial rerenders, state mutations, timing workarounds, or implementation-specific actions that a real user would not perform just to make a test pass.
- Bug fixes SHOULD keep the failing regression test unchanged and modify production code until that test passes.
- Prefer stable testing contracts (`id`, `data-testid`, roles, etc.) over translated UI text when the text is locale-dependent.
- After fixing a failing test, run the relevant test file first, then the full test suite.

### State Management

- Use **Zustand** for client-side and global UI state, including authentication state, filters, selected options, UI preferences, modals, drawers, and temporary interface state.
- Use **React Query** for remote and persistent data, including Firestore queries, mutations, caching, loading/error states, invalidation, and refetching.
- Do not duplicate React Query data inside Zustand.
- Firestore is the source of truth for persistent application data.
- Zustand must not be used as a replacement for React Query.


### Documentation

- Document functions, hooks, services, repositories, utilities, and React components using TSDoc.
- Document parameters, return values, behavior, and relevant constraints when they are not obvious from the code.
- Use inline comments only for non-obvious logic, architectural decisions, workarounds, or external integration behavior.
- Do not add comments that simply restate the code.
- Keep documentation concise and synchronized with the implementation.

## AI Changelog

- After completing any task that modifies the project, append an entry to `AIChangelog.md`.
- Follow the format and rules defined inside `AIChangelog.md`.
- Log only completed project changes, not discussions, planning, or unanswered prompts.
- Keep entries concise and add the newest entry at the top.

## Basic App Structure

src/
├── components/
│   └── ComponentFolder/
│      ├── ComponentPart1.tsx
│      ├── ComponentPart2.tsx
│      ├── ...
│      └── ComponentPartN.tsx     
│
├── pages/
│   └── ExamplePage/
│       └── Example.tsx
│
├── services/
│   └── example.service.ts
│
├── hooks/
│   └── useHookExample.ts
│
├── stores/
│   └── example.store.ts
│
├── config/
│   └── firebase.ts
│
├── types/
│   └── typesExample.ts
│
├── router/
│   └── router.tsx
│
├── assets/
│
├── App.tsx
├── main.tsx
└── index.css