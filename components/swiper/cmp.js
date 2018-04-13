let a = 1;
Component({
    options: {
        multipleSlots: true
    },
    properties: {
        frames: Array
    },
    data: {
        left: 0,
        animationData: {}
    },
    methods: {
        touchstart(e) {
            this.clientX = e.touches[0].clientX;
        },
        touchmove(e) {
            this.diffX = e.touches[0].clientX - this.clientX;
            // 在这链式调用上添加动画时间
            this.animation.translate(Math.min(this.left + this.diffX, 0)).step();
            this.setData({
                animationData: this.animation.export()
            });
            
        },
        touchend(e) {
            this.left += this.diffX;
            console.log(this.animation.export());
            if(this.left >= 0) {
                this.left = 0;
            }
        }
    },
    ready() {
        const animation = wx.createAnimation({
            duration: 0,
            timingFunction: 'ease',
        });
    
        this.animation = animation;

        this.left = 0;
    }
});