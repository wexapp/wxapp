Component({
    properties: {
        value: String
    },
    behaviors: ["wx://form-field"],
    methods: {
        submit(e) {
            console.log(e);
        }
    },
    ready() {
        console.log(this.data);
    }
});