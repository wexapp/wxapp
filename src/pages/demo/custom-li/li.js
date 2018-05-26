Component({
    properties: {
        value: String
    },
    relations: {
        '../custom-ul/ul': {
            type: 'parent',
            linked(tar) {
                console.log('child linked: ', tar);
            }
        }
    },
    ready() {
        console.log('li value', this.data.value);
    },
    moved() {
        console.log('moved...............')
    }
})