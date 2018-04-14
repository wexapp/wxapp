Component({
    properties: {
        range: Array,
        active: Boolean
    },
    data: {
        active: false
    },
    methods: {
        onColumnChange(e) {
            this.triggerEvent('columnchange', { index: e.detail.index });
        },
        empty() {},
        ensure(e) {
            this.triggerEvent('change');
        },
        cancel(e) {
            this.triggerEvent('cancel');
        }
    },
    ready() {

    }
});