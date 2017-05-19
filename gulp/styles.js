var gulp = require('gulp'),
  inject = require("gulp-inject"),
  wiredep = require('wiredep').stream,
  sass = require("gulp-sass"),
  minifycss = require('gulp-minify-css'),
  browserSync = require('browser-sync'),
  rename = require('gulp-rename'),
  flatten = require('gulp-flatten'),
  replace = require('gulp-replace'),
  autoprefixer = require('gulp-autoprefixer');

// self
var conf = require('./conf.js');

gulp.task('styles', function () {
  // 先将全部scss注入index.scss，也需注入bower包的sass，再编译整个scss
  // 编译好的index.css存放在tmp的server中
  return buildScss();
});

// gulp.task('fonts', function () {
//   return gulp.src('bower_components/**/*.{eot,svg,ttf,woff,woff2}')
//     .pipe(flatten())  //修改路径，这里获取后是有包含bower_components等等，这里将路径改为只有文件名
//     .pipe(gulp.dest(conf.paths.serve + '/fonts/'));
// });

gulp.task('styles-reload', function () {
  return buildScss()
    .pipe(browserSync.stream());
});

function buildScss() {
  return injectIndexScss()
    .pipe(sass({
      style: 'compressed'
    }))
    .pipe(replace(/\/images\/(.+?)\.(jpg|png|gif|jpeg|svg)/g, conf.web.root + '/images/$1.$2'))
    .pipe(replace(/\.\.\/fonts\/bootstrap\/(.+?)\.(eot|svg|ttf|woff|woff2)/g, '../fonts/$1.$2'))
    .pipe(autoprefixer({
      browsers: ['Firefox >= 20', 'last 3 versions', 'IOS 8', 'Android >= 4.0', '> 3% in CN'],
      cascade: true
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
