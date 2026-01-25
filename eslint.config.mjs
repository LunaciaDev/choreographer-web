// @ts-check

import eslintConfigPrettierFlat from 'eslint-config-prettier/flat';
import tseslint from 'typescript-eslint';

export default tseslint.config(
    tseslint.configs.recommendedTypeChecked,
    {
        languageOptions: {
            parserOptions: {
                projectService: true,
                tsconfigRootDir: import.meta.dirname,
            },
        },
    },
    eslintConfigPrettierFlat,
    {
        rules: {
            // Not a library; just code for a webpage
            "@typescript-eslint/no-namespace": "off"
        }
    }
);
