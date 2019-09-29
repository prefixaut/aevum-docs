module.exports = {
    base: '/aevum/',
    title: 'Aevum',
    description: 'Documentation for the aevum javascript-library',
    dest: './dist',
    themeConfig: {
        repo: 'prefixaut/aevum',
        repoLabel: 'GitHub',
        docsRepo: 'prefixaut/aevum-docs',
        docsDir: 'src',
        docsBranch: 'master',
        editLinks: true,
        editLinkText: 'Improve this Page!',
        lastUpdated: 'Last Updated',
        sidebar: [
            '/',
            '/installation.md',
            '/building.md',
            '/usage.md',
        ]
    }
};
