"use strict";

// dependencies
const gulp = require("gulp");
const del = require("del");
const sass = require("gulp-sass");
const minifyCSS = require("gulp-clean-css");
const concat = require("gulp-concat");
const merge = require("merge-stream");

var SCSS_SRC = "./src/assets/scss/**/*.scss";
var SCSS_DEST = "./src/assets/css";

// Compile SCSS
gulp.task("compile_scss", function() {
    const reset = gulp
        .src("node_modules/normalize-scss/sass")
        .pipe(sass().on("error", sass.logError));
    const toast = gulp
        .src("node_modules/react-toastify/dist/ReactToastify.css")
        .pipe(sass().on("error", sass.logError));
    const datePicker = gulp
        .src("node_modules/react-datepicker/dist/react-datepicker.css")
        .pipe(sass().on("error", sass.logError));
    const scss = gulp.src(SCSS_SRC).pipe(sass().on("error", sass.logError));
    return merge(reset, toast, datePicker, scss)
        .pipe(minifyCSS())
        .pipe(concat("default.min.css"))
        .pipe(gulp.dest(SCSS_DEST));
});

//Watch SCSS
gulp.task("watch_scss", function() {
    return gulp.watch(SCSS_SRC, gulp.series("compile_scss"));
});

//Clean
gulp.task("clean_dest", async function() {
    let scss = await del([SCSS_DEST + "/**", "!" + SCSS_DEST], { force: true });
    console.log("Deleted files and directories:\n", scss.join("\n"));
});

//Run tasks
gulp.task("default", gulp.parallel("watch_scss"));

gulp.task("clean", gulp.series("clean_dest", "compile_scss"));
