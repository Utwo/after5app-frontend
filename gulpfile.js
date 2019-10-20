"use strict";

let gulp = require("gulp");
let autoprefixer = require("gulp-autoprefixer");
let sass = require("gulp-sass");
let cleanCSS = require("gulp-clean-css");

// Configuration
let configuration = {
  src: {
    cssFolder: ["./src/scss/"],
    cssMain: "main.scss",
    image: "./src/img",
    dev: "src"
  },
  build: "./src"
};

// Task css
gulp.task("css", function() {
  let mainCss = gulp
    .src(configuration.src.cssFolder + configuration.src.cssMain)
    .pipe(sass({ outputStyle: "compressed" }).on("error", sass.logError))
    .pipe(autoprefixer("last 2 version"))
    .pipe(cleanCSS())
    .pipe(gulp.dest(configuration.build));
});

gulp.task("watch", function() {
  gulp.watch(configuration.src.cssFolder + "/**", ["css"]);
});

// The default task (called when you run `gulp` from cli)
gulp.task("default", ["css", "watch"]);

// Task when ready for production
gulp.task("production", ["css"]);
