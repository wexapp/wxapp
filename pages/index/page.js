import { navs, imgs, commoditys } from '../../data/index';

Page({
    data: {
        navbar: {
            navs: navs,
            value: 0
        },
        imgs: imgs,
        commoditys: commoditys
    },
    onLoad() {

    },
    onNavChange(e) {
        this.data.navbar.value = e.detail.value;
        this.setData({navbar: this.data.navbar});
    },
    onNavBarDidmount(e) {
        this.publishScrollEvent = e.detail.onload;
    },
    onPageScroll(e) {
        this.publishScrollEvent && this.publishScrollEvent(e);
    },
    onPullDownRefresh() {
        setTimeout(() => {
            wx.stopPullDownRefresh();
        }, 1000)
    }
});