const gulp = require("gulp");
const pug = require("gulp-pug");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const minifyCSS = require("gulp-csso");
const webserver = require("gulp-webserver");

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

gulp.task("watch", function() {
  gulp.watch("src/**/**", ["html", "css"]);
});

gulp.task("default", ["html", "css", "watch", "webserver"]);
gulp.task("build", ["html", "css"]);
