const write = require("./write");
const HashTable = require('@ronomon/hash-table');
let keySize = 16;
let valueSize = 4;
let elementsMin = 1024; // Optional. Reserve space for at least 1,024 elements.
let elementsMax = 10 ** 7; // Optional. Expect at most 65,536 elements.
let table = new HashTable(keySize, valueSize, elementsMin, elementsMax);

function hashTable() {
    let keyOffset = 0;
    let value = Buffer.alloc(valueSize);
    let valueOffset = 0;
    {
        //新增
        let counter = 0;    //per 1000
        let lasttime = 0;
        let inserttimelist = [];
        let time = process.hrtime();

        for (let i = 1; i <= Math.pow(10, 7); i++) {
            let b = Math.floor(Math.random() * 10 ** 7) + 1;
            let key = Buffer.alloc(keySize, b);
            table.set(key, keyOffset, value, valueOffset);
            counter++;
            if (counter % 1000 === 0) {
                let diff = process.hrtime(time);
                diff = diff[0] * 1000 + diff[1] / Math.pow(10, 6); //毫秒
                inserttimelist.push((diff - lasttime).toFixed(3));
                lasttime = diff;
                console.log(counter + 'a')
            }
        }
        write('hashtable1', inserttimelist);
    }
    {
        // 搜尋
        let counter = 0;    //per 1000
        let time = process.hrtime();
        let finddatalist = [];
        for (let i = 1; i <= Math.pow(10, 5); i++) {
            let b = Math.floor(Math.random() * 10 ** 7) + 1;
            let key = Buffer.alloc(keySize, b);
            table.get(key, keyOffset, value, valueOffset)
            if (counter % 1000 === 0) console.log(counter + 'b')
        }
        let diff = process.hrtime(time);
        diff = diff[0] * 1000 + diff[1] / Math.pow(10, 6); //毫秒
        finddatalist.push(diff)
        write('hashtable2', finddatalist);
    }
}

module.exports = hashTable;

