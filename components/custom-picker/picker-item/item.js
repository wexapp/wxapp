Component({
    properties: {
        range: Array,
        value: Number
    },
    data: {
        animationData: {},
        transYValue: 0,
    },
    methods: {
        touchstart(e) {
            this.clientY = e.touches[0].clientY;
            this.starTime = e.timeStamp;
            this.isStart = true;
        },
        touchmove(e) {
            this.diffY = e.touches[0].clientY - this.clientY;

            // 让目标跟随手指滑动
            this.animation.translate3d(0, this.top + this.diffY / this.pixelRatio, 0).step();
            this.setData({
                animationData: this.animation.export()
            });
            this.isStart = false;
        },
        touchend(e) {
            if(this.isStart) return;
            let index = 0;
            let rangeLength = this.data.range.length;
            // 记录手指滑动时间，用来计算缓冲距离
            this.time = e.timeStamp - this.starTime;
            const bufferFactor = (Math.abs(this.diffY) / this.time) * 10;

            this.top = this.top + this.diffY / this.pixelRatio * bufferFactor;
            
            if(this.top % this.itemHeight < this.itemHeight / 2) {
                this.top = Math.floor(this.top / this.itemHeight) * this.itemHeight;
            } else {
                this.top = Math.ceil(this.top / this.itemHeight) * this.itemHeight;
            }
            
            // 太过于往下滚了，第一个都掉下去了
            if(this.top > this.initialTopValue) {
                this.top = this.initialTopValue;
            }

            // 这是滚到底部了
            if(this.top < -(this.height - this.minHeight)) {
                this.top = -(this.height - this.minHeight);
                index = rangeLength - 1;
            }

            // 修正index值
            if(index !== rangeLength - 1) {
                index = Math.floor(Math.abs((this.top - this.initialTopValue ) / this.itemHeight));
                // 最后一个top不用修正
                this.top += this.correctValue * index;
            }

            if(this.height <= this.minHeight) {
                this.top = Math.max(this.top, this.minHeight - this.height);
            }

            this.animation.translate3d(0, this.top, 0).step({ duration: Math.min(50 * rangeLength, 1000) });

            this.setData({
                animationData: this.animation.export()
            });
            
            this.triggerEvent('columnchange', { index: index });
        }
    },
    ready(e) {
        const device = wx.getSystemInfoSync();
        this.pixelRatio = 750 / device.windowWidth;

        this.itemHeight = 90 / this.pixelRatio;
        this.minHeight = 360 / this.pixelRatio;
        this.initialTopValue = 270 / this.pixelRatio;

        this.top = this.initialTopValue;
        this.correctValue = this.itemHeight - Math.floor(this.itemHeight);
        const animation = wx.createAnimation({
            duration: 0,
            timingFunction: 'ease',
        });
    
        this.animation = animation;

        const query = wx.createSelectorQuery().in(this)
        query.select('#flex-wrapper').boundingClientRect((res) => {
            const value = this.data.value || 0;

            this.height = res.height;
            this.top = this.initialTopValue - value * this.itemHeight + this.correctValue * value;

            this.setData({
                transYValue: this.top
            });
        }).exec();
    }
});