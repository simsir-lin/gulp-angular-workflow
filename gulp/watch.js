var gulp = require('gulp'),
  browserSync = require('browser-sync'),
  browserSyncReload = browserSync.reload;

gulp.task('watch', function () {
  gulp.watch("src/app/**/*.scss", function () {
    gulp.start('styles-reload');
  });

  gulp.watch("src/app/**/*.html", function(event) {
    browserSyncReload(event.path);
  });

  gulp.watch(['src/app/**/*.js', '!src/app/**/*.test.js'], function(event) {
    browserSyncReload(event.path);
  });

});
