# action-extract-release-notes

A reusable composite GitHub Action that extracts the Keep a Changelog-formatted section for a released version out of a consuming repo's `CHANGELOG.md`, either as a fail-fast existence check or to produce the content for a GitHub Release.

## Language

**Release notes section**:  
The Keep a Changelog-formatted block in `CHANGELOG.md` for one version, bounded by its `## [x.x.x] - YYYY-MM-DD` heading and the next `## [...]` heading, or the end of the file if there is none (excluding any trailing Keep a Changelog link-reference lines, `[x.x.x]: URL`, which are never part of a release's notes). Refers to both the in-place text and the extracted content; there's no separate transformation between them.  
_Avoid_: "changelog section" alone, "changelog" stays reserved for the file as a whole.

**Released version**:  
The value derived from the `RELEASED_VERSION` environment variable (the pushed tag, e.g. `v1.2.3`), with its leading `v` stripped, used to find the matching heading.  
_Avoid_: "release tag", that's `action-validate-release-tag`'s term for the raw tag ref; this action only ever deals with the stripped, `package.json`-comparable form.

**Notes output path**:  
The fixed location, `.github/release-notes.md`, that the write step produces. Not configurable.
