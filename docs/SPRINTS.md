# Sprint Process

This project uses lightweight iterative sprints so maintenance and feature work remain visible.

## Sprint planning

Each sprint should identify:

- maintenance and security work
- defects
- feature work
- documentation and test debt
- explicitly deferred work

## Suggested priorities

1. Restore and keep CI green.
2. Address security and unsupported runtime or dependency issues.
3. Improve reproducible local development.
4. Add tests around active behavior.
5. Deliver incremental features.

## Current maintenance backlog

- Establish CI across all three application components.
- Stop tracking local `.env` files.
- Stabilize the supported Node.js runtime.
- Review and split large automated dependency upgrades.
- Add reproducible root-level Docker Compose development where practical.
- Modernize legacy React Admin dependencies.
- Upgrade NestJS and Prisma deliberately with tests.
- Upgrade Next.js as a dedicated migration.
- Expand automated frontend coverage.

## Sprint completion

At sprint close:

- merged work should have green CI
- documentation should reflect configuration and runtime changes
- stale feature branches should be removed
- unresolved items should move to the next sprint or backlog with context
