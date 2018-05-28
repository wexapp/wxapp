const path = require('path');
const appRootPath = path.resolve(__dirname, 'src');

module.exports = {
    paths: {
        appRootPath: appRootPath,
        appJsonPath: path.resolve(appRootPath, 'app.json'),
        configJsonPath: path.resolve(appRootPath, 'project.config.json'),
        commonLessPath: path.resolve(appRootPath, 'common/common.less')
    }
};