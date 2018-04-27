Component({
    properties: {
        range: {
            type: Array,
            value: [],
            observer: 'update'
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

            // 变化的列要更新
            
            this.triggerEvent('columnchange', { 
                index,
                column
            });
            // 这里无需setData， 父级更新会带动这里
            this.data.tmpValue[column] = index;
        },
        update() {
            if(!this.didMount) return;

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
        },
        move() {
            return false;
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

// 还有一种方案，在列变的时候修正超出范围的value