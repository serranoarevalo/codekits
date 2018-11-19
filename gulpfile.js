const gulp = require("gulp");
const pug = require("gulp-pug");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const minifyCSS = require("gulp-csso");
const webserver = require("gulp-webserver");
const clean = require("gulp-clean");
const image = require("gulp-image");

sass.compiler = require("node-sass");

gulp.task("html", function() {
  return gulp
    .src("src/*.pug")
    .pipe(pug())
    .pipe(gulp.dest("build/"));
});

gulp.task("css", function() {
  return gulp
    .src("src/scss/styles.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"],
        cascade: false
      })
    )
    .pipe(minifyCSS())
    .pipe(gulp.dest("build/css"));
});

gulp.task("webserver", function() {
  gulp.src("build").pipe(
    webserver({
      livereload: true,
      directoryListing: false,
      open: true,
      https: false
    })
  );
});

gulp.task("clean", function() {
  return gulp.src("build", { read: false }).pipe(clean());
});

gulp.task("watch", function() {
  gulp.watch("src/**/**", ["html", "css"]);
});

gulp.task("copy", function() {
  gulp.src("CNAME", { base: "./" }).pipe(gulp.dest("build"));
});

gulp.task("images", function() {
  gulp
    .src("src/images/*")
    .pipe(image())
    .pipe(gulp.dest("./build/images"));
});

gulp.task("default", ["watch", "webserver"]);
gulp.task("build", ["html", "css", "copy", "images"]);
