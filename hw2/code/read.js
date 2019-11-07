let fs = require('fs');
let list = null;
fs.readFile('skiplist1.json',function (err, data) {
    if (err) throw err;
    list = JSON.parse(data);
    console.log(list.length)
})
// data = JSON.parse(data);
// console.log(data.length)
