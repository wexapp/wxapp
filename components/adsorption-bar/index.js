
const componentMethods = {
    init() {
        const query = wx.createSelectorQuery().in(this);

        query.select('#adsorption').boundingClientRect(({ height }) => {
            this.setData({ placeholderEleHeight: height });
        }).exec();
    },
    updatePosition: (() => {
        let isUpdating = false;
        return function () {
            if(isUpdating) return;
            
            isUpdating = true;
            // 时时获取占位元素的top值, 使用节流避免过多更新
            wx.createSelectorQuery()
            .in(this)
            .select('#placeholder')
            .boundingClientRect(({ top }) => {
                this.setData({ placeholderEleTop: top });
                
                setTimeout(() => {
                    isUpdating = false;
                }, 50);
            }).exec();
        }
    })()
};

const componentData = {
    active: false,
    placeholderEleTop: null,
    placeholderEleHeight: 0,
};

Component({
    properties: {
        active: Boolean
    },
    methods: componentMethods,
    data: componentData,
    ready() {
        this.init();
        this.updatePosition();
        this.triggerEvent('subscribe', { onload: this.updatePosition.bind(this) });
    },
    detached() {
        clearTimeout(this.timer);
    }
});