const { src, dest, watch, parallel, series } = require('gulp');

const scss = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default; //rename
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean');
const avif = require('gulp-avif');
const webp = require('gulp-webp');
const imagemin = require('gulp-imagemin');
const imageminWebp = require('imagemin-webp');
const mozjpeg = require('imagemin-mozjpeg');
const newer = require('gulp-newer');
const fonter = require('gulp-fonter');
const ttf2woff2 = require('gulp-ttf2woff2');
const htmlmin = require('gulp-htmlmin');
const webpack = require("webpack-stream");

function fonts() {
    return src('src/fonts/*.*')
        .pipe(fonter({
            formats: ['woff', 'ttf']
        }))

        .pipe(src('dist/fonts/*.ttf'))
        .pipe(ttf2woff2())
        .pipe(dest('dist/fonts'))
}

function images() {
    return src(['src/images/*.*', '!src/images/*.svg', '!src/images/meta.*'])
        .pipe(avif({ quality: 40 }))

        .pipe(src(['src/images/*.*', '!src/images/*.svg']))
        .pipe(imagemin([
            mozjpeg({quality: 40})
        ]))
        
        .pipe(dest('dist/images'))
}

function imagesWebp() {
    return src(['dist/images/*.jpg', '!dist/images/*.svg', '!dist/images/meta.*'])
        .pipe(webp())

        .pipe(newer('dist/images'))
        .pipe(src('dist/images/*.webp'))
        .pipe(webp([
            imageminWebp({quality: 1})
        ]))

        .pipe(dest('dist/images'))
}

function icons() {
    return src('src/icons/**/*')
        .pipe(dest('dist/icons'))
};

function html() {
    return src('src/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(dest('dist/'))
        .pipe(browserSync.stream())
};

function scripts() {
    return src("./src/js/main.js")
        .pipe(webpack({
            mode: 'development',
            output: {
                filename: 'script.js'
            },
            watch: false,
            devtool: "source-map",
            module: {
                rules: [
                    {
                        test: /\.m?js$/,
                        exclude: /(node_modules|bower_components)/,
                        use: {
                            loader: 'babel-loader',
                            options: {
                                presets: [['@babel/preset-env', {
                                    debug: true,
                                    corejs: 3,
                                    useBuiltIns: "usage"
                                }]]
                            }
                        }
                    }
                ]
            }
        }))
        .pipe(dest('dist/js'))
        .on("end", browserSync.reload);
};

function styles() {
    return src('src/scss/*.scss')
        .pipe(autoprefixer())
        .pipe(concat('style.min.scss'))
        .pipe(scss({ outputStyle: 'compressed' }))
        .pipe(dest('dist/css'))
        .pipe(browserSync.stream())
}

function json() {
    return src('src/*.json')
        .pipe(dest('dist/'))
        .pipe(browserSync.stream())
}

function watching() {
    watch(['src/scss/**/*.+(scss|sass)'], styles)
    watch(['src/js/**/*.js'], scripts)
    watch(['src/*.html']).on('change', html)
}

function browsersync() {
    browserSync.init({
        server: {
            baseDir: 'dist/'
        },
        ui: {
            port: 8080
        }
    });
}

function php() {
    return src('src/*.php')
    .pipe(dest('dist/'))
    .pipe(browserSync.stream())
}

function cleanDist() {
    return src('dist')
        .pipe(clean())
}

function building() {
    return src([
        'src/*.html'
    ], { base: 'src' })
        .pipe(dest('dist'))
}

exports.styles = styles;
exports.fonts = fonts;
exports.scripts = scripts;
exports.watching = watching;
exports.icons = icons;
exports.images = images;
exports.imagesWebp = imagesWebp;

exports.build = series(cleanDist, html, styles, scripts, images, imagesWebp, icons, fonts, json, php, building);

exports.default = parallel(html, fonts, styles, scripts, json, php, browsersync, watching);