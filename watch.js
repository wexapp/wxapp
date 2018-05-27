const fs = require('fs');
var chokidar = require('chokidar')
const tmpl = require('./tmpl');
const PATH = require('path');

var watcher = null;
var ready = false;


module.exports.watch = function (dir) {
    function addDirecotryListener(path) {
        if(!ready) return;
        const endStr = path.match(/[\w\$-]+$/) || [''];

        const files = fs.readdirSync(path);
        // 判断非空目录, 除去.开头的文件
        if(files.length > 0) return;
        
        const [alias, flag] = endStr[0].split('-');
        const newPath = path.split('-')[0];
        
        if(/page$/.test(path)) {
            const name = flag && alias || 'page';
            const filePath = `${path + '/' + name}`;
            const commonJSONPath = PATH.relative(path, dir + '/common/common.less');
            console.log(commonJSONPath)

            // newPath !== path && fs.renameSync(path, newPath);
            fs.writeFileSync(`${filePath}.js`, tmpl.page);
            fs.writeFileSync(`${filePath}.less`, `@import "${commonJSONPath}";`);
            fs.writeFileSync(`${filePath}.json`, tmpl.pageJson);
            fs.writeFileSync(`${filePath}.wxml`, tmpl.wxml);

            const appJson = JSON.parse(fs.readFileSync(dir + '/app.json', { encoding: 'utf8' }));
            const pathName = PATH.relative(dir, filePath);
            appJson.pages.push(pathName);
            fs.writeFileSync(dir + '/app.json', JSON.stringify(appJson, null, 4));

            const configJson = JSON.parse(fs.readFileSync(dir + '/project.config.json', { encoding: 'utf8' }));
            const miniprogram = configJson.condition.miniprogram;

            miniprogram.list.push({
                id: Date.now(),
                name: name,
                pathName: pathName,
                query: ''
            });

            miniprogram.current = miniprogram.list.length - 1;
            fs.writeFileSync(dir + '/project.config.json', JSON.stringify(configJson, null, 4));
        } else if(/comp?$/.test(path)) {
            const name = flag && alias || 'com';
            const filePath = `${path + '/' + name}`;

            fs.writeFileSync(`${filePath}.js`, tmpl.com);
            fs.writeFileSync(`${filePath}.less`, tmpl.less);
            fs.writeFileSync(`${filePath}.json`, tmpl.comJson);
            fs.writeFileSync(`${filePath}.wxml`, tmpl.wxml);
        }
    }

    // 文件内容改变时
    function fileChangeListener(path_) {
        console.log('File', path_, 'has been changed')
    }

    // 删除文件时，需要把文件里所有的用例删掉
    function fileRemovedListener(path_) {
        console.log('File', path_, 'has been removed')
    }

    // 删除目录时
    function directoryRemovedListener(delDir) {
        const appJson = JSON.parse(fs.readFileSync(dir + '/app.json', { encoding: 'utf8' }));
        const pathName = PATH.relative(dir, delDir)
        const reg = new RegExp('^' + pathName);
        const pages = appJson.pages.filter(item => {
            return !reg.test(item);
        });

        appJson.pages = pages;
        fs.writeFileSync(dir + '/app.json', JSON.stringify(appJson, null, 4));

        const configJson = JSON.parse(fs.readFileSync(dir + '/project.config.json', { encoding: 'utf8' }));
        const miniprogram = configJson.condition.miniprogram;

        miniprogram.list = miniprogram.list.filter(item => {
            return !reg.test(item.pathName);
        });

        miniprogram.current = -1;
        fs.writeFileSync(dir + '/project.config.json', JSON.stringify(configJson, null, 4));
    }

    if (!watcher) {
        watcher = chokidar.watch(dir);
    }
    
    watcher
        .on('addDir', addDirecotryListener)
        .on('change', fileChangeListener)
        .on('unlink', fileRemovedListener)
        .on('unlinkDir', directoryRemovedListener)
        .on('error', function (error) {
            console.info('Error happened', error);
        })
        .on('ready', function () {
            console.info('Initial scan complete. Ready for changes.');
            ready = true
        });
};