var gulp = require('gulp'),
  browserSync = require('browser-sync');

// self
var conf = require('./conf.js');

gulp.task('serve', ['watch', 'inject'], function () {
  // 从项目的serve目录和src目录启动服务器
  browserSyncStart([conf.paths.serve, conf.paths.src]);
});

gulp.task('serve:dist', ['watch', 'inject'], function () {
  browserSyncStart(conf.paths.dist);
});

function browserSyncStart(baseDir) {
  browserSync.init({
    startPath: '/',
    server: {
      baseDir: baseDir,
      routes: {
        '/bower_components': 'bower_components'
      }
    },
    browser: 'default'
  });
}
