# One composite action, two steps, a `write-file` input, no output

This action always runs a "Check changelog section" step, extracting the release notes section for the released version and discarding the result. This is what makes the fail-fast validate-job use case work: extraction throws if no matching section exists, which fails the step. A second, "Write release notes" step runs conditionally (`if: inputs.write-file == 'true'`), re-running the extraction independently and writing `.github/release-notes.md`. A `write-file` boolean input, defaulting to `'true'`, gates it: the release job's call needs nothing special, the validate job's call passes `write-file: 'false'`. This mirrors `action-setup-workspace`'s own `install-dependencies` input, which gates its own conditional install step the same way for the same reason (one action, two call sites, one of them skips a step).

The two steps don't share state (no passing the extracted content between them via `$GITHUB_ENV`), even though that would save a redundant extraction in the release job's call. Release notes content is arbitrary multi-line Markdown, so passing it between steps needs the same heredoc-delimiter escaping (`echo "notes<<EOF" >> $GITHUB_ENV`, with a delimiter guaranteed not to collide with the content) that a formal Actions output would need. That fragility isn't worth it to save a sub-millisecond regex match.

This action produces no output, file-only. The only known consumer of extracted notes content, `action-create-github-release`'s presumed `gh release create --notes-file`, already wants a file path, not a string, and adding an output now would be speculative surface for a consumer that doesn't exist yet.

## Considered options

- **A single script/step that always extracts and conditionally writes internally**, instead of two named composite steps. Rejected for the same reason `action-validate-release-tag`'s own ADR gives for staying composite in the first place: it "keeps... checks as separate, legible steps in the Actions UI rather than one opaque `run`."
- **Passing the extracted content from the check step to the write step via `$GITHUB_ENV`**, to avoid the redundant extraction. Rejected: the multi-line escaping problem is identical to a formal action output, for a saving too small to matter.
- **Also emitting the notes as an action output** alongside the file. Rejected: no current consumer needs it, and it reintroduces the same multi-line-output escaping complexity for a hypothetical future integration.
