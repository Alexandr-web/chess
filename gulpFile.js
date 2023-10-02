const { dest, parallel, watch, src, } = require("gulp");
const plumber = require("gulp-plumber");
const autoprefixer = require("gulp-autoprefixer");
const concat = require("gulp-concat");
const sass = require("gulp-sass")(require("sass"));
const browserSync = require("browser-sync").create();
const cleanCss = require("gulp-clean-css");
const webpack = require("webpack-stream");
const uglify = require("gulp-uglify");

const buildDir = "./docs";
const srcDir = "./src";
const config = {
    styles: {
        from: [`${srcDir}/scss/*.scss`, `!${srcDir}/scss/_*.scss`],
        watchSrc: `${srcDir}/scss/**/*.scss`,
        to: `${buildDir}/css`,
    },
    js: {
        from: `${srcDir}/js/*.js`,
        watchSrc: `${srcDir}/js/**/*.js`,
        to: `${buildDir}/js`,
    },
    html: {
        from: `${srcDir}/*.html`,
        watchSrc: `${srcDir}/**/*.html`,
        to: `${buildDir}/`,
    },
    images: {
        from: `${srcDir}/images/**/*`,
        watchSrc: `${srcDir}/images/**/*`,
        to: `${buildDir}/images`,
    },
};

const stylesTask = () => {
    return src(config.styles.from)
        .pipe(plumber())
        .pipe(sass({ outputStyle: "expanded", }))
        .pipe(cleanCss({ level: { 1: { specialComments: 0, }, }, }))
        .pipe(autoprefixer({ cascade: true, overrideBrowserslist: ["last 5 versions"], }))
        .pipe(concat("index.css"))
        .pipe(dest(config.styles.to))
        .pipe(browserSync.stream());
};

const imagesTask = () => {
    return src(config.images.from)
        .pipe(plumber())
        .pipe(dest(config.images.to))
        .pipe(browserSync.stream());
}

const jsTask = () => {
    return src(config.js.from)
        .pipe(plumber())
        .pipe(webpack({ mode: "development", }))
        .pipe(uglify())
        .pipe(concat("index.js"))
        .pipe(dest(config.js.to))
        .pipe(browserSync.stream());
};

const htmlTask = () => {
    return src(config.html.from)
        .pipe(dest(config.html.to))
        .pipe(browserSync.stream());
};

const watching = () => {
    watch(config.js.watchSrc, parallel(jsTask));
    watch(config.styles.watchSrc, parallel(stylesTask));
    watch(config.html.watchSrc, parallel(htmlTask));
    watch(config.images.watchSrc, parallel(imagesTask));
};

const server = () => {
    browserSync.init({
        server: {
            baseDir: buildDir
        },
    });
};

exports.build = parallel(htmlTask, stylesTask, jsTask, imagesTask);
exports.default = parallel(htmlTask, stylesTask, jsTask, imagesTask, watching, server);