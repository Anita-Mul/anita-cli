const { request } = require('@imooc-cli-yan/utils');

module.exports = function() {
  return request({
    url: '/project/template',
  });
};
