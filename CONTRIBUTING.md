# Contributing

## Workflow

1. Create a focused branch from `master`.
2. Keep each pull request limited to one coherent change.
3. Update tests and documentation with behavior changes.
4. Run the relevant local validation commands before opening the pull request.
5. Do not merge while required CI checks are failing.
6. Delete the feature branch after merge.

## Commit guidance

Use short, imperative commit messages. Conventional Commit prefixes are encouraged:

- `feat:` new behavior
- `fix:` bug fixes
- `docs:` documentation
- `test:` tests
- `chore:` maintenance
- `build:` build/dependency changes
- `ci:` CI changes

## Pull requests

A pull request should describe:

- what changed
- why it changed
- how it was tested
- any migration or configuration impact
- follow-up work that is intentionally out of scope

Large framework upgrades should not be bundled with unrelated cleanup.
