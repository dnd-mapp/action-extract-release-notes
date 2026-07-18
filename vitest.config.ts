import { coverageConfigDefaults, defineConfig } from 'vitest/config';

const isCI = Boolean(process.env['CI']);

export default defineConfig({
    test: {
        coverage: {
            enabled: true,
            exclude: [
                ...coverageConfigDefaults.exclude,
                'src/check-changelog-section.ts',
                'src/prepare-release-notes.ts',
            ],
            include: ['src/**/*.ts'],
            provider: 'v8',
            reportOnFailure: true,
            reporter: ['text-summary', 'html'],
            thresholds: {
                statements: 80,
                branches: 80,
                functions: 80,
                lines: 80,
            },
        },
        globals: true,
        include: ['src/**/*.spec.ts'],
        name: 'action-extract-release-notes',
        open: false,
        reporters: ['dot', ['html', { outputFile: 'reports/index.html' }], ...(isCI ? ['github-actions'] : [])],
        sequence: {
            shuffle: true,
        },
    },
});
