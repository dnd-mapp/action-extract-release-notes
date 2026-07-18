# Compile TypeScript scripts inside a composite action, matching `action-validate-release-tag`

This action's changelog-section extraction logic is written in TypeScript, compiled with plain `tsc` (no bundler, extending `@dnd-mapp/tsconfig`'s node preset) to a committed `dist/`, invoked from `action.yml` as ordinary composite steps (`node "${{ github.action_path }}/dist/....js"`), and unit-tested with Vitest, the same shape [`action-validate-release-tag`](https://github.com/dnd-mapp/action-validate-release-tag) already adopted for itself (see its [ADR 0001](https://github.com/dnd-mapp/action-validate-release-tag/blob/main/docs/adr/0001-typescript-compiled-composite-action.md)), not the plain, untested `.mjs`-via-`node` shape `action-setup-workspace` uses.

Only the regex-bounded section-extraction logic (`extractReleaseNotesSection`) is pulled into its own exported, tested function, in `src/changelog-section.ts`. The trivial `RELEASED_VERSION`/`CHANGELOG.md` reads stay inlined in each entry-point script (`src/check-changelog-section.ts`, `src/prepare-release-notes.ts`), mirroring how `action-validate-release-tag`'s own entry-point scripts inline their trivial env/fs reads and only extract the logic that has real edge cases worth a test file.

## Considered options

- **Plain `.mjs` scripts run via `node scripts/....mjs`, no build step** (matching `action-setup-workspace`'s current shape, and the original assumption this repo's design started from). Rejected: this repo's sibling in the same extraction effort, `action-validate-release-tag`, already settled this exact question for "a composite action with logic worth typing and unit-testing," and diverging here would leave two of the three new repos disagreeing on the same question for no stated reason.
