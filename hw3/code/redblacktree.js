let createTree = require("functional-red-black-tree");
const write = require("./write");
let tree = createTree();   //初始化資料結構
function redblacktree() {
    {
        //新增
        let counter = 0;    //per 1000
        let lasttime = 0;
        let inserttimelist = [];
        let time = process.hrtime();
        for (let i = 1; i <= Math.pow(10, 7); i++) {
            let b = Math.floor(Math.random() * 10 ** 7) + 1;
            tree = tree.insert(b, 1)
            counter++;
            if (counter % 1000 === 0) {
                let diff = process.hrtime(time);
                diff = diff[0] * 1000 + diff[1] / Math.pow(10, 6); //毫秒
                inserttimelist.push((diff - lasttime).toFixed(3));
                lasttime = diff;
                console.log(counter + 'a')
            }
        }
        write('redblacktree1', inserttimelist);
    }
    {
        // 搜尋
        let counter = 0;    //per 1000
        let time = process.hrtime();
        let finddatalist = [];
        for (let i = 1; i <= Math.pow(10, 5); i++) {
            let b = Math.floor(Math.random() * 10 ** 7) + 1;
            tree.get(b);
            if (counter % 1000 === 0) console.log(counter + 'b')
        }
        let diff = process.hrtime(time);
        diff = diff[0] * 1000 + diff[1] / Math.pow(10, 6); //毫秒
        finddatalist.push(diff)
        write('redblacktree2', finddatalist);
    }
}



module.exports = redblacktree;