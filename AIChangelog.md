## 2026-10-06

### #JANUS-FE-0017: Redirect Logout to Root

**Work**: Fix / Authentication; Updated the Dashboard logout redirect to return users to the public root route after the Better Auth session is cleared.

- Preserved the existing Better Auth sign-out and route refresh behavior.
- Changed only the post-logout destination from `/auth/login` to `/`.

## 2026-10-06

### #JANUS-FE-0016: Persist Better Auth in MongoDB

**Work**: Build / Authentication; Replaced temporary process-memory Better Auth persistence with the official MongoDB adapter while preserving the existing Google, session, JWT, and BFF identity contracts.

- Added a server-only reusable MongoDB connection for the dedicated `better-auth-db` database.
- Persisted Better Auth users, accounts, sessions, verification data, and JWKS through the official adapter.
- Removed the temporary in-memory JWKS adapter without changing JWT subject, issuer, audience, or expiration behavior.
- Documented server-only MongoDB configuration and authentication persistence across frontend restarts.

## 2026-10-05

### #JANUS-FE-0011: Add Janus User Authentication Boundary

**Work**: Plan / Build; Connected Better Auth session resolution to the BFF User boundary and added first-time Janus User provisioning without moving remote data ownership into Zustand.

- Added authenticated BFF requests for `GET /users/me` and User creation, including Better Auth access-token transport and explicit status handling.
- Added the global Janus authentication boundary and Zustand flags for loading, authenticated, provisioning, and error states while keeping the User response in React Query.
- Added the `/provisioning` confirmation screen, Google provider-account lookup, AuthLogin payload construction, direct `201` authentication, and resolved `409` provisioning behavior.
- Added frontend BFF environment configuration and expanded the User type for provider login data.

## 2026-10-03

### #JANUS-FE-0010: Component Folder Organization

**Work**: Refactor / Structure; Moved root-level reusable components into dedicated component folders while preserving their behavior and keeping one component per file.

- Moved BrandLogo, FeatureHighlight, LoginForm, MarketingHeader, MarketingPanel, and QueryProvider into matching folders under `src/components/`.
- Updated application, layout, marketing, and SideNav imports to use the new component paths.
- Kept Dashboard components grouped under `src/components/Dashboard/` and preserved the existing layout component structure.

## 2026-10-02

### #JANUS-FE-0009: Better Auth Google Authentication

**Work**: Plan / Build; Replaced the temporary local authentication preview with Better Auth 1.7.7 Google authentication and server-enforced session access for the authenticated application.

- Added stateless Better Auth server configuration with Google, Next.js cookie integration, and required environment documentation.
- Added Better Auth client configuration and the `/api/auth/[...all]` App Router handler.
- Connected the existing Login UI’s Google action to the Better Auth OAuth flow with a Dashboard callback.
- Added Next.js Proxy protection for Dashboard requests and authoritative Server Component session checks for `/dashboard` and `/login` redirects.
- Added real logout behavior to the authenticated SideNav using Better Auth sign-out and preserved React Query domain data and Zustand UI-state boundaries.
- Removed the temporary `useState` authentication preview and its obsolete authenticated demo component.
- Kept the phase frontend-scoped: no BFF calls, JWT plugin, JWKS integration, custom access-token issuer, database adapter, persistence, or access-token storage was added.

## 2026-10-02

### #JANUS-FE-0008: SideNav Overflow and Scroll Lock

**Work**: Build / Responsive UI; Restructured SideNav overflow content and added DOM-driven mobile page scroll locking without introducing additional application state.

- Moved Home, My Tasks, Favorites, and Explore into the SideNav’s scrollable overflow region with Journey and Folder resources.
- Added a mobile-open data attribute and Tailwind `:has()` overflow rule on the document body to prevent main-page scrolling while the mobile SideNav is open.
- Preserved the independent desktop collapse state and local mobile menu state.

## 2026-10-02

### #JANUS-FE-0007: Responsive SideNav Menu

**Work**: Build / Responsive UI; Added a Tailwind breakpoint-driven mobile SideNav menu with independent local open/close state while preserving the desktop collapsed/expanded navigation state.

- Added a mobile navigation trigger, overlay, drawer transition, and close controls using Tailwind responsive utilities.
- Kept the desktop SideNav collapse state independent from the mobile menu state.
- Preserved Journey accordion behavior, root resource queries, application navigation, and Dashboard logic.

## 2026-10-02

### #JANUS-FE-0006: Authenticated Dashboard Workspace

**Work**: Plan / Build; Implemented the first authenticated application shell and Dashboard Home using local mock data with React Query and Zustand UI-state boundaries.

- Added the `/dashboard/home` route inside a reusable authenticated `AppLayout` with persistent application navigation.
- Added the SideNav navigation layer with Home, Tasks, Favorites, Journeys, Folders, Settings, and User areas.
- Added root-resource loading for User Journeys, User-owned root Folders, and User-owned root Tasks through React Query.
- Added Journey accordion selection and expansion using Zustand identifiers only, with independently keyed Journey tree queries and loading Skeletons.
- Added the Dashboard Home workspace with mock overview metrics, Journey summaries, quick actions, and responsive visual composition inspired by the Dashboard reference.
- Added typed User, Journey, Folder, and Task mock data with one User, four Journeys, seven root Folders, and thirty Tasks using non-null User, Journey, or Folder parent relationships.
- Added the shared TanStack Query provider, mock services, query hooks, Dashboard types, resource types, and application UI store without introducing authentication, API, BFF, persistence, microservice, or database behavior.
- Kept Dashboard Home independent from Journey tree loading and did not automatically select the first Journey or implement future resource detail views.

## 2026-10-02

### #JANUS-FE-0005: Scenic Background Asset

**Work**: Build / Visual UI; Replaced the generated hero background treatment with the provided Janus Journey scenic image while keeping styling in Tailwind utilities.

- Added the provided scenic background image to the landing experience using `next/image` with responsive cover positioning.
- Added a Tailwind gradient overlay to preserve text contrast and the existing Janus visual language.
- Removed the obsolete custom hero and login background CSS classes.
- Converted the login shell’s decorative background treatment to Tailwind utilities without changing routes, authentication preview behavior, or application boundaries.

## 2026-10-02

### #JANUS-FE-0004: Desktop Route Layouts

**Work**: Build / Responsive UI; Improved the desktop composition of the existing landing and login routes while preserving the mobile layout, routing, local authentication preview, and frontend-only boundaries.

- Expanded the desktop landing composition with viewport-aware spacing, max-width framing, larger hero typography, and a three-column feature layout.
- Improved the desktop login composition with a larger responsive card, full-viewport shell, and subtle Janus visual background treatment.
- Preserved the existing small-screen layout behavior, components, route structure, temporary authentication state, and navigation.

## 2026-10-02

### #JANUS-FE-0003: Split Landing and Login Routes

**Work**: Plan / Build; Refactored the existing split-screen login composition into separate landing and login routes while preserving the current visual design and temporary local authentication preview.

- Updated `/` to render the existing Janus Journey landing experience through a dedicated `LandingPage` composition.
- Added `/login` as a dedicated route for the existing login form and local authenticated preview.
- Reused the existing marketing, login, branding, and authenticated-view components instead of rebuilding the UI.
- Updated landing navigation and calls to action to use internal `/login` navigation.
- Kept `/register` unimplemented and preserved the frontend-only scope with no authentication services, APIs, persistence, BFF, microservices, or backend behavior.

## 2026-10-02

### #JANUS-FE-0002: TSDoc Convention Review

**Work**: Review / Documentation; Audited the existing frontend source and aligned TSDoc with the updated parameter documentation rules without changing implementation behavior.

- Replaced generic destructured `@param props` entries with individual parameter documentation across the login components.
- Added matching TSDoc for the login form submission handler and the root layout `children` parameter.
- Preserved existing component descriptions and kept the review documentation-only, with no changes to UI, state, styling, structure, or application logic.

## 2026-10-02

### #JANUS-FE-0001: Initial Login UI

**Work**: Plan / Build; Created the first visual MVP of the Janus Journey frontend, using the Login design and branding assets available in the local project knowledge as the primary visual reference.

- Implemented the first Janus Journey login experience based on the visual reference available in project knowledge.
- Added the responsive split-screen login layout with the Janus Journey branding and authentication panel.
- Added dedicated layout/components following the project's one-component-per-file convention.
- Added a temporary local authentication state using `useState` to preview the transition between logged-out and logged-in views.
- Added a basic authenticated preview with logout behavior that returns the user to the login view.
- Kept route composition in `src/app/page.tsx` while separating the login UI into dedicated components.
- Integrated the Janus Journey logo asset and renamed it to `janus-journey-logo.png`.
- Added the required Tailwind styling and project visual tokens for the initial login experience.
- Updated the application metadata for Janus Journey.
- Kept the implementation frontend-only: no Google authentication, persistence, API calls, BFF communication, microservice integration, or backend behavior was introduced.
- Validated the implementation with the project's formatting, linting, testing, and production build checks.

## 2026-10-03

### #JANUS-FE-0011: Layout Folder Organization

**Work**: Refactor / Structure; Moved root-level layout components into dedicated folders while preserving the existing application composition and behavior.

- Moved `AppLayout`, `LandingPage`, and `LoginPage` into matching folders under `src/layout/`.
- Updated route imports to use the new layout component paths.
- Preserved the existing `SideNav` layout grouping and all layout behavior.

## 2026-10-03

### #JANUS-FE-0012: Frontend README Documentation

**Work**: Documentation / Build; Replaced the default Next.js README with project documentation for Janus Journey, its product philosophy, frontend architecture, authentication setup, development workflow, and contribution boundaries.

- Documented the purpose of Janus Journey, the distinction between Tasks, Folders, and Journeys, and the non-prescriptive Journey model.
- Documented the frontend technology stack, source structure, Better Auth, React Query, and Zustand ownership boundaries.
- Added installation, environment configuration, Google OAuth callback setup, development, validation, and production instructions.
- Documented the current frontend scope and explicitly identified deferred BFF, database, JWT/JWKS, and future resource-view work.

## 2026-10-04

### #JANUS-FE-0013: Better Auth Session Identity Boundary

**Work**: Build / Authentication; Completed the existing Better Auth session boundary for the authenticated workspace without introducing Janus domain User provisioning or BFF integration.

- Replaced the SideNav’s mock Janus User query with the authenticated Better Auth session identity for the profile display.
- Preserved Better Auth ownership of authentication, session, Google OAuth, logout, and protected route access.
- Preserved the existing Dashboard mock resource services and React Query architecture without creating or requesting a domain User from authentication.

## 2026-10-05

### #JANUS-FE-0014: Better Auth BFF JWT Plugin

**Work**: Build / Authentication; Enabled Better Auth’s official JWT server and client plugins for the future Janus BFF token without integrating the BFF or adding persistence.

- Configured `jwt()` with a bounded five-minute token, `BETTER_AUTH_URL` issuer, `janus-bff` audience, and Better Auth user ID subject.
- Configured `jwtClient()` so authenticated frontend code can request the token through `authClient.token()`.
- Enabled the official Better Auth JWKS endpoint with RS256 signing keys for future BFF validation.
- Added a development-only Dashboard inspector that requests the JWT, decodes only its payload in memory, and never stores the token in browser storage or Zustand.
- Added a temporary process-memory JWKS adapter because no database, schema, migration, or persistence architecture is approved in this phase.
- Removed remaining mock Janus User reads from Dashboard and navigation loading; current mock resources use their existing fixture owner identifier.
- Kept Google authentication, Better Auth sessions, protected Dashboard routes, mock Dashboard data, and logout behavior unchanged.

## 2026-10-06

### #JANUS-FE-0012: Restore Login-First Janus User Resolution

**Work**: Fix; Removed the unapproved `/users/me` and Better Auth account-list lookup flow, then restored authenticated User resolution through the existing BFF resource endpoint.

- Derive the User resource identifier from the authenticated Better Auth JWT `sub` and request `GET /users/{id}` through the BFF.
- Keep JWT validation in the BFF and use the frontend subject only to address the existing resource route.
- Remove `authClient.listAccounts()` from provisioning and rely on the completed Better Auth session instead.
- Keep provisioning reachable only after an authenticated User lookup returns `404`.
- Update the frontend README to document the corrected authentication and provisioning boundary.

## 2026-10-06

### #JANUS-FE-0013: Complete Google User Provisioning Payload

**Work**: Fix; Restored the frontend-owned Google AuthLogin data in the User creation request while leaving User identifiers, timestamps, and persistence defaults to the existing backend flow.

- Resolve the authenticated Google account through Better Auth only after the provisioning route is reached.
- Send `authLogin`, `provider`, provider email, provider username, provider avatar, and metadata.
- Preserve the existing session-based User profile fields and omit server-owned `id`, timestamps, and generated defaults.

## 2026-10-06

### #JANUS-FE-0014: Move Authentication Routes Under Auth Segment

**Work**: Refactor; Moved the login and User creation pages under the shared `/auth` App Router segment and updated all active frontend redirects and links without changing authentication behavior.

- Moved the login page to `/auth/login`.
- Moved the User creation page to `/auth/create-user`.
- Updated proxy, dashboard protection, logout, marketing links, and authentication boundary redirects.

## 2026-10-06

### #JANUS-FE-0015: Centralize Ant Design Icon Rendering

**Work**: Refactor; Added a typed client-side `Icon` component and migrated application icon consumers behind the shared Ant Design icon boundary without changing visual behavior or interactions.

- Added explicit supported icon-name and icon-variant types.
- Kept all Ant Design icon imports and name-to-component mapping inside `Icon.tsx`.
- Refactored Dashboard, SideNav, Journey tree, Login, and marketing components to use `<Icon />`.
