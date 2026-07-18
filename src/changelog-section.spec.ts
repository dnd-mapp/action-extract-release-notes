import { extractReleaseNotesSection } from './changelog-section.js';

describe('extractReleaseNotesSection', () => {
    it('extracts the section bounded by the matching heading and the next heading', () => {
        const changelog = [
            '# Changelog',
            '',
            '## [Unreleased]',
            '',
            '## [1.2.3] - 2026-07-18',
            '',
            '### Added',
            '',
            '- Something new.',
            '',
            '## [1.2.2] - 2026-06-01',
            '',
            '### Fixed',
            '',
            '- An old bug.',
            '',
        ].join('\n');

        expect(extractReleaseNotesSection(changelog, '1.2.3')).toBe(
            ['## [1.2.3] - 2026-07-18', '', '### Added', '', '- Something new.'].join('\n') + '\n',
        );
    });

    it('extracts to the end of the file when the matched section is the last one', () => {
        const changelog = [
            '# Changelog',
            '',
            '## [1.2.2] - 2026-06-01',
            '',
            '### Fixed',
            '',
            '- An old bug.',
            '',
            '## [1.2.1] - 2026-05-01',
            '',
            '### Added',
            '',
            '- Oldest entry.',
            '',
        ].join('\n');

        expect(extractReleaseNotesSection(changelog, '1.2.1')).toBe(
            ['## [1.2.1] - 2026-05-01', '', '### Added', '', '- Oldest entry.'].join('\n') + '\n',
        );
    });

    it('treats regex metacharacters in the version string literally', () => {
        const changelog = ['## [1.2.3] - 2026-07-18', '', '- Should not match.', ''].join('\n');

        expect(() => extractReleaseNotesSection(changelog, '1x2x3')).toThrow(
            'Could not find a changelog section for version "1x2x3".',
        );
    });

    it('throws a descriptive error when no matching heading exists', () => {
        const changelog = ['## [1.2.2] - 2026-06-01', '', '- An old bug.', ''].join('\n');

        expect(() => extractReleaseNotesSection(changelog, '1.2.3')).toThrow(
            'Could not find a changelog section for version "1.2.3".',
        );
    });
});
