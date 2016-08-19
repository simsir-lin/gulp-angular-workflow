var gulp = require('gulp'),
  inject = require("gulp-inject"),
  wiredep = require('wiredep').stream,
  angularFilesort = require('gulp-angular-filesort');

// self
var conf = require('./conf.js');
var util = require('./util.js');

gulp.task('inject', ['styles'], function () {
  return gulp.src(conf.paths.src + '/index.html')
    // 往index.html注入index.css
    .pipe(inject(gulp.src(conf.paths.serve + '/*.css'), {
      ignorePath: conf.paths.serve, //忽略的路径
      addRootSlash: false
    }))
    // 往index.html注入所有js脚本
    .pipe(inject(gulp.src(util.getNgScriptPattern(conf.paths.src))
        .pipe(angularFilesort()), {
      ignorePath: conf.paths.src, //忽略的路径。这里忽略掉src
      addRootSlash: false
    }))
    .pipe(wiredep(conf.wiredep))  //自动注入bower包
    .pipe(gulp.dest(conf.paths.serve));
});
