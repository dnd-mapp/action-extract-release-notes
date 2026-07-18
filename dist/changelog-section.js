/**
 * Escapes regular expression metacharacters in `value`, so it can be safely interpolated
 * into a `RegExp` pattern and matched literally.
 *
 * Needed because a version string may contain characters that are meaningful in a regex
 * (e.g. `.` in `1.2.3`).
 *
 * @param value - The literal string to escape.
 * @returns `value` with every regex metacharacter prefixed by a backslash.
 */
function escapeRegExp(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
/**
 * Extracts the [Keep a Changelog](https://keepachangelog.com/en/1.1.0/)-formatted section
 * for `version`, including its `## [x.x.x] - YYYY-MM-DD` heading line.
 *
 * The section is bounded by the matching `## [x.x.x] ...` heading and the next `## [...]`
 * heading that follows it (typically the previous release), or the end of the file if there
 * is none.
 *
 * @param changelog - The full contents of `CHANGELOG.md`.
 * @param version - The released version to look up, without a leading `v` (e.g. `1.2.3`).
 * @returns The matched section, trimmed of surrounding whitespace and terminated with a
 *   single trailing newline.
 * @throws {Error} If no `## [<version>]` heading for `version` exists in `changelog`.
 */
export function extractReleaseNotesSection(changelog, version) {
    const headingPattern = new RegExp(`^## \\[${escapeRegExp(version)}\\].*$`, 'm');
    const headingMatch = headingPattern.exec(changelog);
    if (!headingMatch) {
        throw new Error(`Could not find a changelog section for version "${version}".`);
    }
    const sectionStart = headingMatch.index;
    const contentStart = sectionStart + headingMatch[0].length;
    const nextHeadingMatch = /^## \[.*$/m.exec(changelog.slice(contentStart));
    const sectionEnd = nextHeadingMatch ? contentStart + nextHeadingMatch.index : changelog.length;
    return changelog.slice(sectionStart, sectionEnd).trim() + '\n';
}
