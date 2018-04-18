Component({
    properties: {
        flag: {
            type: String,
            value: '',
            observer(newV, oldV) {
                // console.log('observer: ', newV, oldV);
                // if(!this.animation) return;
                // this.animation.translate3d(0, 0, 0).step({ duration: 100 });
                // this.setData({
                //     animationData: this.animation.export()
                // });
            }
        }
    },
    methods: {
        touchstart(e) {
            this.clientX = e.touches[0].clientX;
        },
        touchmove(e) {
            this.diffX = e.touches[0].clientX - this.clientX;

            let left = this.left + this.diffX / this.pixelRatio;

            left = Math.max(left, -1.5 * this.minLeft);
            left = Math.min(left, 1.5 * this.minLeft);

            this.animation.translate3d(left, 0, 0).step();
            this.setData({
                animationData: this.animation.export()
            });
            
        },
        touchend(e) {
            this.left = this.left + this.diffX / this.pixelRatio;

            if(this.left < -0.5 * this.minLeft) {
                this.left = -1 * this.minLeft;
            } else {
                this.left = 0;
            }

            this.animation.translate3d(this.left, 0, 0).step({ duration: 300 });
            this.setData({
                animationData: this.animation.export()
            });
        },
        onDelete(e) {
            this.triggerEvent('delete');
        }
    },
    ready() {
        const device = wx.getSystemInfoSync();

        this.pixelRatio = 750 / device.windowWidth;
        this.animation = wx.createAnimation({
            duration: 0,
            timingFunction: 'ease-in-out',
        });

        this.minLeft = 200 / this.pixelRatio;
        this.maxLeft = 
        this.left = 0;
    },
    moved(e) {
        console.log(e)
    },
    detached(e) {
        console.log('detached: ', this.data.flag);
    },
    attached(e) {
        console.log('attached: ', e)
    },
    created(e) {
        console.log('created: ', e);
    }
});