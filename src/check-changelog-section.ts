import { readFile } from 'fs/promises';
import { join } from 'path';
import { extractReleaseNotesSection } from './changelog-section.js';

/**
 * Reads `CHANGELOG.md` and the `RELEASED_VERSION` environment variable, then verifies a
 * matching changelog section exists.
 *
 * Intended to run in CI's `validate` job when a release tag is pushed, so a missing or
 * misnamed changelog section fails fast with a clear message instead of surfacing later as
 * an empty-content error when `prepare-release-notes.js` tries to extract it.
 *
 * @throws {Error} If `RELEASED_VERSION` is unset, `CHANGELOG.md` cannot be read, or no
 *   matching section exists.
 */
async function checkChangelogSection(): Promise<void> {
    const releasedVersion = process.env['RELEASED_VERSION'];

    if (!releasedVersion) {
        throw new Error('The `RELEASED_VERSION` environment variable is not set.');
    }
    const version = releasedVersion.replace(/^v/, '');

    const changelogPath = join(process.cwd(), 'CHANGELOG.md');
    const changelog = await readFile(changelogPath, { encoding: 'utf8' });

    extractReleaseNotesSection(changelog, version);
}

try {
    await checkChangelogSection();
    console.log('Changelog section found.');
} catch (error) {
    console.error(`::error::${(error as Error).message}`);
    process.exit(1);
}
