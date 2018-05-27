const fs = require('fs');
var chokidar = require('chokidar')
const tmpl = require('./tmpl');
const PATH = require('path');

var watcher = null;
var ready = false;

const callBack = (err) => {
    if(err) {
        console.log(err);
        return;
    }
};

module.exports.watch = function (dir) {
    function addDirecotryListener(path) {
        if(!ready) return;
        const endStr = path.match(/[\w\$-]+$/) || [''];

        const files = fs.readdirSync(path);

        if(files.length > 0) return;
        
        const [alias, flag] = endStr[0].split('-');
        const newPath = path.split('-')[0];

        if(/page$/.test(path)) {
            const name = flag && alias || 'page';
            const filePath = `${path + '/' + name}`;

            // newPath !== path && fs.renameSync(path, newPath);

            fs.writeFileSync(`${filePath}.js`, tmpl.page);
            fs.writeFileSync(`${filePath}.less`, tmpl.less);
            fs.writeFileSync(`${filePath}.json`, tmpl.pageJson);
            fs.writeFileSync(`${filePath}.wxml`, tmpl.wxml);

            const appJson = JSON.parse(fs.readFileSync(dir + '/app.json', { encoding: 'utf8' }));
            appJson.pages.push(PATH.relative(dir, filePath));
            fs.writeFileSync(dir + '/app.json', JSON.stringify(appJson, null, 4));
            
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
        const pagePath = PATH.relative(dir, delDir)
        const reg = new RegExp('^' + pagePath);
        const pages = appJson.pages.filter(item => {
            return !reg.test(item);
        });

        appJson.pages = pages;
        fs.writeFileSync(dir + '/app.json', JSON.stringify(appJson));

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