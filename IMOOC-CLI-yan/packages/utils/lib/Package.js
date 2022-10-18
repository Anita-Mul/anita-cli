const fs = require('fs');
const path = require('path');
const npminstall = require('npminstall');
const fse = require('fs-extra');

const log = require('./log');
const npm = require('./npm');
class Package {
    constructor(options) {
      log.verbose('options', options);
      this.targetPath = options.targetPath;
      this.storePath = options.storePath;
      this.packageName = options.name;
      this.packageVersion = options.version;
      this.npmFilePath = path.resolve(this.storePath, `_${this.packageName}@${this.packageVersion}@${this.packageName}`);
    }

    prepare() {
      if (!fs.existsSync(this.targetPath)) {
        fse.mkdirpSync(this.targetPath);
      }
      if (!fs.existsSync(this.storePath)) {
        fse.mkdirpSync(this.storePath);
      }
      log.verbose(this.targetPath);
      log.verbose(this.storePath);
    }

    install() {
      this.prepare();
      return npminstall({
        root: this.targetPath,
        storeDir: this.storePath,
        registry: npm.getNpmRegistry(),
        pkgs: [{
          name: this.packageName,
          version: this.packageVersion,
        }]
      });
    }

    exists() {
      return fs.existsSync(this.npmFilePath);
    }
}
  
module.exports = Package;