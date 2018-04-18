const config = {
    type: Object,
    value: {},
    observer() {
        // 值发生变化需要更新ui
        this.update();
    }
};

Component({
    properties: {
        config: config
    },
    data: {
        animationData: {}
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
            let rangeLength = this.data.config.range.length;
            let flexHeight = this.itemHeight * rangeLength;

            // 记录手指滑动时间，用来计算缓冲距离
            this.time = e.timeStamp - this.starTime;
            const bufferFactor = Math.abs(this.diffY) / this.time * 5;

            this.top = this.top + this.diffY / this.pixelRatio * Math.max(bufferFactor, 1);
            
            // 太过于往下滚了，第一个都掉下去了，这里没有计算index，所以要优先判断
            if(this.top > this.initialTopValue) {
                this.top = this.initialTopValue;
            }

            index = Math.round(Math.abs(this.initialTopValue - this.top) / this.itemHeight);
            this.top = this.initialTopValue - index * this.itemHeight + this.correctValue * index;
           
            // 这是滚到底部了
            if(this.top < -(flexHeight - this.minHeight)) {
                this.top = -(flexHeight - this.minHeight);
                index = rangeLength - 1;
            }

            this.animation.translate3d(0, this.top, 0).step({ duration: Math.min(50 * rangeLength, 1000) });
            this.setData({
                animationData: this.animation.export(),
                activeIndex: index
            });
            
            this.triggerEvent('columnchange', { index: index });
        },
        update() {
            if(!this.animation) return;
            const value = this.data.config.value || 0;

            this.top = this.initialTopValue - value * this.itemHeight + this.correctValue * value;
            this.animation.translate3d(0, this.top, 0).step({ duration: 300 });
            this.setData({
                // transYValue: this.top,
                activeIndex: value,
                animationData: this.animation.export()
            });
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
        this.animation = wx.createAnimation({
            duration: 0,
            timingFunction: 'ease',
        });
        
        this.update();
    }
});