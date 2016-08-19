// 返回 获取angular文件不获取测试文件的匹配条件
exports.getNgScriptPattern = function (path) {
  var fullPath = '';
  if (path) {
    fullPath = path + '/';
  }
  return [fullPath + '**/*.js', '!' + fullPath + '**/*.test.js'];
};
