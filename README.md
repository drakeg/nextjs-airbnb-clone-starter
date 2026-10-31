# Roost

Roost is a modern full-stack stay discovery, hosting, and reservation application built with Next.js, PostgreSQL, and Prisma.

The project began as a fork of an Airbnb clone starter, but the application has since been substantially rebuilt around a unified architecture and independent product identity.

## Current capabilities

- Browse and search active stays
- Listing details and availability
- User registration, login, sessions, and account management
- Host listing creation and editing
- Pause/reactivate listings
- Wishlists
- Reservation requests with host approval
- Guest trip history and cancellation
- Host reservation management
- Admin dashboard for users, listings, reservations, and moderation
- Docker Compose development environment
- PostgreSQL persistence with Prisma migrations
- Node.js 24 CI and container builds

## Architecture

Roost is moving toward a single deployable Next.js application:

- **Next.js App Router** for UI and server actions
- **PostgreSQL** for persistent storage
- **Prisma ORM** for database access and migrations
- **First-party authentication** using scrypt password hashing and server-side sessions
- **Docker Compose** for local application and database services

The legacy `server/` and `admin-ui/` directories remain temporarily as migration references and are not part of the active product architecture.

## Local development

See [docs/LOCAL_DEVELOPMENT.md](docs/LOCAL_DEVELOPMENT.md).

Quick start:

```bash
cp .env.example .env
docker compose up --build
```

By default, Roost is available at:

```
http://localhost:3000
```

## Modernization status

The active product path no longer depends on the legacy NestJS/Amplication backend or React Admin UI. See [docs/MODERNIZATION.md](docs/MODERNIZATION.md) for the migration plan and remaining cleanup work.

## Project name

The product is **Roost**. The repository may still temporarily use its historical clone-oriented GitHub slug until the repository itself is renamed.
