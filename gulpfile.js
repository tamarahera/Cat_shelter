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
/* const svgSprite = require('gulp-svg-sprite');
 */const fonter = require('gulp-fonter');
const ttf2woff2 = require('gulp-ttf2woff2');

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
        .pipe(avif({ quality : 50}))

        .pipe(newer('dist/images'))
        .pipe(src('src/images/*.*'))
        .pipe(webp())

        .pipe(newer('dist/images'))
        .pipe(src('src/images/*.*'))
        .pipe(imagemin())

        .pipe(dest('dist/images'))
}

/* function sprite() {
    return src('dist/images/*.svg')
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: '../sprite.svg',
                    example: true
                }
            }
        }))
        .pipe(dest('dist/images'))
} */

function scripts() {
    return src('src/js/**/*.js')
        .pipe(concat('script.min.js'))
        .pipe(uglify())
        .pipe(dest("dist/js"))
        .pipe(browserSync.stream())
}

function styles() {
    return src('src/scss/**/*.+(scss|sass)')
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
    watch(['src/**/*.html']).on('change', browserSync.reload)
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
exports.sprite = sprite;

exports.build = series(cleanDist, styles, scripts, building)

exports.default = parallel(styles, scripts, browsersync, watching)