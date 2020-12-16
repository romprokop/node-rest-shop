module.exports = {
    singleQuote: true,
    // to not break non-transpiled code
    trailingComma: 'es5',
    overrides: [
        {
            files: './*.js',
            options: {
                trailingComma: 'all',
            },
        },
    ],
};
