## 2026-10-15

### #JANUS-FE-0048: Add JourneyCard Playground

**Work**: Build / Components; Refactored the existing JourneyCard into a presentational, strongly typed card and registered an isolated JourneyCard playground without integrating it into Dashboard behavior.

- Removed direct Zustand access from JourneyCard and added selected state, click callback, class-name extension, visibility controls, optional progress, and optional last-modified inputs.
- Reused the existing Journey domain type, `Progress` type, and percentage calculation utility while preserving missing-data behavior through optional display sections.
- Added JourneyCard examples for progress states, selection, long content, unavailable progress, hidden metadata, and responsive three-card layouts.
- Registered JourneyCard alongside Button in the existing component playground registry without adding application navigation or new routes.

## 2026-10-15

### #JANUS-FE-0047: Refactor Component Playground Structure

**Work**: Refactor / Development Tooling; Split the component testing route into a registry-driven playground shell and an isolated Button playground while preserving the existing Button examples and interactions.

- Added a reusable playground shell with responsive component navigation and selected-playground rendering.
- Added a simple Button registration containing only its identifier, display name, and playground component.
- Extracted the complete Button showcase into an independent `ButtonPlayground` component.
- Kept the local-development gate and avoided changes to production UI components, application navigation, and routes.

## 2026-10-15

### #JANUS-FE-0046: Restrict Component Playground To Local Mode

**Work**: Refactor / Development Tooling; Restricted the `/component-testing` Button playground to Next.js development mode and added a user-facing production message.

- Rendered the visual component gallery only when `NODE_ENV` is `development`.
- Added a clear message for non-local environments without changing the reusable Button component.

## 2026-10-15

### #JANUS-FE-0045: Add Button Click Wave Effect

**Work**: Refactor / Components; Extended the reusable Button with a Tailwind-powered click wave effect and separated its type contracts and styling constants into dedicated files.

- Added `Button.types.ts` for Button props, supported values, and ripple-wave state.
- Added `constants.ts` for Button dimensions, supported gallery values, and explicit theme class mappings.
- Added pointer-positioned click waves with keyboard-click center fallback and automatic animation cleanup.
- Preserved native click callbacks, disabled behavior, accessibility attributes, variants, counts, icons, and independent width/padding controls.

## 2026-10-15

### #JANUS-FE-0044: Add Reusable Button Playground

**Work**: Build / Components; Added a strongly typed reusable Button component and a standalone visual testing route at `/component-testing` without changing existing application buttons or Dashboard UI.

- Added filled, outlined, and dotted variants with explicit semantic color mappings from existing Janus Journey theme tokens.
- Added independent width and visual-size controls, icon placement, numeric counts, native button types, disabled behavior, focus styles, and class-name extension support.
- Reused the existing shared `Icon` component for gallery examples.
- Added visual examples covering variants, colors, widths, sizes, icons, counts, states, combinations, and form submission behavior.

## 2026-10-15

### #JANUS-FE-0043: Reorganize Frontend Domain Types

**Work**: Refactor / Type System; Reorganized frontend types around the authoritative BFF DTO composition while preserving application-facing normalized models and existing UI contracts.

- Added small generic API response and collection wrappers plus explicit BFF resource, root-resource, navigation, User, dashboard, and application resource types.
- Separated BFF fields such as `parent`, nullable descriptions, optional order indexes, and `complete` task state from normalized frontend fields such as `parentUid`, non-null descriptions, numeric ordering, and `completed` status.
- Centralized BFF-to-application resource mapping and removed mock-only resource and dashboard types, JSON fixtures, and imports.
- Derived Dashboard Home metrics from normalized root resources while preserving the existing React Query keys, server hydration, and dashboard presentation.
- Updated Create Journey payload typing to translate the frontend `completed` state to the BFF contract’s `complete` state.

## 2026-10-15

### #JANUS-FE-0042: Scope Authentication to Protected Routes

**Work**: Refactor / Authentication Routing; Removed the client authentication boundary from the global root layout and mounted it only on Dashboard and provisioning routes.

- Kept the global Query Provider available to all routes without triggering session resolution for public pages.
- Preserved Dashboard authentication orchestration inside the authenticated Dashboard layout.
- Preserved provisioning authentication behavior around the Create User route.
- Left the public landing page and login page outside the client authentication boundary.

## 2026-10-15

### #JANUS-FE-0041: Reuse Client BFF JWTs

**Work**: Build / Authentication; Added in-memory Better Auth JWT reuse and concurrent issuance deduplication for authenticated browser BFF requests without changing server-side token handling.

- Cached valid client JWTs using their `exp` claim with a 30-second expiration safety margin.
- Shared concurrent token issuance promises and cleared failed or completed in-flight requests safely.
- Invalidated cached and in-flight token state on sign-out, session termination, and authenticated user changes.
- Added focused tests covering reuse, concurrency, expiry, failures, explicit invalidation, and stale in-flight results.

## 2026-10-15

### #JANUS-FE-0040: Prefetch Dashboard Home on the Server

**Work**: Refactor / SSR Hydration; Migrated Dashboard Home initial data loading to request-scoped TanStack Query server prefetching while preserving existing client query consumers and Dashboard interactions.

- Added a server-safe authenticated BFF adapter that forwards only the Better Auth JWT from the server request to the BFF.
- Prefetched Dashboard Home and root navigation queries in the `/dashboard/home` Server Component and dehydrated them through a React Query `HydrationBoundary`.
- Reused the existing navigation response mapping and query contracts across browser and server request transports.
- Preserved client-side navigation resource-tree queries, loading/error handling, Zustand state, layouts, and presentation components.

## 2026-10-14

### #JANUS-FE-0039: Refine Create Journey Visual Layout

**Work**: Refactor / Visual UI; Reworked the full-page Create Journey presentation to match the approved visual reference while preserving controlled form behavior and resource hierarchy.

- Separated Journey details, Folders, and Journey Tasks into distinct semantic cards with independent empty states.
- Added existing application resource icons for Journeys, Folders, and Tasks in section and item presentations.
- Preserved controlled Folder and Task editors, stable temporary identifiers, validation, ordering, draft logging, and full-page Cancel navigation.
- Kept Modal infrastructure, `modalUiStore`, backend boundaries, and form state ownership unchanged.

## 2026-10-14

### #JANUS-FE-0038: Move Create Journey to Dashboard Route

**Work**: Refactor / Routing; Moved the Create Journey workflow from the Dashboard Modal entry point to the authenticated `/dashboard/create/journey` route while preserving the reusable controlled form components and draft-only behavior.

- Added a Server Component App Router page that composes the existing Client `JourneyForm` inside the authenticated Dashboard layout.
- Updated Dashboard Create Journey actions to navigate to the new route and removed only the Dashboard’s Modal rendering/imports.
- Updated JourneyForm cancellation to navigate back to `/dashboard/home` while preserving validation, hierarchy editing, ordering, and console payload logging.
- Preserved the generic Modal infrastructure, `modalUiStore`, FolderForm, TaskForm, ActionButtons, types, utilities, and backend boundaries.

## 2026-10-14

### #JANUS-FE-0037: Refactor Reusable Resource Forms

**Work**: Refactor / Forms; Split the Create Journey hierarchy editor into controlled, reusable Journey, Folder, Task, and action-button components without changing Modal behavior or backend boundaries.

- Added `JourneyForm`, `FolderForm`, `TaskForm`, and reusable `ActionButtons` components under `src/components/Form`.
- Centralized Journey draft coordination, validation, deterministic ordering, payload generation, and modal cancellation in `JourneyForm`.
- Reused the same controlled `TaskForm` for both Journey-root Tasks and Folder Tasks while preserving stable temporary identifiers and nested relationships.
- Removed the obsolete monolithic `CreateJourneyForm` after updating Dashboard composition.
- Preserved Create logging behavior, Modal fade-out cleanup, semantic styling, accessibility, and frontend-only parentless payload generation.

## 2026-10-14

### #JANUS-FE-0036: Add Create Journey Draft Form

**Work**: Plan / Build; Added reusable client-side Modal infrastructure and connected the Dashboard Journey creation flow to a local hierarchical Journey draft form without introducing backend persistence.

- Added SSR-safe Portal rendering, animated Modal composition, delayed exit unmounting, accessibility behavior, focus management, Escape handling, backdrop dismissal, and lifecycle transition callbacks.
- Separated modal UI state into `useModalUiStore` with independent `showModal`, `typeModal`, `setShowModal`, and `setTypeModal` state/actions while preserving navigation state in `useAppUiStore`.
- Connected Create Journey quick actions to the `create` modal type and added dynamic local Folders, nested Tasks, and Journey-root Tasks with stable client-only identifiers.
- Added contract-based validation and a parentless frontend draft payload using editable Journey, Folder, and Task fields with deterministic ordering and `completed` task terminology.
- Kept the form mounted through Modal fade-out, reset it through unmount on the next opening, and intentionally avoided API requests, mutations, success messaging, and backend changes.

## 2026-10-14

### #JANUS-FE-0035: Standardize Semantic Color Tokens

**Work**: Refactor / Styling; Centralized recurring application surfaces, borders, text roles, primary actions, focus states, and error roles in the Tailwind v4 theme and migrated shared authenticated UI consumers.

- Added semantic surface, border, text, primary, action, focus, and danger tokens while preserving existing Task state tokens.
- Updated Dashboard, SideNav, WorkSidebar, Journey cards, loading states, authentication states, and shared error presentation to use semantic utilities.
- Retained brand-specific, marketing-only, hero-overlay, and task-state palette values where their visual responsibility is distinct.

## 2026-10-14

### #JANUS-FE-0034: Redistribute Progress Bar Status Colors

**Work**: Refactor / Visual UI; Updated the Journey progress bar to represent every visible Task state with the shared semantic status palette.

- Added normalized pending, in-progress, and in-pause counts to the pure progress result.
- Rendered completed, discarded, pending, in-progress, and in-pause segments proportionally in the WorkSidebar progress bar.
- Preserved resolved/total and percentage calculations.

## 2026-10-14

### #JANUS-FE-0033: Centralize Task Status Colors

**Work**: Refactor / Visual UI; Added semantic dark Task status foreground tokens to the Tailwind theme and reused each token for both status icons and titles.

- Centralized completed, discarded, pending, in-progress, and in-pause color values in `globals.css`.
- Removed duplicated icon/text color classes from the Journey Tree status mapping.

## 2026-10-14

### #JANUS-FE-0032: Map Journey Task Status Visuals

**Work**: Build / Visual UI; Added centralized Task status icon and readable color mapping for the Journey Tree.

- Represented completed, discarded, pending, in-progress, and in-pause states with distinct Ant Design icons and darker palette shades.
- Applied the same status mapping to both Task icons and Task titles while preserving existing Tree structure and behavior.

## 2026-10-14

### #JANUS-FE-0031: Calculate Real Journey Progress

**Work**: Plan / Build; Replaced temporary WorkSidebar progress values with pure visible-task progress calculation and reused the same rules for Journey and Folder counters.

- Counted only visible Tasks, treating completed and discarded Tasks as resolved while excluding Folders from totals.
- Added distinct completed and discarded progress-bar segments with automatic recalculation from loaded resource data.
- Added unit coverage for mixed states, hidden Tasks, empty Folders, direct Journey Tasks, and multi-Folder aggregation.

## 2026-10-14

### #JANUS-FE-0030: Reset Journey Tree Expansion

**Work**: Fix / Resource UI; Reset resource Tree expansion when the selected root changes so every newly opened Journey or Folder displays all available tree sections expanded.

- Initialized all folder accordions as open instead of only the first two.
- Keyed the rendered Tree by the resolved root resource UID so React Query data changes cannot retain the previous resource’s accordion state.

## 2026-10-14

### #JANUS-FE-0029: Sequence WorkSidebar Visibility Transition

**Work**: Fix / Interaction; Sequenced WorkSidebar opacity and width transitions so content appears after opening completes and disappears before the panel collapses.

- Delayed content fade-in until the panel width has expanded.
- Delayed panel collapse until content has fully faded out.
- Preserved the existing overlay positioning and collapse controls.

## 2026-10-14

### #JANUS-FE-0028: Reopen WorkSidebar on Resource Selection

**Work**: Fix / Interaction; Connected WorkSidebar visibility to the existing Zustand UI state so selecting a Journey, Folder, or Task always reopens the work content.

- Reused the existing Journey and Folder selection actions to set WorkSidebar visibility without duplicating selection state.
- Added task-row reopen behavior while preserving the current Journey Tree data and interactions.
- Kept collapse controls functional through the shared UI store.

## 2026-10-14

### #JANUS-FE-0027: Refine Journey WorkSidebar UI

**Work**: Build / Visual UI; Refined selected Journey presentation to match the Dashboard reference while preserving real resource data and existing query and selection boundaries.

- Added Journey-specific hero, temporary reference progress, section tabs, folder accordions, task rows, status indicators, and contextual action affordances.
- Kept folder/task names, counts, ordering, and task states sourced from the existing BFF resource response.
- Kept the generic WorkSidebar reusable and isolated the reference-specific UI in Journey workspace components.

## 2026-10-14

### #JANUS-FE-0026: Refactor WorkSidebar as Overlay

**Work**: Refactor / Layout; Removed the WorkSidebar’s desktop flex-column participation and made it a fixed overlay so opening or closing it cannot resize or reposition the active page.

- Kept the reusable children-based WorkSidebar composition and existing selected-resource content unchanged.
- Constrained the panel to the viewport and preserved independent internal scrolling and collapse transitions.
- Preserved the shared AppLayout integration and SideNav behavior while eliminating the layout-shifting `lg:relative` positioning.

## 2026-10-14

### #JANUS-FE-0025: Display Selected Journey in Work Sidebar

**Work**: Build / Resource Integration; Connected the selected-resource query to a real Journey header and the existing resource Tree inside the reusable WorkSidebar.

- Preserved the existing TanStack Query key, BFF resource endpoint, Tree mapping, task states, ordering, loading, and error handling.
- Exposed mapped root resource metadata from the existing response so the selected Journey name and description render without an additional request.
- Kept WorkSidebar presentation independent from Journey data fetching by composing the selected-resource content through children.

## 2026-10-14

### #JANUS-FE-0024: Add Reusable Work Sidebar Shell

**Work**: Plan / Build; Added a reusable collapsible Work Sidebar as a shared application-layout sibling and composed the existing selected-resource Tree into it without coupling the shell to Dashboard or Journey data fetching.

- Added `WorkSidebar`, `CollapseSidenav`, and `CollapseSidenavEffect` with separated visibility state and transition presentation.
- Composed selected Journey and Folder Tree content through Zustand selection state and the existing Tree query boundary.
- Kept the generic sidebar children-based so other sections can provide Server or Client Component content without direct imports into the shell.

## 2026-10-14

### #JANUS-FE-0023: Align Journey Card Icon

**Work**: Fix / Visual UI; Updated JourneyCard to use the existing Journey icon treatment from the Dashboard reference instead of the Folder icon.

## 2026-10-14

### #JANUS-FE-0022: Integrate Dashboard Journey Cards

**Work**: Plan / Build; Replaced Dashboard mock Journey summaries with real root Journeys, added a reusable clickable JourneyCard, and connected card selection to the existing Zustand navigation state.

- Added JourneyCard presentation for real Journey names and descriptions with an explicit clickable affordance.
- Omitted progress UI because the current Journey API does not provide progress data.
- Reused `useNavigationResourcesQuery` and `selectJourney`, allowing Dashboard and SideNav to share the existing TanStack Query cache and Journey Tree flow.

## 2026-10-09

### #JANUS-FE-0021: Integrate Resource Tree API

**Work**: Plan / Build; Replaced mock Journey Tree resolution with authenticated BFF resource retrieval for selected Journeys and Folders while preserving the existing Tree, loading, error, and task-state rendering behavior.

- Added resource-aware TanStack Query keys using both resource type and UID.
- Added Folder selection and reused the existing Tree query and presentation components for Folder and Journey payloads.
- Mapped structured BFF resources into the existing Tree contract without filtering task state or visibility.

## 2026-10-09

### #JANUS-FE-0020: Add BrandLogo Size System

**Work**: Plan / Build; Added a reusable BrandLogo size prop for responsive logo mark and wordmark sizing while preserving the existing normal appearance by default.

- Added `sm`, `md`, `nm`, `lg`, and `xl` size options.
- Kept `nm` as the default when `size` is omitted or undefined.
- Preserved compact and dark-background behavior for all sizes.

## 2026-10-09

### #JANUS-FE-0019: Support Empty Dashboard State

**Work**: Plan / Build; Updated the Dashboard mock workspace to represent a newly registered empty account and added a clear empty Journey state without changing the existing populated Journey cards or statistic layout.

- Set mocked Journeys, Folders, Tasks, and Journey summaries to empty collections.
- Set all Dashboard statistic values to zero while preserving the statistic cards and quick actions.
- Added an empty Journey prompt that renders instead of fictional Journey cards when no Journeys exist.

## 2026-10-09

### #JANUS-FE-0018: Integrate BFF Root Navigation Resources

**Work**: Plan / Build; Replaced the SideNav root-resource mock query with the authenticated BFF `GET /journeys/root` endpoint while preserving the existing navigation component, query, loading, error, and sorting behavior.

- Adapted the BFF root response into the existing `NavigationRootResources` shape used by SideNav.
- Supported both the requested `items` envelope and the currently deployed BFF `payload` envelope without changing the BFF.
- Kept nested Journey and Folder navigation outside this integration boundary.

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
