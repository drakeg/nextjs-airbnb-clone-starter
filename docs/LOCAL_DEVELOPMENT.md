# Local Development

The modernized application runs as a single Next.js service with PostgreSQL.

## Docker Compose

1. Copy `.env.example` to `.env`.
2. Change the database password before using the stack outside local development.
3. Start the stack:

```bash
docker compose up --build
```

The application is available on `APP_PORT` (default `3000`). PostgreSQL is
published on `DB_PORT` (default `5432`).

The app container runs `prisma migrate deploy` before starting Next.js, so a new
local database is initialized automatically. The first migration also loads a
small demo catalog for development.

## Environment variables

- `APP_PORT`: host port mapped to the Next.js application.
- `DB_PORT`: host port mapped to PostgreSQL.
- `POSTGRES_DB`: database name.
- `POSTGRES_USER`: database user.
- `POSTGRES_PASSWORD`: database password.
- `DATABASE_URL`: Prisma/PostgreSQL connection string used by the application.

The container-to-container database hostname is `db`.

## Architecture

Roost is a single active Next.js application under `public/`, backed by
PostgreSQL and Prisma. The legacy server and separate admin application have
been retired.


## Prisma

The unified app uses Prisma ORM 7 with PostgreSQL.

Useful commands from `public/`:

```bash
yarn prisma:generate
yarn db:migrate
yarn db:deploy
```

For local commands outside Docker, set `DATABASE_URL` to a PostgreSQL URL that
is reachable from your host (usually using `localhost` and `DB_PORT`).
