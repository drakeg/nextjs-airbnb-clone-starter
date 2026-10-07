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

## Environment variables

- `APP_PORT`: host port mapped to the Next.js application.
- `DB_PORT`: host port mapped to PostgreSQL.
- `POSTGRES_DB`: database name.
- `POSTGRES_USER`: database user.
- `POSTGRES_PASSWORD`: database password.
- `DATABASE_URL`: Prisma/PostgreSQL connection string used by the application.

The container-to-container database hostname is `db`.

## Architecture

New product functionality belongs in `public/`. The legacy `server/` and
`admin-ui/` trees remain temporarily for migration reference only.
