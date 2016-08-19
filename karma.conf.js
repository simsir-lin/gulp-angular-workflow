var wiredep = require('wiredep'),
  conf = require('./gulp/conf.js');

function getFiles() {
  var wiredepOptions = conf.wiredep;

  var patterns = wiredep(wiredepOptions).js
    .concat([
      conf.paths.src + '/**/*.module.js',
      conf.paths.src + '/**/*.js',
      conf.paths.src + '/**/*.test.js'
    ])
    .concat([conf.paths.src + '/**/*.html']);

  var files = patterns.map(function(pattern) {
    return {
      pattern: pattern
    };
  });
  return files;
}

module.exports = function(config) {
  config.set({
    browsers: ['PhantomJS'],
    frameworks: ['jasmine'],
    files: getFiles(),
    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine'
    ]
  });
};
