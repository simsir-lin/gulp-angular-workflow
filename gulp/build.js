var gulp = require('gulp'),
  angularTemplatecache = require('gulp-angular-templatecache'),
  ngAnnotate = require('gulp-ng-annotate'),  //支持angular的依赖注入语法
  uglify = require('gulp-uglify'),    // 压缩js文件
  inject = require("gulp-inject"),
  minifyHtml = require('gulp-minify-html'),
  minifyCss = require('gulp-minify-css'),
  useref = require('gulp-useref'),    // 可以获取html中注释里面的插件文件
  filter = require('gulp-filter'),
  rev = require('gulp-rev'),    // 根据静态内容生成md5签名，打包出来的文件名会加上md5签名
  revReplace = require('gulp-rev-replace'),
  flatten = require('gulp-flatten');    // 可以修改文件的绝对路径

// self
var conf = require('./conf.js');

gulp.task('build', ['templateCacheHtml', 'inject', 'build-fonts', 'lint'], function () {
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

gulp.task('build-fonts', function () {
  return gulp.src('bower_components/**/*.{eot,svg,ttf,woff,woff2}')
    .pipe(flatten())
    .pipe(gulp.dest(conf.paths.dist + '/fonts/'));
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
