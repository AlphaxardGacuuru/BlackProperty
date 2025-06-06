const mix = require("laravel-mix");

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.react("resources/js/app.js", "public/js").sass(
    "resources/sass/app.scss",
    "public/css"
);

mix.browserSync({
	port: 3008,
	proxy: "http://laravel.test",
	reloadDelay: 500,
	open: false
})

mix.webpackConfig({
    resolve: {
        extensions: [".js"],
        alias: {
            // "@": __dirname + "/resources/js"
            "@": "/resources/js"
        }
    }
});
