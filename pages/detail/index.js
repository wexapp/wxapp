const obj = require('../../utils/util').aa;
const userlist = [
    {
        text: '杨幂',
        score: 38
    }, {
        text: '柳岩',
        score: 43
    }, {
        text: '球球',
        score: 39
    }
];

Page({
    data: {
        count: 1,
        activeIndex: 0,
        userlist: userlist,
        isActive: false
    },
    sort(e) {
        console.log(e);
        const { activeIndex, isActive } = e.detail;
        const obj = {}
        if(activeIndex !== void 0) {
            obj.activeIndex = activeIndex;
        }
        obj.isActive = !isActive;
        this.setData(obj);
    },
    onloadtap(e) {
        this.publishScrollEvent = e.detail.onload;
    },
    onPageScroll(e) {
        this.publishScrollEvent && this.publishScrollEvent(e);
    }
});