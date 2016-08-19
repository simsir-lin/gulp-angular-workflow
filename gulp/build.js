var gulp = require('gulp'),
  angularTemplatecache = require('gulp-angular-templatecache'),
  ngAnnotate = require('gulp-ng-annotate'),
  uglify = require('gulp-uglify'),
  bowerFiles = require('main-bower-files'),
  inject = require("gulp-inject"),
  minifyHtml = require('gulp-minify-html'),
  minifyCss = require('gulp-minify-css'),
  useref = require('gulp-useref'),
  filter = require('gulp-filter'),
  rev = require('gulp-rev'),
  revReplace = require('gulp-rev-replace');

// self
var conf = require('./conf.js');

gulp.task('build', ['templateCacheHtml', 'inject'], function () {
  var assets;

  var jsFilter = filter('**/*.js', { restore: true }),
    cssFilter = filter('**/*.css', { restore: true });

  return gulp.src(conf.paths.serve + '/index.html')
    .pipe(inject(gulp.src(conf.paths.serve + '/templateCacheHtml.js'), {
      name: 'template',
      ignorePath: conf.paths.serve,
      addRootSlash: false
    }))
    .pipe(assets = useref.assets())
    .pipe(rev())
    .pipe(jsFilter)
    .pipe(ngAnnotate())
    .pipe(uglify({ mangle: false }))
    .pipe(jsFilter.restore)
    .pipe(cssFilter)
    .pipe(minifyCss({ processImport: false }))
    .pipe(cssFilter.restore)
    .pipe(assets.restore())
    .pipe(useref())
    .pipe(revReplace())
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
      module: 'myApp',
      root: 'app'
    }))
    .pipe(gulp.dest(conf.paths.serve + '/'));
});
