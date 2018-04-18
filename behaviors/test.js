module.exports = Behavior({
    behaviors: [],
    properties: {
        myBehavior: {
            type: String,
            value: ''
        },
        age: Number
    },
    methods: {
        send() {
            console.log(this.data);
        }
    },
    attached() {
        console.log('acttached');
    }
})