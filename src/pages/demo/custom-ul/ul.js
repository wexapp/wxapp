Component({
    properties: {
        value: String
    },
    relations: {
        '../custom-li/li': {
            type: 'child',
            linked(tar) {
                console.log('parent linked: ', tar);
            },
            unlinked(e) {
                console.log('unlinked: ', e);
            }
        }
    },
    methods: {

    },
    ready() {
        console.log('ul: value', this.data.value);
        console.log('ul ready: ', this.getRelationNodes('../custom-li/li'));
    }
})