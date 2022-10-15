'use strict';
const program = require('commander');

module.exports = cli;

function cli() {
    registerCommand();
}

function registerCommand() {
    console.log(program);
}