const path = require('path');

module.exports = {
    paths(paths, env) {
        paths.appIndexJs = path.resolve(__dirname, 'src/_dev/index.tsx');
        paths.appSrc = path.resolve(__dirname, 'src');
        return paths;
    },
};
