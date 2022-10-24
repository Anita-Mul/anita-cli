'use strict';
const { log, inquirer } = require('@imooc-cli-yan/utils');
const getProjectTemplate = require('./getProjectTemplate');

async function init(options) {
    try {
        // 设置 targetPath
        // C:\Users\小可爱\Desktop\imook-course\IMOOC-CLI-yan\packages\init\lib
        let targetPath = process.cwd();
        if (!options.targetPath) {
            options.targetPath = targetPath;
        }
        log.verbose('init', options);
        // 完成项目初始化的准备和校验工作
        const result = await prepare(options);
        if (!result) {
            log.info('创建项目终止');
            return;
        }
        // 获取项目模板列表
        const { templateList } = result;
        console.log(templateList);
    } catch (e) {
        log.error('Error:', e.message);
    }
}

async function prepare(options) {
    let fileList = fs.readdirSync(process.cwd());
    fileList = fileList.filter(file => ['node_modules', '.git', '.DS_Store'].indexOf(file) < 0);
    log.verbose('fileList', fileList);
    let continueWhenDirNotEmpty = true;
    if (fileList && fileList.length > 0) {
        continueWhenDirNotEmpty = await inquirer({
            type: 'confirm',
            message: '当前文件夹不为空，是否继续创建项目？',
            defaultValue: false,
        });
    }
    if (!continueWhenDirNotEmpty) {
        return;
    }
    if (options.force) {
        const targetDir = options.targetPath;
        const confirmEmptyDir = await inquirer({
            type: 'confirm',
            message: '是否确认清空当下目录下的文件',
            defaultValue: false,
        });
        if (confirmEmptyDir) {
            fse.emptyDirSync(targetDir);
        }
    }

    const templateList = await getProjectTemplate();
    if (!templateList || templateList.length === 0) {
        throw new Error('项目模板列表获取失败');
    }

    return {
        templateList,
    };
}

function createTemplateChoice(list) {
    return list.map(item => ({
      value: item.npmName,
      name: item.name,
    }));
}

// test init function
init({});
module.exports = init;
