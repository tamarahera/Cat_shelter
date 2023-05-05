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
const newer = require('gulp-newer');
const fonter = require('gulp-fonter');
const ttf2woff2 = require('gulp-ttf2woff2');
const htmlmin = require('gulp-htmlmin');

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
    return src(['src/images/*.*', '!src/images/*.svg'])
        .pipe(newer('dist/images'))
        .pipe(avif({ quality : 70}))

        .pipe(newer('dist/images'))
        .pipe(src('src/images/*.*'))
        .pipe(webp())

        .pipe(newer('dist/images'))
        .pipe(src('src/images/*.*'))
        .pipe(imagemin())

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
    return src('src/js/**/*.js')
        .pipe(concat('script.min.js'))
        .pipe(uglify())
        .pipe(dest("dist/js"))
        .pipe(browserSync.stream())
}

function styles() {
    return src('src/scss/*.scss')
        .pipe(autoprefixer())
        .pipe(concat('style.min.scss'))
        .pipe(scss({ outputStyle: 'compressed' }))
        .pipe(dest('dist/css'))
        .pipe(browserSync.stream())
}

function watching() {
    watch(['src/scss/**/*.+(scss|sass)'], styles)
    watch(['src/images/*.*'], images)
    watch(['src/js/**/*.js'], scripts)
    watch(['src/*.html']).on('change', html)
}

function browsersync() {
    browserSync.init({
        server: {
            baseDir: 'dist/'
        }
    });
}

function cleanDist() {
    return src('dist')
        .pipe(clean())
}
 
function building() {
    return src([
        'src/*.html'
    ], {base: 'src'})
      .pipe(dest('dist'))
}

exports.styles = styles;
exports.fonts = fonts;
exports.images = images;
exports.scripts = scripts;
exports.watching = watching;
exports.icons = icons;

exports.build = series(cleanDist, html, styles, scripts, images, icons, fonts, building);

exports.default = parallel(html, fonts, styles, scripts, browsersync, watching);