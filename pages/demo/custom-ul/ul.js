Component({
    relations: {
        '../custom-li/li': {
            type: 'child',
            linked(tar) {
                console.log('parent linked: ', tar);
            },
        }
    },
    methods: {
        _getAllLi() {
            console.log(this.getRelationNodes());
        }
    },
    ready() {
        this._getAllLi();
    }
})