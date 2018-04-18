Page({
    data: {
        active: false,
        value: 0,
        arr: [
            { id: 'a', name: 'a' },
            { id: 'b', name: 'b' },
            { id: 'c', name: 'c' },
            { id: 'd', name: 'd' },
            { id: 'e', name: 'e' },
            { id: 'f', name: 'f' },
        ]
    },
    // onChoose(e) {
    //     this.setData({ active: !e.detail.active });
    // },
    // onPageScroll(e) {
    //     this.publishScrollEvent && this.publishScrollEvent(e);
    // },
    // onNavBarDidmount(e) {
    //     this.publishScrollEvent = e.detail.onload;
    // },
    // onDelete(e) {
    //     const id = e.currentTarget.dataset.test;
    //     // this.data.arr = this.data.arr.filter((item) => item.id !== id);
    //     this.data.arr.sort(() => 1)
    //     setTimeout(() => {
    //         this.setData({ arr: this.data.arr });
    //     }, 1000)
    // },
    // open() {
    //     this.setData({ active: true })
    // }
    lsone() {
        console.log('lsone');
    },
    lstwo() {
        console.log('lstwo');
    },
    custom() {
        console.log(1)
        this.triggerEvent('customevent', {}, { bubbles: true, composed: true });
    }
})