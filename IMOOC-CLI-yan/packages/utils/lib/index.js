'use strict';

const log = require('./log');
const request = require('./request');
const npm = require('./npm');
const inquirer = require('./inquirer');
const formatPath = require('./formatPath');
const spinner = require('./spinner');

const Package = require('./Package');

function sleep(timeout) {
  return new Promise((resolve => {
    setTimeout(resolve, timeout);
  }));
}

module.exports = {
  log,
  request,
  npm,
  formatPath,
  spinner,
  inquirer,
  Package,
  sleep
};
