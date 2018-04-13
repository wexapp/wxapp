Component({
    data: {
        animationData: {}
    },
    methods: {
        touchstart(e) {
            this.clientY = e.touches[0].clientY;
            this.starTime = e.timeStamp;
        },
        touchmove(e) {
            this.diffY = e.touches[0].clientY - this.clientY;

            // 让目标跟随手指滑动
            this.animation.translate3d(0, this.top + this.diffY / this.pixelRatio, 0).step();
            this.setData({
                animationData: this.animation.export()
            });
            
        },
        touchend(e) {
            // 记录手指滑动时间，用来计算缓冲距离
            this.time = e.timeStamp - this.starTime;
            const bufferFactor = (Math.abs(this.diffY) / this.time) * 5;

            
            const topMod = (this.top % (90 / this.pixelRatio));
            const minHeight = this.itemHeight + this.initialTranlateY;

            this.top = this.top + this.diffY / this.pixelRatio * bufferFactor;
            
            if(topMod < this.itemHeight / this.pixelRatio / 2) {
                this.top = Math.floor(this.top / (this.itemHeight / this.pixelRatio)) * this.itemHeight / this.pixelRatio;
            } else {
                this.top = Math.ceil(this.top / (this.itemHeight / this.pixelRatio)) * this.itemHeight / this.pixelRatio;
            }
            

            if(this.top > this.initialTranlateY / this.pixelRatio) {
                this.top = this.initialTranlateY / this.pixelRatio;
            }

            if(this.top < -(this.height - minHeight / this.pixelRatio)) {
                this.top = -(this.height - minHeight / this.pixelRatio);
            }

            if(this.height <= minHeight / this.pixelRatio) {
                this.top = Math.max(this.top, minHeight / this.pixelRatio - this.height);
            }

            this.animation.translate3d(0, this.top, 0).step({ duration: 300 });
            this.setData({
                animationData: this.animation.export()
            });
        }
    },
    ready() {
        const device = wx.getSystemInfoSync();

        this.pixelRatio = 750 / device.windowWidth;



        this.itemHeight = 90;
        this.initialTranlateY = 270;

        this.top = this.initialTranlateY / this.pixelRatio;

        const animation = wx.createAnimation({
            duration: 0,
            timingFunction: 'ease',
        });
    
        this.animation = animation;



        const query = wx.createSelectorQuery().in(this)
        query.select('#flex-wrapper').boundingClientRect((res) => {
            this.height = res.height;
            console.log(res);
        }).exec();
    }
});