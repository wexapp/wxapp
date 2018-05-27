const page = `
Page({
    data: {},
    onShow() {}
});
`;

const com = `
Component({
    relations: {},
    properties: {},
    options: {},
    methods: {},
    ready() {}
});
`;

const pageJson = '{}';
const comJson = `
{
    "component": true
}
`;

const less = `import "/common/common.less";`;

const wxml = `
<view class="wrapper">

</view>
`;

module.exports = {
    page: page,
    com: com,
    less: less,
    pageJson: pageJson,
    comJson: comJson,
    wxml: wxml
};