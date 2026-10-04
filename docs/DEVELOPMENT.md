# Development Guide

## Repository layout

- `public/` - customer-facing Next.js application
- `admin-ui/` - React Admin application
- `server/` - NestJS API and Prisma data layer

## Runtime

The maintenance baseline uses Node.js 24.x in CI. If a component cannot run on the supported runtime, treat that as technical debt to fix rather than silently pinning an end-of-life runtime.

## Public frontend

```bash
cd public
npm install --global yarn@1.22.22
yarn install --frozen-lockfile
yarn dev
```

Production validation:

```bash
yarn build
```

## Admin UI

```bash
cd admin-ui
cp .env.example .env
npm install --legacy-peer-deps
npm start
```

Production validation:

```bash
npm run build
```

The legacy peer-dependency flag is currently required because this part of the application uses an older React/React-Admin dependency set. Removing that requirement is a modernization task.

## Server

```bash
cd server
cp .env.example .env
npm install --legacy-peer-deps
npm run prisma:generate
npm run build
npm test -- --runInBand
```

For PostgreSQL-backed local development:

```bash
docker compose up -d
```

## Environment configuration

Never commit a real `.env` file. Add new settings to the appropriate `.env.example` using safe placeholder values and document them.

## Dependency maintenance

Security updates should be prioritized, but major-version framework changes must be tested as migrations. Avoid grouping unrelated major framework upgrades into a single automated pull request.

## Definition of done

A change is complete when:

- relevant builds pass
- relevant automated tests pass
- configuration examples are updated
- user/developer documentation is updated
- no secrets or local-only files are committed
