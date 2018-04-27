Page({
    data: {
        radios: [
            { name: 'china', text: '中国' },
            { name: 'usa', text: '美国' }
        ],
        myProperty: ''
    },
    onChangeText() {
        this.setData({
            'array[0].text': '1111'
        })
    },
    onChange(e) {
        console.log(e);
    },
    getUserInfo(e) {
        console.log(e);
    },
    action() {
        console.log('action');
    },
    change(e) {
        this.num = this.num || 1;
        this.setData({ myProperty:  this.num++});
    },
    onLoad(e) {
        console.log('Page onload: ', e);
    },
    onShow(e) {
        console.log('Page onshow: ', e);
    },
    onHide(e) {
        console.log('Page onhide: ', e);
    },
    onReady(e) {
        console.log('Page onready: ', e);
    },
    onReachBottom(e) {
        console.log('Page onReachBottom: ', e);
    },
    onShareAppMessage(e) {
        console.log(e);
    }
});