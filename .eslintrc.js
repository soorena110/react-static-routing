module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020,
        project: './tsconfig.json',
        extraFileExtensions: ['js', 'tx', 'jsx', 'tsx'],
        ecmaFeatures: {
            jsx: true,
        },
    },

    plugins: ['@typescript-eslint'],
    extends: ['plugin:@typescript-eslint/recommended'],
    rules: {
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
        'react/prop-types': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/display-name': 'off',
    },
};
