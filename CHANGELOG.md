# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.1] - 2026-07-19

### Fixed

- Extracted release notes no longer include the consuming repo's trailing Keep a Changelog link-reference lines (e.g. `[1.2.3]: URL`) when the released version had no following `## [...]` heading in `CHANGELOG.md` (typically the first release, or the oldest of several).

## [1.0.0] - 2026-07-18

### Added

- Composite action that extracts the Keep a Changelog section for the released version (read from the `RELEASED_VERSION` environment variable) out of the consuming repo's `CHANGELOG.md`, failing the step if no matching section exists.
- `write-file` input (default `'true'`) that, when enabled, writes the extracted section to `.github/release-notes.md`. Set to `'false'` for a fail-fast existence check only.

[1.0.1]: https://github.com/dnd-mapp/action-extract-release-notes/releases/tag/v1.0.1

[1.0.0]: https://github.com/dnd-mapp/action-extract-release-notes/releases/tag/v1.0.0
