'use strict';
const { log } = require('@imooc-cli-yan/utils');
const getProjectTemplate = require('./getProjectTemplate');

async function init(options) {
    try {
        log.verbose('init', options);
        const { templateList } = await prepare();
        console.log(templateList);
        log.verbose('template', templateName);
    } catch (e) {
        log.error('Error:', e.message);
    }
}

async function prepare() {
    const templateList = await getProjectTemplate();
    if (!templateList || templateList.length === 0) {
        throw new Error('项目模板列表获取失败');
    }
    return {
        templateList,
    };
}

module.exports = init;
