const behavior = require('../../../behaviors/test');

Component({
    behaviors: [behavior],
    methods: {
        mylis() {
            this.triggerEvent('customevent', {}, { bubbles: true, composed: true });
        }
    }
})