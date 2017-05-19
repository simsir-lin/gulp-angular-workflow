var gulp = require('gulp'),
  flatten = require('gulp-flatten'),
  browserSync = require('browser-sync');

// self
var conf = require('./conf.js');

gulp.task('serve', ['watch', 'inject', 'fonts'], function () {
  // 从项目的serve目录和src目录启动服务器
  browserSyncStart([conf.paths.serve, conf.paths.src]);
});

gulp.task('serve:dist', ['watch', 'inject'], function () {
  browserSyncStart(conf.paths.dist);
});

gulp.task('fonts', function () {
  return gulp.src('bower_components/**/*.{eot,svg,ttf,woff,woff2}')
    .pipe(flatten())  //修改路径，这里获取后是有包含bower_components等等，这里将路径改为只有文件名
    .pipe(gulp.dest(conf.paths.serve + '/fonts/'));
});

function browserSyncStart(baseDir) {
  browserSync.init({
    server: {
      baseDir: baseDir,
      routes: conf.routes
    }
  });
}
