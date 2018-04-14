Component({
    options: {
        multipleSlots: true
    },
    properties: {
        range: Array,
        active: Boolean,
        value: Array
    },
    methods: {
        bindChange(e) {
            const value = e.detail.value;

            for(let i = 0, len = value.length; i < len; i++) {
                if(value[i] !== this.value[i]) {
                    this.value = value;
                    this.triggerEvent('columnchange', { column: i, value: value[i] });
                    break;
                }
            }

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
    }
})