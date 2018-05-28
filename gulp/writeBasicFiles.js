const fs = require('fs');
const path = require('path');
const tmpl = require('./templates');
const PATHS = require('../config').paths;

module.exports = (fileDir, fileName, isPage = true) => {
    const filePath = `${fileDir + '/' + fileName}`;
    const commonJSONPath = path.relative(fileDir, PATHS.commonLessPath);

    fs.writeFileSync(`${filePath}.js`, tmpl[isPage ? 'page' : 'com']);
    fs.writeFileSync(`${filePath}.less`, `@import "${commonJSONPath}";`);
    fs.writeFileSync(`${filePath}.json`, tmpl[isPage ? 'pageJson' : 'comJson']);
    fs.writeFileSync(`${filePath}.wxml`, tmpl.wxml);
};