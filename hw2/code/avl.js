const Tree = require('avl');
const write = require("./write");
const t = new Tree();
function avl() {
    {
        let counter = 0;    //per 1000
        let lasttime = 0;
        let inserttimelist = [];
        let time = process.hrtime();
        for (let i = 1; i <= Math.pow(10, 7); i++) {
            let b = Math.floor(Math.random() * 10 ** 7) + 1;
            t.insert(b);
            counter++;
            if (counter % 1000 === 0) {
                let diff = process.hrtime(time);
                diff = diff[0] * 1000 + diff[1] / Math.pow(10, 6); //毫秒
                inserttimelist.push((diff - lasttime).toFixed(3));
                lasttime = diff;
                console.log(counter + 'a')
            }
        }
        write('avl1', inserttimelist);
    }
    {
        let counter = 0;    //per 1000
        finddatalist = [];
        let time = process.hrtime();
        for (let i = 1; i <= Math.pow(10, 5); i++) {
            let b = Math.floor(Math.random() * 10 ** 7) + 1;
            t.find(b);
            if (counter % 1000 === 0) console.log(counter + 'b')
        }
        let diff = process.hrtime(time);
        diff = diff[0] * 1000 + diff[1] / Math.pow(10, 6); //毫秒
        finddatalist.push(diff)
        write('avl2', finddatalist);
    }
}
module.exports = avl;
