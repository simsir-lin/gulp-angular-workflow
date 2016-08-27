var gulp = require('gulp'),
  inject = require("gulp-inject"),
  wiredep = require('wiredep').stream,
  sass = require("gulp-sass"),
  minifycss = require('gulp-minify-css'),
  browserSync = require('browser-sync'),
  rename = require('gulp-rename'),
  flatten = require('gulp-flatten');

// self
var conf = require('./conf.js');

gulp.task('styles', ['fonts'] ,function () {
  // 先将全部scss注入index.scss，也需注入bower包的sass，再编译整个scss
  // 编译好的index.css存放在tmp的server中
  return buildScss();
});

gulp.task('fonts', function () {
  return gulp.src('bower_components/**/*.{eot,svg,ttf,woff,woff2}')
    .pipe(flatten())  //修改路径，这里获取后是有包含bower_components等等，这里将路径改为只有文件名
    .pipe(gulp.dest(conf.paths.serve + '/fonts/'));
});

gulp.task('build-styles', ['styles'], function () {
  return gulp.src([conf.paths.serve + '/*.css'])
    .pipe(minifycss())
    .pipe(rename('style.css'))
    .pipe(gulp.dest(conf.paths.dist + '/styles/'));
});

gulp.task('styles-reload', function () {
  return buildScss()
    .pipe(browserSync.stream());
});

function buildScss() {
  return injectIndexScss()
    .pipe(sass({
      style: 'expanded'
    }))
    .pipe(gulp.dest(conf.paths.serve));
}

function injectIndexScss() {
  var injectOption = {
    transform: function(filePath) {
      filePath = filePath.replace(conf.paths.src + '/app/', '');
      return '@import "' + filePath + '";';
    },
    starttag: '// scssinjector',
    endtag: '// endinjector',
    addRootSlash: false
  };

  return gulp.src(conf.paths.src + '/app/index.scss')
    .pipe(inject(
        gulp.src([conf.paths.src + '/app/**/*.scss', '!' +
        conf.paths.src + '/app/index.scss']), injectOption))
    .pipe(wiredep(conf.wiredep));
}
