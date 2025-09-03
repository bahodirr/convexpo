# Convexpo — Convex + Expo + Better Auth

> Built on top of NativeWind and the Better T Stack.

This project was bootstrapped with [Better-T-Stack](https://github.com/AmanVarshney01/create-better-t-stack), a modern TypeScript stack combining Convex, Expo/React Native, Tailwind (NativeWind), Turborepo, and more. For architecture and deeper patterns, refer to the Better T Stack repo and docs.

## Features

- TypeScript — type safety and DX
- React Native + Expo — mobile development
- TailwindCSS (NativeWind) — utility-first styling
- Convex — reactive backend-as-a-service
- Better Auth — authentication primitives
- Biome — formatting and linting
- Turborepo — monorepo tooling

---

## Quick Start

Install dependencies:

```bash
pnpm install
```

Start development:

```bash
pnpm run dev
```

Open the app using Expo Go on your device or simulator. Continue below for one-time setup of Convex and environment variables.

---

## Setup (Convex, Expo envs, Resend)

These are the project’s specific setup steps. They complement the Better T Stack docs.

### 1) Convex login and project init (backend)

From `packages/backend`:

```bash
pnpm convex dev
```

Follow the prompts (login or create account, device code, create a new project, cloud deployment). This will create `packages/backend/.env.local` with:

```env
CONVEX_DEPLOYMENT=...
CONVEX_URL=https://<your-subdomain>.convex.cloud
```

Verify `CONVEX_URL` exists and is correct.

### 2) Expo env for Convex URL

Create the file: `apps/native/.env.development`

Add:

```env
EXPO_PUBLIC_CONVEX_URL=https://<your-subdomain>.convex.cloud
```

Notes:
- Use `.env.development` (no typos).
- Use exactly one `=`.
- Vars exposed to the client must be prefixed with `EXPO_PUBLIC_`.

### 3) Public site URL for Expo

Your Convex “cloud” URL looks like:

```
https://groovy-groovy-434.convex.cloud
```

Convert to the public “site” URL and add it to `apps/native/.env.development`:

```env
EXPO_PUBLIC_SITE_URL=https://groovy-groovy-434.convex.site
```

### 4) Better Auth secret (Convex env)

From `packages/backend`, set a secret in Convex env:

```bash
npx convex env set BETTER_AUTH_SECRET="$(openssl rand -base64 32)"
```

Do not put this in client envs.

### 5) Expo Go development URL (EXPO_MOBILE_URL)

Start the native app so Metro prints the `exp://` URL:

```bash
pnpm --filter @apps/native dev
# or
pnpm run dev
# Look for:
# Metro waiting on exp://192.168.1.20:8081
```

Set it in Convex (from `packages/backend`):

```bash
npx convex env set EXPO_MOBILE_URL="exp://192.168.1.20:8081"
```

Notes:
- Only for development in Expo Go.
- If using an Expo Dev Build or custom scheme, set `EXPO_MOBILE_URL` to that scheme (e.g., `myapp://`).

### 6) Resend setup

Create/get your Resend API key from https://resend.com.

Set it in Convex (from `packages/backend`):

```bash
npx convex env set RESEND_API_KEY="re_XXXXXXXXXXXXXXXXXXXXXXXXXXXX"
```

Optionally, if local tooling needs it in `.env.local` (not recommended for secrets you don’t need locally):

```env
# packages/backend/.env.local
RESEND_API_KEY=re_XXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

Avoid placing `RESEND_API_KEY` in client envs.

---

## Verify env files

- `packages/backend/.env.local`:
  ```env
  CONVEX_URL=https://<your-subdomain>.convex.cloud
  # Optional:
  RESEND_API_KEY=re_XXXXXXXXXXXXXXXXXXXXXXXXXXXX
  ```

- `apps/native/.env.development`:
  ```env
  EXPO_PUBLIC_CONVEX_URL=https://<your-subdomain>.convex.cloud
  EXPO_PUBLIC_SITE_URL=https://<your-subdomain>.convex.site
  ```

---

## Scripts

- `pnpm dev` — start all apps in dev mode
- `pnpm build` — build all apps
- `pnpm dev:native` — start Expo/Metro for the native app
- `pnpm dev:web` — start only the web app (if present)
- `pnpm dev:setup` — guided Convex setup flow
- `pnpm check-types` — typecheck
- `pnpm check` — Biome format + lint

---

## Project Structure

```text
convexpo/
├── apps/
│   └── native/        # React Native (Expo) app
└── packages/
    └── backend/       # Convex backend (functions, schema)
```

---

## Notes

- Built with Better T Stack. For deeper stack-level docs and patterns, see:
  - Better T Stack: https://github.com/AmanVarshney01/create-better-t-stack
  - Convex: https://docs.convex.dev
  - Expo: https://docs.expo.dev
  - NativeWind: https://www.nativewind.dev
  - shadcn/ui: https://ui.shadcn.com
  - Resend: https://resend.com

- This template uses NativeWind for compatibility with Expo Go. If you prefer, switch to Unistyles in a custom dev build.

- Common pitfalls:
  - File is `.env.development` (not `.env.devlopment`).
  - No trailing `=` in env values.
  - Client env vars must start with `EXPO_PUBLIC_`.
  - `EXPO_MOBILE_URL` changes with your LAN IP/port; update when it changes.
