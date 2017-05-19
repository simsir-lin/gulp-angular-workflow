var gulp = require('gulp'),
  angularTemplatecache = require('gulp-angular-templatecache'),
  ngAnnotate = require('gulp-ng-annotate'),  //支持angular的依赖注入语法
  uglify = require('gulp-uglify'),    // 压缩js文件
  inject = require("gulp-inject"),
  minifyHtml = require('gulp-minify-html'),
  minifyCss = require('gulp-clean-css'),
  useref = require('gulp-useref'),    // 可以获取html中注释里面的插件文件
  filter = require('gulp-filter'),
  rev = require('gulp-rev'),    // 根据静态内容生成md5签名，打包出来的文件名会加上md5签名
  revReplace = require('gulp-rev-replace'),
  flatten = require('gulp-flatten'),    // 可以修改文件的绝对路径
  saveLicense = require('uglify-save-license'),
  htmlmin = require('gulp-htmlmin'),
  gulpif = require('gulp-if'),
  size = require('gulp-size'),
  rename = require('gulp-rename'),
  clean = require('gulp-clean');

// self
var conf = require('./conf.js');

gulp.task('build-useref', ['templateCacheHtml', 'inject', 'build-fonts', 'build-image', 'lint'], function () {
  return gulp.src(conf.paths.serve + '/index.html')
    .pipe(inject(gulp.src(conf.paths.serve + '/templateCacheHtml.js'), {
      name: 'template',
      ignorePath: conf.paths.serve,
      addRootSlash: false
    }))
    .pipe(useref())
    .pipe(rev())
    .pipe(gulpif('*.js', ngAnnotate()))
    .pipe(gulpif('*.js', uglify({ mangle: false, preserveComments: saveLicense })))
    .pipe(gulpif('*.css', minifyCss({ processImport: false })))
    .pipe(revReplace())
    .pipe(gulp.dest(conf.paths.dist + '/'))
    .pipe(size());
});

gulp.task('build-fonts', function () {
  // TODO: 处理bootstrap的字体
  return gulp.src('bower_components/**/*.{eot,svg,ttf,woff,woff2}')
    .pipe(flatten())
    .pipe(gulp.dest(conf.paths.dist + '/fonts/'));
});

gulp.task('build-image', function () {
  return gulp.src([conf.paths.src + '/images/*.{png,jpg,jpeg,svg}', conf.paths.src + '/images/*/*.{png,jpg,jpeg,svg}'])
    .pipe(gulp.dest(conf.paths.dist + '/images/'));
});

gulp.task('build', ['build-useref'], function () {
  return gulp.src(conf.paths.dist + '/*.html')
    .pipe(clean())
    .pipe(rename('index.html'))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(conf.paths.dist + '/'));
});

gulp.task('templateCacheHtml', function () {
  return gulp.src(conf.paths.src + '/app/**/*.html')
    .pipe(minifyHtml({
      empty: true,
      spare: true,
      quotes: true
    }))
    .pipe(angularTemplatecache('templateCacheHtml.js', {
      module: 'shop',
      root: 'app'
    }))
    .pipe(gulp.dest(conf.paths.serve + '/'));
});
