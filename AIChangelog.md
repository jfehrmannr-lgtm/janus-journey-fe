## 2026-10-28

### #JANUS-FE-0128: Use Journey Resource Header Image

**Work**: Plan / Build; Updated the Journey workspace header to use the selected Journey resource `imgUrl` while preserving the existing static background fallback for creation and non-Journey resources.

- Kept the header layout, overlay, styling, and behavior unchanged.
- Did not modify `JourneyWorkspace`, forms, API contracts, or data fetching.

## 2026-10-27

### #JANUS-FE-0127: Use Compass Icon For Journeys

**Work**: Plan / Build; Replaced Journey UI icon usage with CompassOutlined while retaining AppstoreOutlined in the shared Icon component and unrelated icon examples.

- Updated Journey cards, dashboard tables, workspace headers, forms, and Journey selectors.
- Kept AppstoreOutlined available for generic application/grid usage.

## 2026-10-27

### #JANUS-FE-0126: Add Navigation Icon Options

**Work**: Plan / Build; Extended the shared Icon component with EnvironmentOutlined, GlobalOutlined, and CompassOutlined support.

- Registered all three Ant Design icons in the shared component map.
- Added their names to the typed `IconName` contract.

## 2026-10-27

### #JANUS-FE-0124: Supply Required Journey Background Image Paths

**Work**: Correct / Validate; Made Journey creation payload image paths required and supplied the existing local Journey background asset without adding selector UI.

## 2026-10-27

### #JANUS-FE-0123: Add Journey Background Image Contract

**Work**: Plan / Build / Validate; Added the optional `imgUrl` property to normalized Journey, API Journey, and Journey creation payload types without adding selector UI or changing the existing creation behavior.

- Navigation and creation-cache mappings preserve the value when returned by the BFF.

## 2026-10-26

### #JANUS-FE-0122: Correct Create Journey Server Action Integration

**Work**: Fix / Integrate / Validate; Moved the active Create Journey action into the parallel-route workspace, aligned its action-object wiring with Folder and Task workspaces, and switched it to the single-Journey BFF contract.

- Added the active `create-journey/actions.ts` Server Action using authenticated `POST /journeys/journeys` requests.
- Kept the legacy compose action isolated for the deprecated full-page workflow while separating single-resource and compose payload types.
- Passed `actions={{ createJourneyAction }}` from the active route into `JourneyWorkspace`.

## 2026-10-26

### #JANUS-FE-0121: Implement Create Journey Submission Workflow

**Work**: Plan / Build / Validate; Connected the Create Journey workspace to its Server Action, debounced validation, submission state, cache updates, and navigation to the created Journey.

- Passed the Server Action from the Dashboard route into `JourneyWorkspace` and coordinated the single-resource mutation through `useJourneyWorkspace`.
- Adapted the backend `ApiJourney` into the navigation cache shape and initialized empty Folder and Task collections for the new Journey resource tree.
- Preserved the existing Zustand draft and `isValid` state while adding duplicate-submit protection and success/error feedback.

## 2026-10-26

### #JANUS-FE-0120: Align Create Journey Validation Responsibilities

**Work**: Refactor / Validate; Moved Journey validation orchestration out of Zustand and the form component into the existing workspace coordination pattern while retaining shared draft, error, and validity state.

- Kept `workspaceFromStore.ts` focused on Journey draft and plain shared-state setters.
- Added `useJourneyWorkspace` for validation and submission-readiness coordination.
- Updated `CreateJourneyForm` to receive values, errors, and callbacks instead of directly orchestrating Zustand.
- Preserved the non-submitting workflow and existing Header synchronization.

## 2026-10-26

### #JANUS-FE-0119: Add Create Journey Form Validation

**Work**: Plan / Build / Validate; Added Journey name validation, store-backed validation errors, and submission-readiness state without connecting creation requests or mutation behavior.

- Added `formErrors` and `isValid` to the existing Create Journey form store.
- Validated the required Journey name on changes and blur, with inline Input feedback.
- Disabled the Create button until the draft is valid while preserving the current non-submitting workflow.
- Kept pending and submission error handling for the future mutation layer rather than duplicating it in Zustand.

## 2026-10-26

### #JANUS-FE-0118: Simplify Create Journey Draft Workflow

**Work**: Plan / Build / Validate; Reduced the Create Journey form and Zustand draft to Journey name and description, leaving Folder and Task creation for post-creation workflows.

- Removed Folder and Task creation sections and controls from the Create Journey form.
- Removed Folder and Task collections and actions from the Journey workspace draft store.
- Preserved controlled input synchronization, header name synchronization, and lifecycle reset behavior.

## 2026-10-26

### #JANUS-FE-0117: Consolidate Journey Workspace Form State

**Work**: Refactor / Rename / Validate; Moved Create Journey draft state into the shared workspace form store and renamed its state and actions to match the existing Folder and Task store conventions.

- Added `useCreateJourneyForm` and `createJourneyForm` to `workspaceFromStore.ts`.
- Renamed Journey field actions to `setJourneyName`, `setJourneyDescription`, `setJourneyFolders`, and `setJourneyTasks`.
- Renamed reset behavior to `setResetJourney` and updated form, header, and lifecycle consumers.
- Removed the standalone `createJourneyDraftStore.ts` file.

## 2026-10-24

### #JANUS-FE-0115: Route Dashboard Journey Creation Button

**Work**: Fix / Validate / Dashboard Navigation; Updated the Dashboard `+ Journey` action to open the new Create Journey workspace route.

- Changed the navigation target from the legacy creation route to `/dashboard/home/create-journey`.
- Preserved all other Dashboard actions and Journey functionality.

## 2026-10-24

### #JANUS-FE-0114: Add UI-Only Create Journey Workspace

**Work**: Plan / Build / Validate; Added the `/dashboard/home/create-journey` parallel route, creation-mode `DetailedWorkspace` support, and a non-submitting Journey creation form without state or backend integration.

- Added a discriminated `view`/`create` workspace contract while preserving existing resource views.
- Added a create-aware header and content/actions composition without fabricating a resource.
- Added contract-aligned name, description, Folder, and Task UI with disabled creation controls.

## 2026-10-24

### #JANUS-FE-0113: Implement Journey Bulk Delete

**Work**: Plan / Build / Validate; Connected Journey resource selection to the existing Folder and Task bulk-delete BFF routes through a React Query mutation and cache-only success update.

- Split selected IDs by resource type from the cached Journey tree before invoking the Server Action.
- Removed deleted Folders and Tasks from the Journey cache with `setQueryData`, without invalidation, refetching, optimistic updates, or rollback.
- Preserved selection and cached data when deletion fails, clearing selection only after successful deletion.

## 2026-10-23

### #JANUS-FE-0109: Implement Portal Dropdown Component

**Work**: Plan / Build / Validate; Implemented a reusable Zustand-coordinated Dropdown with Portal rendering, viewport-aware positioning, independent transition lifecycle, dismissal behavior, and Playground coverage.

- Added `Dropdown` and `DropdownEffect` components with Server Component-compatible JSX children.
- Added outside-click and Escape dismissal, one-active-dropdown coordination, optional close callbacks, placement, width, and max-height support.
- Registered a practical Dropdown Playground using existing Button and Icon components.

## 2026-10-23

### #JANUS-FE-0108: Use Shared Buttons in Journey Content

**Work**: Refactor / Journey UI; Replaced the Journey resource-selection native buttons with the existing shared Button component while preserving their actions and styling.

- Delete All and Cancel now use the reusable Button API.
- Resource selection behavior and layout remain unchanged.

## 2026-10-23

### #JANUS-FE-0107: Track Active Dropdown by ID

**Work**: Refactor / UI State; Added shared active Dropdown ID tracking through Zustand while preserving the existing local animation, focus, content composition, and styling behavior.

- Dropdowns now open and close through `activeDropdownId` and expose their stable ID to render-function content.
- Nested Client Components can close their associated Dropdown by ID without introducing a content registry or changing Server Component-compatible JSX composition.

## 2026-10-23

### #JANUS-FE-0106: Add InputCheck Color Support

**Work**: Build / Validate / UI; Added typed primary and danger color support to InputCheck using the existing Tailwind theme tokens.

- InputCheck defaults to the primary color for existing callers.
- Resource-selection checkboxes now use the danger color without changing selection behavior.

## 2026-10-23

### #JANUS-FE-0105: Restrict Selection to Checkbox Controls

**Work**: Fix / Resource Selection UI; Restricted Folder and Task selection changes to the shared InputCheck controls and restored normal Folder collapse interaction.

- Clicking resource content no longer changes `selectedResource` or produces stale checkbox feedback.
- Added spacing around selection controls while preserving explicit and inherited checked states.

## 2026-10-23

### #JANUS-FE-0104: Reuse InputCheck for Resource Selection

**Work**: Refactor / Resource Selection UI; Replaced custom selection indicators with the existing InputCheck component while preserving selection state, handlers, and inherited descendant behavior.

- Folder and Task selection controls now use the shared accessible checkbox styling.
- Implicitly selected Tasks remain checked and disabled; normal mode and selection logic remain unchanged.

## 2026-10-23

### #JANUS-FE-0103: Add Resource Selection Checkboxes

**Work**: Build / Validate / UI; Added selection-mode checkbox feedback to existing Folder and Task resource rows without changing Zustand state or selection handlers.

- Explicitly selected Folders and Tasks render checked indicators.
- Tasks inherited from a selected Folder render checked and disabled indicators while normal mode remains unchanged.

## 2026-10-23

### #JANUS-FE-0102: Move Journey Actions into JourneyOptions

**Work**: Refactor / Journey Workspace; Moved Select Resources behavior and Zustand integration into the JourneyOptions action component while keeping the header responsible only for dropdown composition.

- Replaced the selection callback prop with the dropdown-only `onClose` callback.
- Preserved the existing Select Resources behavior and UI without changing unrelated workspace interactions.

## 2026-10-23

### #JANUS-FE-0101: Add Journey Resource Selection Mode

**Work**: Plan / Build / Validate; Added temporary Zustand-backed resource selection for Journey Folders and Tasks with inherited visual selection and MiniNav cancellation/debug actions.

- Connected the Journey header menu's Select Resources action to selection mode and preserved normal navigation, collapse, creation, and action behavior outside that mode.
- Stored only explicitly selected IDs, removed descendant Task IDs when selecting a Folder, and prevented implicit descendant deselection while an ancestor Folder remains selected.
- Added Delete All debug logging and Cancel reset behavior without integrating deletion requests or bulk-delete functionality.

## 2026-10-22

### #JANUS-FE-0100: Extract Detailed Workspace Header

**Work**: Refactor / Journey Workspace; Extracted the detailed resource header and Journey options trigger into `DetailedHeaderWorkspace`.

- Kept resource-specific header content, background styling, and Journey Options integration unchanged.
- Reduced `DetailedWorkspace` to progress rendering and workspace content composition without altering folder or task behavior.

## 2026-10-22

### #JANUS-FE-0099: Use Shared Buttons in Journey Options

**Work**: Refactor / Journey UI; Replaced Journey Options action markup with the shared Button component.

- Preserved action labels, icons, alignment, destructive styling, and non-functional behavior.
- Reused the existing Button focus, sizing, and interaction conventions without changing Journey Options logic.

## 2026-10-22

### #JANUS-FE-0098: Integrate Journey Options Header Menu

**Work**: Integrate / Journey Workspace; Connected the existing Journey header overflow control to the reusable Journey Options interface.

- Reused the shared Dropdown and JourneyOptions components with the selected Journey name.
- Preserved the existing header placement and left folder/task overflow controls unchanged.
- Kept all Journey Options actions presentational and non-functional.

## 2026-10-22

### #JANUS-FE-0097: Add Journey Options UI

**Work**: Build / Journey UI; Added a presentational Journey Options panel for an existing Journey.

- Added Journey name context, overflow control, Edit, Select Resources, Share, and separated destructive Delete actions.
- Reused shared Button and Icon components with existing surface, border, focus, and destructive design tokens.
- Kept all actions non-functional and introduced no navigation, API integration, dialogs, or state mutations.

## 2026-10-22

### #JANUS-FE-0096: Extract Dropdown Types

**Work**: Refactor / Shared UI; Moved Dropdown public and positioning types into the dedicated `Dropdown.type.ts` module.

- Preserved the existing Dropdown runtime behavior and public type exports.
- Kept component rendering and interaction logic focused on composition while centralizing its TypeScript contracts.

## 2026-10-22

### #JANUS-FE-0095: Refine Dropdown Behavior

**Work**: Refactor / Shared UI; Simplified Dropdown visibility and positioning state while improving trigger semantics and focus behavior.

- Removed redundant rendered-state tracking and unused position data.
- Isolated viewport collision calculations, preserved portal positioning, and prevented focus from changing during scroll or resize.
- Avoided nested interactive triggers by preserving custom Button elements as the interactive control and using a native fallback for non-element content.
- Kept animation classes in the global styling layer and preserved outside-click, Escape, placement, sizing, and programmatic close behavior.

## 2026-10-22

### #JANUS-FE-0094: Add Reusable Dropdown Component

**Work**: Build / Shared UI; Added a portal-based configurable Dropdown with viewport-aware placement, keyboard interaction, focus handling, animation, and interactive playground coverage.

- Supported ReactNode triggers and content, configurable placement, width, maximum height, outside/Escape dismissal, and render-content programmatic closing.
- Reused the existing SSR-safe Portal infrastructure and preserved content-agnostic floating-container responsibilities.
- Registered a dedicated Dropdown playground with placement, sizing, custom content, programmatic closing, and viewport-boundary examples.

## 2026-10-22

### #JANUS-FE-0093: Add Task State Select Icons

**Work**: Polish / Task Forms; Added shared state icons to Task state `SelectOption` entries.

- Applied consistent pending, in-progress, paused, completed, and discarded icons to both controlled Task form variants.
- Preserved the existing state values, labels, change handlers, and SelectOption behavior.

## 2026-10-22

### #JANUS-FE-0092: Implement Bulk Task Workspaces

**Work**: Integrate / Task Workspace; Connected Journey and Folder Task workspaces to the authenticated BFF bulk Task action flow.

- Added route-local authenticated Task bulk Server Actions using the verified `POST /journeys/tasks/bulk` contract.
- Organized both workspaces into container, actions, body, and custom hook components while preserving existing validation, styling, and cleanup behavior.
- Added mutation loading/error handling, parent-specific `setQueryData` cache updates, and success navigation without invalidation or refetching.

## 2026-10-22

### #JANUS-FE-0091: Mutate and Navigate Folder Creation

**Work**: Integrate / Folder Workspace; Replaced manual bulk Folder submission state handling with TanStack Query mutation lifecycle management.

- Added loading, success, and error toast handling with error logging while preserving pending Folder forms on failure.
- Invalidated the parent Journey resource-tree query after successful persistence and navigated to the encoded Journey detail route.
- Used mutation pending state to prevent duplicate submissions without changing the Zustand store contract or lifecycle cleanup ownership.

## 2026-10-22

### #JANUS-FE-0090: Extract Folder Workspace Hook

**Work**: Refactor / Folder Workspace; Moved Folder form interaction, validation, pending resource management, submission, and notifications into the dedicated `useFolderWorkspace` hook.

- Kept the Folder workspace container responsible for composition and lifecycle cleanup.
- Preserved the existing 500ms validation debounce, bulk payload, Server Action call, toast behavior, and Zustand reset semantics.
- Exposed a stable cleanup callback so the container effect retains its existing `returnHref` dependency behavior without moving lifecycle logic into the hook.

## 2026-10-22

### #JANUS-FE-0089: Split Folder Workspace Components

**Work**: Refactor / Folder Workspace; Grouped the Folder workspace into focused container, actions, and body components without changing its creation workflow.

- Kept Zustand access, validation debounce, lifecycle cleanup, pending Folder management, payload construction, Server Action invocation, and notifications in `FolderWorkspace`.
- Extracted the existing header controls into `FolderWorkspaceActions` and pending/persisted Folder rendering into `FolderWorkspaceBody`.
- Updated the Journey Folder creation view to use the new component path while preserving existing behavior and styling.

## 2026-10-21

### #JANUS-FE-0088: Add Journey Folder Action

**Work**: Build / Journey Workspace; Added the existing reusable Create Folder action immediately before the Journey Folder list.

- Reused `CreateResourceButton` with the Journey resource context.
- Preserved Folder rendering, route behavior, hydration, and existing layout structure.

## 2026-10-21

### #JANUS-FE-0087: Simplify Create Task Actions

**Work**: Refactor / Workspace UI; Reused `CreateResourceButton` for Folder and Journey Task actions while preserving parent-owned navigation.

- Removed duplicated custom Create Task link markup from `FolderItem` and `RootTasks`.
- Added an optional parent-supplied click handler to `CreateResourceButton` without moving route construction into it.
- Preserved encoded destinations and `scroll: false` behavior through parent-owned router navigation.

## 2026-10-21

### #JANUS-FE-0086: Build Task Workspace UI

**Work**: Build / Workspace UI; Added the shared Task workspace shell, local Add Task toggle state, and ordered sibling Task rendering.

- Reused the Folder workspace spacing, controls, header, disabled Save Changes action, and return navigation patterns.
- Rendered each provided Task through `TaskItem` without filtering or reordering.
- Deferred `CreateTaskForm` rendering because its required Folder and Journey identifiers are unavailable in the parent-independent component contract.

## 2026-10-21

### #JANUS-FE-0085: Extract Task Workspace Contract

**Work**: Refactor / Workspace UI; Extracted the Journey Task route’s navigation into a reusable `TaskWorkspace` component.

- Kept Journey cache resolution and missing-Journey handling in `CreateTaskView`.
- Passed the resolved Journey sibling Tasks directly to the context-independent workspace component.
- Preserved the existing cancel link styling, destination, and non-scrolling navigation.

## 2026-10-21

### #JANUS-FE-0084: Navigate Journey Root Task Creation

**Work**: Integrate / Journey Workspace; Connected the Journey root-task Add Task action to the existing parallel create-task route.

- Passed the encoded Journey create-task destination from `JourneyPageContent` to `RootTasks`.
- Rendered the existing creation link with Next.js navigation and preserved non-scrolling navigation behavior.

## 2026-10-21

### #JANUS-FE-0083: Add Journey Task Route

**Work**: Build / Journey Routing; Added the Journey-level parallel route for the initial Task creation navigation state.

- Added the `@workSidebar` `journey/[journeyId]/create-task` page and passed its route parameter to `CreateTaskView`.
- Added the minimal cancel navigation view without introducing form, persistence, or data-fetching behavior.

## 2026-10-21

### #JANUS-FE-0082: Derive Folder Task Form Identifiers

**Work**: Refactor / Workspace UI; Simplified `FolderTaskWorkspace` props by using identifiers already present on the resolved Folder.

- Removed `folderId` and `journeyId` from the reusable workspace component contract.
- Preserved the embedded `CreateTaskForm` behavior by passing the Folder UID and parent UID from the Folder value.

## 2026-10-21

### #JANUS-FE-0081: Extract Folder Task Workspace

**Work**: Refactor / Workspace UI; Extracted the Folder task creation presentation and interactions into a reusable workspace component.

- Kept Journey cache resolution, Folder lookup, and missing-resource handling in the route-level view.
- Preserved the existing Folder card, local form toggle, Save Changes placeholder, and cancel navigation behavior.
- Kept the extracted workspace independent of React Query and Journey resource resolution by receiving its Folder and navigation/form values through props.

## 2026-10-20

### #JANUS-FE-0080: Toggle Contextual Task Form

**Work**: Build / Journey Workspace; Added an inline Add Task toggle for the contextual Folder creation view.

- Replaced the always-visible embedded form with a shared Button-controlled form that can be opened and cancelled locally.
- Preserved the Folder header, existing TaskItem rows, route navigation, and draft state while the form remains open.
- Updated the Workspace playground with populated and empty Folder toggle examples.
- Kept task creation persistence and batch creation deferred.

## 2026-10-20

### #JANUS-FE-0079: Add Contextual Folder Task Creation

**Work**: Build / Journey Workspace; Composed the local Task creation form inside the selected Folder alongside its existing Tasks.

- Added a Journey-specific CreateTaskView with an action bar, hydrated Folder lookup, total task count, inline form, and existing TaskItem rows.
- Extended FolderItem with composition support and an optional total-only count mode while preserving its normal workspace behavior.
- Added standalone, populated-folder, and empty-folder CreateTaskForm playground examples.
- Kept persistence and Save Changes intentionally unavailable.

## 2026-10-20

### #JANUS-FE-0078: Build Folder Task Creation Form

**Work**: Build / Journey Workspace; Replaced the folder Create Task placeholder with a hydrated, local-only task form.

- Resolved and displayed the selected Folder name from the existing hydrated Journey cache without adding a request.
- Added controlled name, description, state, and visibility fields with required-name validation and accessible invalid feedback.
- Added Cancel navigation and an explicitly unavailable Save action until task persistence is implemented.
- Preserved the persistent Journey header, nested route structure, hydration, and existing not-found behavior.

## 2026-10-20

### #JANUS-FE-0075: Collapse Empty Workspace Folders

**Work**: Polish / Workspace UI; Updated FolderItem’s initial expansion behavior for empty folders.

- Populated folders remain expanded by default, while folders without tasks start collapsed.
- Preserved manual expansion and collapse behavior for every folder.

## 2026-10-20

### #JANUS-FE-0074: Render Workspace Task States

**Work**: Integrate / Workspace UI; Replaced the Journey workspace’s duplicated folder and task markup with the isolated workspace components.

- TaskItem now renders each production task icon from its real API `state`, including completed, discarded, in-progress, paused, and pending states.
- Preserved the existing Journey query cache, folder task navigation URL, persistent workspace header, and root-task presentation.

## 2026-10-20

### #JANUS-FE-0073: Show Folders Expanded by Default

**Work**: Polish / Component Playground; Demonstrated FolderItem’s default expanded state without requiring callers to pass an explicit flag.

- Kept the optional initial-state prop available for isolated component evaluation.

## 2026-10-20

### #JANUS-FE-0072: Label Workspace Task States

**Work**: Polish / Component Playground; Added human-readable labels for the isolated TaskItem state examples.

- Replaced raw state identifiers with labels such as “In progress” and “Pending” in the workspace component playground.

## 2026-10-20

### #JANUS-FE-0071: Add Isolated Workspace Component Playground

**Work**: Build / Component Playground; Added standalone FolderItem, RootTasks, and TaskItem components for visual evaluation without integrating them into the production WorkspaceSidebar.

- Reused the existing folder, task, state-icon, progress, expansion, and action-control presentation.
- Added mock populated, empty, root-task, and task-state examples to the component playground.
- Preserved the existing WorkspaceSidebar implementation, routes, fetching, hydration, and navigation behavior.

## 2026-10-20

### #JANUS-FE-0070: Restore Workspace Sidebar Visuals

**Work**: Build / WorkSidebar UI; Restored the reference workspace presentation while keeping the current parallel-route and persistent-header architecture.

- Added the image-backed workspace header, progress summary, section navigation, folder cards, task rows, and contextual creation controls.
- Styled the nested task creation view beneath the persistent header and preserved existing route navigation, loading boundaries, and placeholder behavior.

## 2026-10-19

### #JANUS-FE-0069: Add WorkSidebar Fullscreen Width Toggle

**Work**: Build / WorkSidebar UI; Added a local fullscreen-width toggle to the existing animated `CollapseSidenavEffect`.

- Preserved the default sidebar width, collapse control, route-driven visibility, and transition behavior.
- Added accessible expand and restore labels with shared fullscreen icons without introducing global state.

## 2026-10-19

### #JANUS-FE-0068: Add Create Resource Button Playground

**Work**: Build / Development Tooling; Registered a focused component playground for contextual Folder and Task creation entry points.

- Added examples for Journey-owned Folders, Folder-owned Tasks, and root Tasks under Journey and Folder parents.
- Preserved the presentational-only creation scope while making parent context combinations easy to review.

## 2026-10-19

### #JANUS-FE-0067: Add Journey Workspace Creation Entry Points

**Work**: Build / Journey Workspace; Added persistent Folder and Task creation entry points with explicit parent resource context without implementing forms, routes, mutations, or new state.

- Added a reusable contextual creation button for Journey-owned Folders, Folder-owned Tasks, and root-level Journey/Folder Tasks.
- Kept creation actions visible for empty lists and preserved existing folder expansion, task ordering, and resource rendering.

## 2026-10-19

### #JANUS-FE-0066: Open WorkSidebar During Route Loading

**Work**: Fix / WorkSidebar Navigation; Started the existing WorkSidebar animation as soon as the contextual parallel route provides its loading content, without adding global or temporary navigation state.

- Combined the active contextual pathname with the parallel slot content when deriving sidebar visibility.
- Preserved route-driven navigation, loading skeletons, hydration, browser history behavior, and existing animation components.

## 2026-10-19

### #JANUS-FE-0065: Mirror WorkSidebar Workspace Loading

**Work**: Build / WorkSidebar UI; Redesigned the Journey and Folder loading skeletons to match the rendered workspace structure without changing data fetching or hydration behavior.

- Added workspace-shaped header, progress, tabs, folder, and task skeleton regions with resource-specific Journey progress handling.
- Added route-level loading states for dynamic Journey and Folder sidebar routes while preserving the existing query loading fallback and sidebar animations.

## 2026-10-19

### #JANUS-FE-0064: Handle Missing WorkSidebar Resources

**Work**: Build / Dashboard Navigation; Added a reusable missing-resource state for server-resolved Journey and Folder routes without conflating 404 responses with authentication, authorization, or server failures.

- Added `ResourceNotFound` to the existing WorkSidebar content flow while preserving the Dashboard Home and sidebar shell.
- Preserved server BFF HTTP status codes and rendered the missing-resource state only for HTTP 404 responses.
- Kept non-404 errors on their existing error path and preserved authentication redirects.

## 2026-10-19

### #JANUS-FE-0063: Preserve Dashboard Scroll During Contextual Navigation

**Work**: Fix / Dashboard Navigation; Applied non-scrolling navigation to contextual Journey and Folder selection and WorkSidebar closing without changing unrelated route behavior.

- Added `scroll: false` to contextual router navigation and `scroll={false}` to Journey, Folder, and Dashboard Home links that can close the WorkSidebar.
- Preserved existing creation, authentication, logout, and other non-contextual navigation behavior.

## 2026-10-19

### #JANUS-FE-0062: Route-Driven WorkSidebar Navigation

**Work**: Refactor / Dashboard Navigation; Replaced Zustand-based contextual resource selection and WorkSidebar visibility with Next.js route-driven navigation and parallel route slots.

- Added Journey and Folder dynamic routes that keep Dashboard Home visible while rendering hydrated resource trees inside the persistent WorkSidebar.
- Preserved the WorkSidebar, CollapseSidenav, and CollapseSidenavEffect composition while deriving visibility and closing behavior from the active URL.
- Removed obsolete resource-selection, sidebar-visibility, and discontinued Journey expansion state from the shared UI store while preserving SideNav collapse state.
- Added shared navigation query keys, server-side TanStack Query prefetching, hydration boundaries, route parsing utilities, and route coverage tests.

## 2026-10-19

### #JANUS-FE-0061: Align Task Domain State Property

**Work**: Fix / Task Contracts; Replaced the Frontend Task `status` domain property with the canonical `state` property and removed the unnecessary API state transformation.

- Renamed the Task state type and updated Task creation, navigation, progress, dashboard, tree, and table consumers.
- Preserved canonical API Task states without aliases or fallback mappings while leaving legitimate HTTP status handling unchanged.

## 2026-10-19

### #JANUS-FE-0060: Standardize Completed Task State

**Work**: Fix / Task Contracts; Updated frontend Task API types and payload mapping to use `completed` as the only completed Task state.

- Removed the frontend conversion from `completed` to the invalid `complete` API state.
- Updated API navigation typing, payload tests, and existing historical contract wording.

## 2026-10-15

### #JANUS-FE-0059: Default Dashboard Progress To Zero

**Work**: Fix / Dashboard; Standardized Dashboard resource progress rendering so unavailable progress data uses the reusable ProgressBar at 0%.

- Rendered ProgressBar consistently in Dashboard Table and Cards views.
- Defaulted missing or unavailable progress calculations to 0% without inventing task totals.
- Preserved existing progress calculations and resource selection behavior.

## 2026-10-15

### #JANUS-FE-0058: Reuse Button In Dashboard Table Controls

**Work**: Refactor / Dashboard; Replaced DashboardTable’s resource selector and view-toggle controls with the shared Button component.

- Reused Button for Journeys/Folders/Tasks tabs and Table/Cards view controls.
- Preserved accessible selection attributes, counts, click behavior, and responsive layout.
- Kept custom resource cards and table rows as native elements because their composed content and table semantics are not compatible with the current Button API.

## 2026-10-15

### #JANUS-FE-0057: Split Dashboard Home Sections

**Work**: Refactor / Dashboard; Separated Dashboard Home into focused header, Continue with, and resource workspace components while preserving existing behavior.

- Added dedicated `DashboardHead`, `DashboardContinue`, and `DashboardTable` components.
- Kept Dashboard state orchestration, resource filtering, Journey sorting, and WorkSidebar selection in `DashboardHome` and component callbacks.
- Preserved the mobile-first responsive layout, existing reusable components, creation behavior, and root-resource data flow.

## 2026-10-15

### #JANUS-FE-0056: Refactor Dashboard Home

**Work**: Refactor / Dashboard; Reworked Dashboard Home into a mobile-first resource workspace based on the Dashboard V2 visual reference while preserving existing authentication, SideNav, WorkSidebar, and navigation behavior.

- Added a responsive greeting header with Journey navigation and display-only Folder and Task creation actions.
- Added Continue with JourneyCards showing up to three most recently modified Journeys that are below 100% progress.
- Preserved root resource progress and modification metadata from the existing API mapping for Dashboard presentation.
- Added My Journeys Journeys/Folders/Tasks selectors, Table/Cards views, Filters placeholder, internal scrolling, and responsive touch-friendly layouts.
- Connected Journey and Folder Dashboard selections to the existing WorkSidebar state while keeping Tasks display-only as agreed.
- Reused Button, JourneyCard, ProgressBar, Icon, existing resource contracts, and progress utilities without adding API requests or BFF changes.

## 2026-10-15

### #JANUS-FE-0055: Remove Button Playground Auto Focus

**Work**: Fix / Development Tooling; Removed the automatic focus behavior that caused the Button playground to scroll down when selected.

- Removed the `autoFocus` prop from the Button playground example.
- Preserved the Button component and manual keyboard-focus demonstration.

## 2026-10-15

### #JANUS-FE-0053: Add Reusable ProgressBar

**Work**: Build / Components and Development Tooling; Added a presentational ProgressBar component and isolated playground registration without changing existing application pages or production components.

- Added typed size, percentage-position, semantic-color, progress, and class-name props with defaults of `md`, `right`, and `primary`.
- Added finite-value normalization, 0–100 clamping, whole-number percentage labels, responsive track sizing, and semantic progressbar attributes.
- Added explicit theme color and thickness mappings without dynamically generated Tailwind classes.
- Added ProgressBar playground examples for all supported sizes, percentage positions, colors, values, normalization, interaction, and responsive containers.

## 2026-10-15

### #JANUS-FE-0052: Support JourneyCard Resource Icons

**Work**: Refactor / Components; Added a typed resource-type prop to JourneyCard so the shared card can display Journey, Folder, or Task icons without changing its default Journey behavior.

- Added `type?: ResourceType` with a default of `journey`.
- Mapped Journey, Folder, and Task values to existing shared icons.
- Added resource-icon examples to the JourneyCard playground.

## 2026-10-15

### #JANUS-FE-0050: Add Icon Playground

**Work**: Build / Development Tooling; Added an isolated Icon playground and registered it in the existing component testing environment.

- Added visual examples for every supported Icon name.
- Added examples for outlined, filled, and two-tone types, multiple sizes, theme colors, and combined configurations.
- Reused the existing Icon component and preserved all production Icon behavior.

## 2026-10-15

### #JANUS-FE-0051: Organize Playground Components By Folder

**Work**: Refactor / Development Tooling; Moved each registered component playground into its own folder without changing playground behavior.

- Added dedicated `ButtonPlayground`, `JourneyCardPlayground`, and `IconPlayground` folders.
- Updated the shared registry imports to use the new component-specific paths.
- Preserved the existing component playground shell and registration mechanism.

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
- Separated BFF fields such as `parent`, nullable descriptions, optional order indexes, and `completed` task state from normalized frontend fields such as `parentUid`, non-null descriptions, numeric ordering, and `completed` status.
- Centralized BFF-to-application resource mapping and removed mock-only resource and dashboard types, JSON fixtures, and imports.
- Derived Dashboard Home metrics from normalized root resources while preserving the existing React Query keys, server hydration, and dashboard presentation.
- Updated Create Journey payload typing to preserve the frontend `completed` state in the BFF contract.

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

## 2026-10-27

### #JANUS-FE-0125: Restore Task Status Icon Colors

**Work**: Plan / Build; Restored the existing semantic Task status foreground tokens on status selector icons without changing form behavior or task state handling.

- Applied the pending, in-progress, paused, completed, and discarded colors to the Task form selectors.
- Applied the existing pending, in-progress, and completed colors to the corresponding Input playground selectors.
- Reused the established `task-*` theme tokens already used by TaskItem and JourneyTree.

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

## 2026-10-23

### #JANUS-FE-0110: Fix Dropdown Floating Position

**Work**: Fix / Validate / Dropdown UI; Applied fixed positioning to the portal-mounted dropdown surface so calculated trigger-relative coordinates are respected.

- Dropdown menus now render beside their triggers instead of falling into normal document flow at the bottom-left of the viewport.

## 2026-10-23

### #JANUS-FE-0111: Correct Dropdown Placement Fallbacks

**Work**: Fix / Positioning / Validate; Unified Dropdown viewport calculations so preferred placements, fallbacks, alignment, scrolling, and boundary clamping use the Portal’s fixed viewport coordinate system consistently.

- Top placements now fall back below when needed, and bottom placements fall back above when appropriate.
- Added robust horizontal clamping, viewport-constrained widths, resize observation, and fixed positioning for scroll and resize updates.

## 2026-10-24

### #JANUS-FE-0112: Anchor Dropdowns to Rendered Triggers

**Work**: Fix / Positioning / Validate; Updated Dropdown measurements to use the visible rendered trigger element instead of relying on the layout wrapper’s coordinates.

- Absolutely positioned and relatively positioned triggers now anchor menus from their actual viewport bounds.
- Preserved wrapper-based outside-click handling, Portal rendering, placement fallback, and viewport clamping.

## 2026-10-26

### #JANUS-FE-0116: Add Create Journey Draft State

**Work**: Plan / Build / Validate; Added Zustand-backed Create Journey draft fields, synchronized the form and creation header, and reset the draft on workspace unmount without adding submission behavior.

- Added contract-aligned `name`, `description`, `folders`, and `tasks` draft state with field actions and reset behavior.
- Connected the existing form inputs to the draft store while preserving the current UI and disabled controls.
- Added create-workspace lifecycle cleanup so drafts do not persist after leaving the route.
- Updated the create-mode header to display the draft name with a `Create Journey` fallback.
