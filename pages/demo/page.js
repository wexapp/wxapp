Page({
    data: {
        active: false,
        value: 0,
    },
    onChoose(e) {
        this.setData({ active: !e.detail.active });
    },
    onPageScroll(e) {
        this.publishScrollEvent && this.publishScrollEvent(e);
    },
    onNavBarDidmount(e) {
        this.publishScrollEvent = e.detail.onload;
    },
})