SystemJS.config({
    transpiler: 'plugin-babel',
    map: {
        'plugin-babel': './scripts/node_modules/systemjs-plugin-babel/plugin-babel.js',
        'systemjs-babel-build': './scripts/node_modules/systemjs-plugin-babel/systemjs-babel-browser.js',
        'main': './scripts/main.js',
        'data': './scripts/data.js',
        'search': './scripts/search-controller.js',
        'register': './scripts/register-controller.js',
        'login': './scripts/login-controller.js',
        'watchlist': './scripts/watchlist-controller.js'
    }
});