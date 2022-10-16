'use strict';
const program = require('commander');
const { log } = require('@imooc-cli/utils');

module.exports = cli;

async function cli() {
    await registerCommand();
}

function registerCommand() {
    program
        .command('learn')
        .description('前端脚手架学习')
        .action(() => {
            log.success('欢迎学习', '前端脚手架');
            log.success('作者介绍', 'yanxuefang');
        });
    
    program.parse(process.argv);
}