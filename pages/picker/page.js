Page({
    data: {
        array: ['美国', '中国', '巴西', '日本'],
    },
    bindPickerChange: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            index: e.detail.value
        });
    },
    handle(e) {
        console.log(e);
    },
    onLoad(e) {
        this.handle(e);
    }
});