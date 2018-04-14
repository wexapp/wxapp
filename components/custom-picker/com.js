Component({
    properties: {
        range: Array,
        active: Boolean,
        value: Array
    },
    data: {
        active: false
    },
    methods: {
        onColumnChange(e) {
            const index = e.detail.index;
            const column = e.currentTarget.dataset.column;

            this.triggerEvent('columnchange', { 
                index,
                column
            });

            this.value[column] = index;
        },
        ensure(e) {
            this.triggerEvent('change', { value: this.value });
        },
        cancel(e) {
            this.triggerEvent('cancel');
        }
    },
    ready() {
        this.value = [];
        this.data.range.forEach(item => {
            this.value.push(item.active || 0);
        });
    }
});