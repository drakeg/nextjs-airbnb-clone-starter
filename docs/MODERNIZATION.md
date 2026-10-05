# Modernization Plan

## Decision

The product will move to a unified Next.js architecture instead of continuing to
upgrade the generated Amplication/NestJS backend and the separate React Admin UI.

The existing `public/` application already contains the core product experience:
search, listing details, listing creation, my listings, trips, wishlist, maps, image
upload, and authentication UI. It becomes the primary application.

The legacy `server/` and `admin-ui/` directories remain temporarily as migration
references. They are no longer product CI gates and should not receive feature work.

## Target architecture

- Next.js App Router for pages, server rendering, route handlers, and server actions.
- PostgreSQL for persistent data.
- Prisma for type-safe database access and migrations.
- Auth.js-compatible authentication integrated directly into the Next.js app.
- Role-based authorization implemented in application code without generated
  `nest-access-control` wrappers.
- Admin/owner screens implemented inside the same Next.js application under an
  authenticated admin route.
- Docker Compose for local application + PostgreSQL development.
- Environment variables documented through a committed `.env.example`.
- Node.js 24 for local development, containers, and CI.

## Migration phases

### Phase 1 — Stabilize the product pipeline

- Build only the Next.js application in required CI.
- Preserve the legacy applications for reference.
- Keep the current user-facing site working while backend functionality is moved.

### Phase 2 — Move the data model

Move the existing User, Listing, Wishlist, and Trip models into `public/prisma`.
Create a modern initial migration and seed data. Add uniqueness and relationship
constraints that match product behavior.

### Phase 3 — Authentication and authorization

Replace the generated Nest authentication stack with application-native auth.
Support user and admin/owner roles. Centralize authorization checks for server
actions and route handlers.

### Phase 4 — Replace API calls

Replace Axios calls to the legacy server with Next.js server actions / route
handlers backed by Prisma. Migrate in this order:

1. listings and search
2. listing creation/editing
3. wishlist
4. trips/reservations
5. profile/account functionality

### Phase 5 — Unified admin

Replace React Admin with protected Next.js admin pages for users, listings,
reservations/trips, moderation, and operational reporting.

### Phase 6 — Retire legacy code

When feature parity is verified:

- remove `server/`
- remove `admin-ui/`
- remove legacy GraphQL/Apollo/Nest/Amplication dependencies and generated code
- remove legacy Docker images and documentation
- make the unified application the only deployable service

## Engineering rules

- Do not add new functionality to the legacy server or admin UI.
- New product features belong in `public/`.
- Prefer server components/actions where they simplify data access.
- Add tests with migrated functionality rather than preserving brittle generated
  tests solely for historical parity.
- Keep dependency versions coherent and commit lockfiles.
- Avoid major-version partial upgrades across coupled frameworks.
