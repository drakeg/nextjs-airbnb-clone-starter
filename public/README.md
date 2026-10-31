# Roost web application

This directory contains the active Roost Next.js application.

## Development

From the repository root, the recommended local workflow is:

```bash
cp .env.example .env
docker compose up --build
```

For direct development from this directory:

```bash
yarn install --frozen-lockfile
yarn dev
```

A reachable PostgreSQL database and `DATABASE_URL` are required for database-backed pages.

## Useful commands

```bash
yarn dev
yarn build
yarn start
yarn prisma:generate
yarn db:migrate
yarn db:deploy
```

See `../docs/LOCAL_DEVELOPMENT.md` and `../docs/MODERNIZATION.md` for architecture and environment details.
