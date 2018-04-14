Component({
    properties: {
        range: Array,
        active: Number
    },
    data: {
        active: false
    },
    methods: {
        onColumnChange(e) {
            this.triggerEvent('columnchange', { index: e.detail.index });
        },
        empty() {}
    },
    ready() {
        this.setData({
            active: true
        });
    }
});