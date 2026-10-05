# Coding Standards

## General

- Prefer clear, maintainable code over clever abstractions.
- Keep functions and components focused.
- Avoid unrelated refactors in feature and fix pull requests.
- Remove dead code rather than commenting it out.
- Never commit credentials, secrets, generated local configuration, dependency directories, or build artifacts.

## TypeScript and JavaScript

- Preserve strong typing where practical.
- Avoid `any` unless an external interface makes it unavoidable.
- Use descriptive names for components, services, DTOs, and variables.
- Keep generated framework code separate from custom business logic where possible.

## Frontend

- Keep UI state local unless it is genuinely shared.
- Preserve accessibility semantics when changing interactive components.
- Validate production builds, not only development-server behavior.

## Backend

- Validate external input at the API boundary.
- Keep authentication and authorization checks explicit.
- Keep database access behind the service/data layer.
- Add or update tests for changed behavior.

## Dependencies

- Prefer supported dependency and runtime versions.
- Treat major framework upgrades as migrations with dedicated testing.
- Do not suppress security findings without documenting why they are accepted or false positives.
