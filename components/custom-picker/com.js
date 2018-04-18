Component({
    properties: {
        range: Array,
        active: Boolean,
        value: {
            type: Array,
            value: [],
            observer(newValue) {
                this.value = [...newValue];
            }
        }
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
    }
});