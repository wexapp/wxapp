Component({
    properties: {
        tabs: Array,
        value: Number
    },
    methods: {
        onItemTap(e) {
            const index = e.currentTarget.dataset.index;

            this.triggerEvent('change', { value: index });
        }
    }
});