Component({
    relations: {
        '../custom-ul/ul': {
            type: 'parent',
            linked(tar) {
                console.log('child linked: ', tar);
            }
        }
    }
})