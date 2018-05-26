Page({
    data: {
        radios: [
            { name: 'china', text: '中国' },
            { name: 'usa', text: '美国' }
        ],
        show: true,
        myProperty: '',
        lis: [1, 12222, 21, 4, 5]
    },
    onChangeText() {
        this.setData({
            'array[0].text': '1111'
        })
    },
    sort() {
        this.setData({ show: !this.data.show });
    },
    onTap() {
        this.setData({ show: false });
    },
    onChange(e) {
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
    },
    onTabItemTap(e) {
        console.log(e);
    }
});