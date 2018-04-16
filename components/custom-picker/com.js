Component({
    properties: {
        range: Array,
        active: Boolean,
        value: Array
    },
    methods: {
        onColumnChange(e) {
            const index = e.detail.index;
            const column = e.currentTarget.dataset.column;

            this.value[column] = index;
            this.triggerEvent('columnchange', { 
                index,
                column
            });

        },
        move(e) {
            return false;
        },
        ensure(e) {
            this.triggerEvent('change', { value: this.value });
        },
        cancel(e) {
            this.triggerEvent('cancel');
        }
    },
    ready() {
        this.value = this.data.value;
        console.log(this.data.value);
    }
});