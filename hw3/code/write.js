let fs = require('fs');
function write(name, list) {
    fs.writeFile(name + '.json', JSON.stringify(list), function (err) {
        if (err) {
            return console.log(err);
        }
        console.log('success');
    });
}
module.exports = write;