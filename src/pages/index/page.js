import { navs, imgs, commoditys } from '../../data/index';
import request, { regeneratorRuntime } from '../../network/request';
import { toast } from '../../utils/util';

Page({
    data: {
        navbar: {
            navs: navs,
            value: 0
        },
        imgs: imgs,
        commoditys: commoditys
    },
    async onLoad() {
        const res = await request({ url: '/signup' });

        if(res.respCode !== 1000) {
            toast('网络问题', 'loading', 500);
        }
        console.log(res);
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