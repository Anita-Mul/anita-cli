'use strict';
const fs = require('fs');
const path = require('path');
const program = require('commander');
const userHome = require('user-home');
const colors = require('colors/safe');
const { log, npm } = require('@imooc-cli/utils');
const packageConfig = require('../package');

const {
    LOWEST_NODE_VERSION,
    DEFAULT_CLI_HOME,
    NPM_NAME,
    DEPENDENCIES_PATH,
} = require('../libs/const');

module.exports = cli;

let args;
let config;

async function cli() {
    try {
        await prepare();
        registerCommand();
    } catch (e) {
        log.error(e.message);
    }
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

async function prepare() {
    checkPkgVersion();          // 检查当前运行版本
    checkNodeVersion();         // 检查 node 版本
    checkRoot();                // 检查是否为 root 启动
    checkUserHome();            // 检查用户主目录
    checkInputArgs();           // 检查用户输入参数
    checkEnv();                 // 检查环境变量
    await checkGlobalUpdate();     // 检查工具是否需要更新
}

async function checkGlobalUpdate() {
    log.verbose('检查 imooc-cli 最新版本');
    const lastVersion = await npm.getNpmLatestSemverVersion(NPM_NAME, packageConfig.version);
    if (lastVersion) {
      log.warn(colors.yellow(`请手动更新 ${NPM_NAME}，当前版本：${packageConfig.version}，最新版本：${lastVersion}
                  更新命令： npm install -g ${NPM_NAME}`));
    }
}

function checkEnv() {
    log.verbose('开始检查环境变量');
    const dotenv = require('dotenv');
    dotenv.config({
      path: path.resolve(userHome, '.env'),
    });
    config = createCliConfig(); // 准备基础配置
    log.verbose('环境变量', config);
}
  
function createCliConfig() {
    const cliConfig = {
      home: userHome,
    };
    if (process.env.CLI_HOME) {
      cliConfig['cliHome'] = path.join(userHome, process.env.CLI_HOME);
    } else {
      cliConfig['cliHome'] = path.join(userHome, DEFAULT_CLI_HOME);
    }
    return cliConfig;
}

function checkInputArgs() {
    log.verbose('开始校验输入参数');
    const minimist = require('minimist');
    args = minimist(process.argv.slice(2)); // 解析查询参数
    checkArgs(args);                        // 校验参数
    log.verbose('输入参数', args);
}

function checkArgs(args) {
    if (args.debug) {
      process.env.LOG_LEVEL = 'verbose';
    } else {
      process.env.LOG_LEVEL = 'info';
    }
    log.level = process.env.LOG_LEVEL;
}

function checkUserHome() {
    if (!userHome || !fs.existsSync(userHome)) {
      throw new Error(colors.red('当前登录用户主目录不存在！'));
    }
}

function checkRoot() {
    const rootCheck = require('root-check');
    rootCheck(colors.red('请避免使用 root 账户启动本应用'));
}
  
function checkNodeVersion() {
    const semver = require('semver');
    if (!semver.gte(process.version, LOWEST_NODE_VERSION)) {
      throw new Error(colors.red(`imooc-cli 需要安装 v${LOWEST_NODE_VERSION} 以上版本的 Node.js`));
    }
}

function checkPkgVersion() {
    log.success('欢迎使用慕课网前端统一脚手架');
    log.success('当前运行版本', packageConfig.version);
}
  
