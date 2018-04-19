Component({
    properties: {
        range: {
            type: Array,
            value: [],
            observer(newValue, oldValue) {
                if(!this.didMount) return;
                // 这里也需要监视range长度变化，避免出现无效值
                this.update();
            }
        },
        active: Boolean,
        value: Array
    },
    data: {
        tmpValue: []
    },
    methods: {
        onColumnChange(e) {
            const index = e.detail.index;
            const column = e.currentTarget.dataset.column;
            this.update();

            // 变化的列要更新
            this.data.tmpValue[column] = index;
            
            this.triggerEvent('columnchange', { 
                index,
                column
            });
            this.setData({ tmpValue: this.data.tmpValue });
        },
        update() {
            // 这是为了其他列变短时能够取到值，否则原来value是10，变短后列长度变成2，10就是非法值了，在此更新
            this.data.tmpValue = this.data.tmpValue.map((item, i) => {
                if(item > this.data.range[i].length - 1) {
                    return this.data.range[i].length - 1;
                } else {
                    return item;
                }
            });

            this.setData({ tmpValue: this.data.tmpValue });
        },
        ensure(e) {
            this.triggerEvent('change', { value: this.data.tmpValue });
        },
        cancel(e) {
            this.triggerEvent('cancel');
        }
    },
    attached() {
        // tmpValue暂存原始传入的value，传给下面的子组件
        this.setData({ tmpValue: this.data.value });
    },
    ready() {
        this.didMount = true;
    }
});