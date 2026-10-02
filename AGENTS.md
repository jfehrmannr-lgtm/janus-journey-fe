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

## Project Knowledge

- Local Janus Journey project knowledge is available under `.project/`.
- Treat `.project/` as the source of truth for project-wide architecture, contracts, infrastructure, technology decisions, and visual references.
- `.project/architecture/` contains architecture and infrastructure diagrams.
- `.project/contracts/` contains project and data contracts.
- `.project/media/` contains visual references and project media.
- Consult only the project knowledge relevant to the current task.
- Before changing behavior governed by a contract or architecture decision, read the relevant project knowledge.
- When implementing an existing design, inspect the relevant visual reference before coding.
- Never infer missing project rules. If required knowledge is unavailable, ask the user.
- Never modify files under `.project/` without explicit user authorization.

## Technology Stack

- React v19, Next v16,TypeScript v6, Node v22
- Tailwind CSS v4 is integrated through `@tailwindcss/postcss`
- Zustand v5 for UI state management.
- TankStack React Query v5.
- Ant Design Icons v6 for Icons.
- React Hot Toast v2
- Use existing dependencies when they already provide the required functionality.

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
- Use `lowerCamelCase` for arrow functions, utilities, variables, hooks, and constants.
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
- When custom Tailwind theme tokens, colors, utilities, or animations are required, define them in `src/app/globals.css`

## State Management

- Use **Zustand** for client-side and global UI state, including authentication state, filters, selected options, UI preferences, modals, drawers, and temporary interface state.
- Use **React Query** for remote and persistent data, including mutations, caching, loading/error states, invalidation, and refetching.
- Do not duplicate React Query data inside Zustand.
- Zustand must not be used as a replacement for React Query.

### Documentation

- Document functions, hooks, services, repositories, utilities, and React components using TSDoc.
- Document each destructured parameter individually. Never document a destructured props object as `@param props`.
- The `@param` name must match the actual destructured parameter name.
- Do not use generic `props`, `params`, or `options` documentation when their properties are destructured.

Use the following format:

```ts
/**
 * {General description.}
 *
 * @param firstParam - {First parameter description.}
 * @param secondParam - {Second parameter description.}
 * @returns {Return value description.}
 */
const functionOrComponent = ({
  firstParam,
  secondParam,
}: Params) => {
  // ...
};
```
- Document parameters, return values, behavior, and relevant constraints when they are not obvious from the code.
- Use inline comments only for non-obvious logic, architectural decisions, workarounds, or external integration behavior.
- Do not add comments that simply restate the code.
- Keep documentation concise and synchronized with the implementation.

## AI Changelog

- After completing any task that modifies the project, append an entry to `AIChangelog.md`.
- Follow the format and rules defined inside `AIChangelog.md`.
- Add the newest entry at the top.
- Every completed change must have a unique sequential identifier using the format `#JANUS-FE-XXXX`.
- Never reuse, modify, or reorder an existing change identifier.
- Determine the next identifier from the highest existing `JANUS-FE` identifier in `AIChangelog.md`.
- Every entry must include a descriptive title and a `Work` summary describing the workflow used (e.g. `Plan / Build`) and the purpose of the task.
- Document the meaningful completed changes, including relevant UI, behavior, components, assets, configuration, architectural decisions, and implementation boundaries.
- Log completed work only; do not include unfinished plans, discussions, or unanswered prompts.
- Do not reduce substantial work to generic one-line summaries.
- Do not document trivial implementation details or unchanged behavior.

## Basic App Structure

- Use the Next.js App Router.
- Keep `src/app/` focused on routing, layouts, route-level loading/error states, and route composition.
- Do not place reusable application components or business logic directly inside `src/app/`.
- Organize application code by responsibility using the following base structure:

```text
src/
├── app/
├── components/
├── services/
├── stores/
├── layout/
├── hooks/
├── assets/
├── types/
└── utils/
```