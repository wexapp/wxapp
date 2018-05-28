const path = require('path');
const fs = require('fs');
const PATHS = require('../config').paths;

module.exports = {
    add(fileDir, fileName) {
        const appJson = JSON.parse(fs.readFileSync(PATHS.appJsonPath, { encoding: 'utf8' }));
        const pathName = path.relative(PATHS.appRootPath, fileDir + '/' + fileName);
        // 把新加的页面写入app.json
        appJson.pages.push(pathName);

        fs.writeFileSync(PATHS.appJsonPath, JSON.stringify(appJson, null, 4));
    }, 
    del(fileDir) {
        const appJson = JSON.parse(fs.readFileSync(PATHS.appJsonPath, { encoding: 'utf8' }));
        const pathName = path.relative(PATHS.appRootPath, fileDir);
        const reg = new RegExp('^' + pathName);

        // 把删除的文件夹下的所有页面从app.json中移除
        const pages = appJson.pages.filter(item => {
            return !reg.test(item);
        });

        appJson.pages = pages;
        fs.writeFileSync(PATHS.appJsonPath, JSON.stringify(appJson, null, 4));
    }
};