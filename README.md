# action-extract-release-notes

[![Push to main](https://github.com/dnd-mapp/action-extract-release-notes/actions/workflows/push-main.yml/badge.svg)](https://github.com/dnd-mapp/action-extract-release-notes/actions/workflows/push-main.yml)
[![License](https://img.shields.io/github/license/dnd-mapp/action-extract-release-notes)](LICENSE)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://prettier.io)

Reusable GitHub Action that extracts the Keep a Changelog-formatted section for a released version out of a consuming repo's `CHANGELOG.md`, either as a fail-fast existence check or to produce the content for a GitHub Release.

## Usage

```yaml
- name: Extract release notes
  uses: dnd-mapp/action-extract-release-notes@<SHA> # v1.0.0
  with:
      write-file: 'true'
```

Runs against the checked-out repository, reading the `RELEASED_VERSION` environment variable (the pushed tag, e.g. `v1.2.3`) to find the matching `## [x.x.x]` heading in `CHANGELOG.md`. Always checks that a matching section exists, failing the step if not. When `write-file` is `'true'` (the default), also writes the section to `.github/release-notes.md`. Pass `write-file: 'false'` for a fail-fast existence check only, without producing the file.

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
