exports.paths = {
  serve: '.tmp/serve',
  src: 'src',
  dist: 'dist'
};

exports.wiredep = {
  exclude: [],
  directory: 'bower_components'
};

exports.web = {
  root: 'https://wx.xinzhibang168.com/mobile'
};

exports.routes = {
  '/bower_components': 'bower_components',
  '/images': 'src/images',
  'https://wx.xinzhibang168.com/mobile': 'src/images',
  '/fonts': 'bower_components/bootstrap-sass/assets/fonts',
  '/public': 'https://wx.xinzhibang168.com/public'
};
