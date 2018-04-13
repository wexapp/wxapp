Page({
    data: {
        range: [
            ['中国', '美国', '日本', '韩国', '朝鲜', '意大利', '泰国', '印度', , '美国', '日本', '韩国', '朝鲜', '意大利', '泰国', '印度', , '美国', '日本', '韩国', '朝鲜', '意大利', '泰国', '印度'],
            ['10:05', '10:13', '10:14', '10:17', '10:18', '10:19', '10:21', '1']
        ]
    },
    bindPickerChange: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
            index: e.detail.value
        });
    },
    onColumnChange(e) {
        console.log(e.detail);
    }
});