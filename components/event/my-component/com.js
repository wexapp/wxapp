const behavior = require('../../../behaviors/test');

Component({
    behaviors: [behavior, 'wx://form-field'],
    methods: {
        mylis() {
            this.triggerEvent('customevent', {}, { bubbles: true, composed: true });
        },
        submit(e, a) {
            console.log(e, a);
        }
    },
    attached() {
        console.log('com attached');
        
    },
    ready() {
        console.log(this.data);
    }
})