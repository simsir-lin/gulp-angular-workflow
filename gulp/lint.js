var gulp = require('gulp'),
  eslint = require('gulp-eslint'),
  sass = require("gulp-sass");

// self
var conf = require('./conf.js');
var util = require('./util.js');

gulp.task('lint-script', function () {
  return gulp.src(conf.paths.src + '/app/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('lint-scss', function () {
  return gulp.src(conf.paths.src + '/app/**/*.scss')
    .pipe(sass().on('error', util.errorHandle));
});

gulp.task('lint', ['lint-script', 'lint-scss']);
