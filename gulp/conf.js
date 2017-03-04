exports.paths = {
  serve: '.tmp/serve',
  src: 'src',
  dist: 'dist'
};

exports.wiredep = {
  exclude: [],
  directory: 'bower_components'
};

exports.routes = {
  '/bower_components': 'bower_components',
  '/images': 'src/images',
  '/fonts': 'bower_components/bootstrap-sass/assets/fonts'
};

exports.angular = {
  module: 'myApp'
};
