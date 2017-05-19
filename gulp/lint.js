var gulp = require('gulp'),
  eslint = require('gulp-eslint');

// self
var conf = require('./conf.js');
var util = require('./util.js');

gulp.task('lint-script', function () {
  return gulp.src(conf.paths.src + '/app/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('lint', ['lint-script']);
