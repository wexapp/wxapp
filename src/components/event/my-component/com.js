const behavior = require('../../../behaviors/test');

Component({
    properties: {
        title: String
    },
    behaviors: [behavior, 'wx://form-field'],
    methods: {
        mylis(e) {
            console.log(e);
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