# Janus Journey

Janus Journey is an open-source application for organizing personal tasks and
structured Journeys.

It supports two complementary ways of working:

- **Tasks and Folders** for simple, standalone organization.
- **Journeys** for larger objectives that benefit from structure, progress
  tracking, history, and sharing.

A Journey can contain Folders and Tasks. It represents a structured path, not a
mandatory execution order. Users can organize work around their own goals,
pace, and way of learning.

## Product philosophy

Janus Journey is designed around a few principles:

- **Structure without rigidity**: Journeys provide context and organization
  without forcing users into a fixed sequence.
- **Progress with context**: Tasks, Folders, progress, and history belong to a
  larger objective when users choose to organize them as a Journey.
- **Personal ownership**: Users can manage simple tasks independently or build
  a more complete workspace when an objective requires it.
- **Clear boundaries**: Authentication, remote data, and interface state are
  separate concerns so the application can evolve without duplicating state.
- **Incremental loading**: Root navigation data is loaded first, while an
  individual Journey tree is loaded only when that Journey is expanded.

## Frontend status

This repository contains the Janus Journey frontend. The current application
includes:

- A public landing page and login experience.
- Google authentication through Better Auth.
- Protected `/dashboard` routes with a responsive authenticated application
  shell.
- Dashboard Home with overview metrics, Journey summaries, and quick actions.
- Responsive SideNav navigation with Journey accordions and mobile drawer
  behavior.
- Local mock data for the current Dashboard and navigation workspace.
- Authenticated Janus User lookup through the BFF using the Better Auth JWT
  subject as the User resource identifier.
- First-time Janus User provisioning only after authenticated User lookup returns
  `404`.

The current phase intentionally does **not** include:

- Direct frontend access to `ms-users`.
- Resolving a Janus User before Better Auth authentication completes.
- A database or persistent Journey domain data.
- A custom access-token issuer.
- Future resource detail views such as full Task or Folder pages.

The Better Auth JWT plugin and JWKS endpoint are enabled for development so the
future BFF token contract can be inspected. JWT signing keys are currently held
in process memory because no persistence architecture has been approved yet.
Production key persistence must be established before relying on this token
across frontend restarts or deployments.

## Technology stack

The frontend uses:

- **Node.js 22**
- **Next.js 16** with the App Router
- **React 19**
- **TypeScript**
- **Tailwind CSS 4** through `@tailwindcss/postcss`
- **Better Auth 1.7.7** with Google OAuth
- **TanStack React Query 5** for remote and persistent application data
- **Zustand 5** for shared UI state
- **Ant Design Icons** for interface icons
- **React Hot Toast** for notifications
- **Vitest** for tests

## Architecture and state ownership

The frontend is organized by responsibility:

```text
src/
├── app/         # App Router routes, layouts, and route composition
├── components/  # Reusable UI components, one component per file
├── hooks/       # Reusable React Query and UI hooks
├── layout/      # Page and authenticated application compositions
├── mock/        # Local development data
├── services/    # Authentication and data access boundaries
├── stores/      # Zustand UI state
├── types/       # Shared TypeScript domain and view types
├── assets/      # Local visual assets
└── utils/       # Shared utilities
```

### Better Auth

Better Auth owns authentication concerns:

- Google OAuth.
- The authenticated session and session cookie.
- Server-side session validation.
- Login and logout behavior.
- Access decisions for `/dashboard` routes.
- The official JWT plugin for the future Janus BFF token.
- The official JWKS endpoint at `/api/auth/jwks`.

Authentication is configured in `src/services/auth.ts`, the browser client is
in `src/services/authClient.ts`, and the Next.js handler is exposed at:

```text
/api/auth/[...all]
```

After Google authentication completes, the frontend obtains the BFF JWT with
`authClient.token()`. The token uses a five-minute expiration, the Better Auth
base URL as issuer, `janus-bff` as audience, and the Better Auth user ID as
subject. The frontend reads that `sub` only to address the existing BFF
`GET /users/{id}` resource route; the BFF remains responsible for validating the
JWT and does not trust an arbitrary frontend identity. A `200` User response
opens the dashboard, a `404` enters the provisioning flow, and other failures
render the authentication error state.

The token is not stored in Zustand, localStorage, or another browser storage
mechanism. A temporary Dashboard inspector decodes only the payload in memory
for development verification.

### TanStack React Query

React Query owns remote and persistent application data, including:

- Root Journeys, Folders, and Tasks used by the SideNav.
- Journey-specific trees.
- Dashboard Home summaries.

The current services return local mock data, but they preserve the asynchronous
and cacheable boundaries needed for future API integration.

### Zustand

Zustand is reserved for shared interface state, such as:

- Desktop SideNav collapse state.
- Selected and expanded Journey identifiers.
- Other temporary application UI preferences.

Authentication sessions, access tokens, Better Auth users, and Janus domain
data are not stored in Zustand.

## Requirements

Before installing the project, make sure the following tools are available:

- Node.js 22 or a compatible current Node.js release.
- npm.
- A Google Cloud OAuth client for local Google sign-in testing.

## Installation

Clone the repository and install the frontend dependencies:

```bash
git clone <repository-url>
cd janus-journey-fe
npm install
```

Create a local environment file from the example:

```bash
cp .env.example .env.local
```

On Windows PowerShell, the equivalent command is:

```powershell
Copy-Item .env.example .env.local
```

Fill in the values in `.env.local`:

```dotenv
BETTER_AUTH_SECRET=your-long-random-secret
BETTER_AUTH_URL=http://localhost:3000
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

Do not commit `.env.local` or any real credentials.

## Google OAuth setup

Create or select a project in Google Cloud Console, configure the OAuth consent
screen, and create an OAuth Client ID for a web application.

For local development, add the following authorized redirect URI to the Google
OAuth client:

```text
http://localhost:3000/api/auth/callback/google
```

The public login page starts the Google flow through Better Auth. After a
successful login, the user is redirected to `/dashboard/home`.

## Development

Start the Next.js development server:

```bash
npm run start
```

Open:

- Landing page: [http://localhost:3000](http://localhost:3000)
- Login: [http://localhost:3000/login](http://localhost:3000/login)
- Dashboard Home: [http://localhost:3000/dashboard/home](http://localhost:3000/dashboard/home)

The Dashboard is protected. Unauthenticated users are redirected to `/login`,
and authenticated users visiting `/login` are redirected to
`/dashboard/home`.

## Useful commands

```bash
# Run the development server
npm run start

# Run ESLint
npm run lint

# Run tests once
npm run test:run

# Run Vitest in watch mode
npm run test

# Check formatting
npm run prettier:check

# Format the repository
npm run prettier:fix

# Create a production build
npm run build

# Start the production server after building
npm run start:prod
```

## Production configuration

Set the same authentication environment variables in the deployment
environment, using the production application URL for `BETTER_AUTH_URL`:

```dotenv
BETTER_AUTH_URL=https://your-frontend-domain.example
```

Register the matching production callback URI with Google:

```text
https://your-frontend-domain.example/api/auth/callback/google
```

Run the production build with `npm run build`, then start it with
`npm run start:prod`.

## Contribution guidelines

When extending the frontend:

- Keep reusable components out of `src/app/`.
- Keep each React component in its own dedicated file and component folder.
- Keep Server Components as the default and add Client Components only when
  interaction or client-only state requires them.
- Use React Query for remote or persistent data.
- Use Zustand only for shared UI state.
- Preserve the separation between Better Auth, Janus domain data, and UI state.
- Use `authClient.token()` for the future BFF JWT; do not use the Google OAuth
  provider access token or the Better Auth session token as the BFF token.
- Prefer existing dependencies and established project conventions.

Meaningful completed changes are recorded in [`AIChangelog.md`](./AIChangelog.md).
