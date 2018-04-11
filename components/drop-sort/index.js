Component({
    properties: {
        isActive: Boolean,
        sorts: Array,
        activeIndex: Number
    },
    methods: {
        sorttap: function () {
            this.triggerEvent('choose', { isActive: this.data.isActive });
        },
        itemtap: function (e) {
            const activeIndex = e.currentTarget.dataset.unique;

            this.triggerEvent('choose', { isActive: this.data.isActive, activeIndex });
        }
    }
});