'use strict';
const program = require('commander');
const { log } = require('@imooc-cli/utils');
const packageConfig = require('../package');

module.exports = cli;

async function cli() {
    await registerCommand();
}

function registerCommand() {
    program.version(packageConfig.version, '-v, -V, --version').usage('<command> [options]');

    program
        .command('learn')
        .description('前端脚手架学习')
        .action(() => {
            log.success('欢迎学习', '前端脚手架');
            log.success('作者介绍', 'yanxuefang');
        });
    
    program.parse(process.argv);
}