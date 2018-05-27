const fs = require('fs');

const files = fs.readdirSync('./src');

console.log(files);