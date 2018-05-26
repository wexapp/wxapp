Component({
    properties: {
        active: Boolean,
        sorts: Array,
        value: Number
    },
    methods: {
        sorttap: function (e) {
            console.log(e)
            this.triggerEvent('choose', { active: this.data.active });
        },
        itemtap: function (e) {
            const value = e.currentTarget.dataset.unique;

            this.triggerEvent('choose', { active: this.data.active, value });
        },
        move() {
            return false;
        }
    }
});