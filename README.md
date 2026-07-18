# project-name

[![Push to main](https://github.com/dnd-mapp/project-name/actions/workflows/push-main.yml/badge.svg)](https://github.com/dnd-mapp/project-name/actions/workflows/push-main.yml)
[![License](https://img.shields.io/github/license/dnd-mapp/project-name)](LICENSE)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://prettier.io)

TODO: one-line description of this project.

## Using this template

This repo is a [GitHub template repository](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template): clicking **Use this template** copies these files as-is into a new repo, there is no variable substitution. After generating a new repo from it, go through this checklist:

- [ ] Replace `project-name` everywhere (badges above, `package.json` `name`/`repository`/`homepage`/`bugs`, this heading) with the real repo name.
- [ ] Fill in `package.json` `description` and this README's one-line description.
- [ ] Set `package.json` `version` to wherever this project's versioning actually starts.
- [ ] Drop `package.json` `private: true` only if this project will actually be published somewhere.
- [ ] Configure branch protection (or a ruleset) on `main`: require pull requests, require the `Continuous Integration` status check from `pull-request.yml`, and set the merge method to **merge commits only** (disable squash and rebase merging in Settings → General → Pull Requests). The `commitlint` step in `pull-request.yml` is a CI backstop for the local Husky hook, not redundant with it, and it only stays meaningful if commits land in `main`'s history unmodified; squash/rebase merging defeats that. See [dnd-mapp/tsconfig's ADR 0001](https://github.com/dnd-mapp/tsconfig/blob/main/docs/adr/0001-commit-message-enforcement.md) for the full reasoning. This has to be set per repo, GitHub org-wide rulesets require GitHub Enterprise.
- [ ] Delete this "Using this template" section once the checklist is done.

Depending on what this repo is actually for, add:

- **A publishable npm package**: reinstate a `release.yml` release workflow (see [dnd-mapp/tsconfig](https://github.com/dnd-mapp/tsconfig) for a working example that publishes to GitHub Package Registry), and drop `private: true` from `package.json`.
- **A JavaScript/TypeScript GitHub Action**: add `typescript` and `@types/node` as devDependencies, a build step (e.g. [`@vercel/ncc`](https://github.com/vercel/ncc)) to bundle to `dist/`, an `action.yml` manifest at the repo root, and a release workflow that tags (and moves a major-version tag like `v1`).
- **A composite (YAML-only) GitHub Action**: just add an `action.yml` manifest at the repo root, no other changes needed.
- **An Angular, NestJS, or plain TypeScript/Node project**: add `typescript`, `@types/node`, and a `tsconfig.json` extending the matching [`@dnd-mapp/tsconfig`](https://github.com/dnd-mapp/tsconfig) preset.

## Contributing

See the org-wide [CONTRIBUTING.md](https://github.com/dnd-mapp/.github/blob/main/CONTRIBUTING.md) for how to propose changes, and [DEVELOPMENT.md](DEVELOPMENT.md) for how to work in this repository day-to-day. This project follows the [Code of Conduct](https://github.com/dnd-mapp/.github/blob/main/CODE_OF_CONDUCT.md).

## Security

See [SECURITY.md](https://github.com/dnd-mapp/.github/blob/main/SECURITY.md) for how to report a vulnerability.

## Support

See [SUPPORT.md](https://github.com/dnd-mapp/.github/blob/main/SUPPORT.md) for how to get help.

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for release history.

## License

[MIT](LICENSE)
