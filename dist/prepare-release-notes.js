import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { extractReleaseNotesSection } from './changelog-section.js';
/**
 * Reads `CHANGELOG.md` and the `RELEASED_VERSION` environment variable, extracts the
 * matching changelog section, and writes it to `.github/release-notes.md`.
 *
 * Intended to run in CI when a release tag is pushed, so the resulting file can be used as
 * the body of the corresponding GitHub release.
 *
 * @throws {Error} If `RELEASED_VERSION` is unset, `CHANGELOG.md` cannot be read, no matching
 *   section exists, or the notes file cannot be written.
 */
async function prepareReleaseNotes() {
    const releasedVersion = process.env['RELEASED_VERSION'];
    if (!releasedVersion) {
        throw new Error('The `RELEASED_VERSION` environment variable is not set.');
    }
    const version = releasedVersion.replace(/^v/, '');
    const changelogPath = join(process.cwd(), 'CHANGELOG.md');
    const changelog = await readFile(changelogPath, { encoding: 'utf8' });
    const releaseNotes = extractReleaseNotesSection(changelog, version);
    const releaseNotesPath = join(process.cwd(), '.github/release-notes.md');
    await writeFile(releaseNotesPath, releaseNotes, { encoding: 'utf8' });
}
try {
    await prepareReleaseNotes();
    console.log('Release notes prepared successfully.');
}
catch (error) {
    console.error(`::error::${error.message}`);
    process.exit(1);
}
