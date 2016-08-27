var gulp = require('gulp'),
  karmaServer = require('karma').Server;

// self
var conf = require('./conf.js');

gulp.task('test', ['lint'], function () {
  new karmaServer({
    configFile: __dirname + '/../karma.conf.js',
    singleRun: true
  }).start();
});
