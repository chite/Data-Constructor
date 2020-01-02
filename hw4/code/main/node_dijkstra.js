const Graph = require('node-dijkstra');
let randomNode = function () { return Math.floor(Math.random() * 1000) };  //0-999
const route = new Graph()
for (let i = 0; i < 1000; i++) {
    let j = i + 1 > 999 ? 0 : i + 1;
    route.addNode(String(i), { [j]: 1 });
}
// 4. Which implementation of Dijkstra's Algorithm is the fastest?

let counts = 200;
let timeAdd = 0;
for (let i = 0; i < 100; i++) {
    let ranA = randomNode();
    let ranB = randomNode();
    route.addNode(String(ranA), { [ranB]: 1 });
}
let lasttime = 0;
let time = process.hrtime();
for (let i = 0; i < counts; i++) {
    let ranA = randomNode();
    let ranB = randomNode();
    route.path(String(ranA), String(ranB));
    let diff = process.hrtime(time);
    diff = diff[0] * 1000 + diff[1] / Math.pow(10, 6); //毫秒
    timeAdd += (diff - lasttime);
    lasttime = diff;
}
console.log('實驗有' + counts + '次測試來平均，結果速度為' + String(timeAdd / counts) + '毫秒');