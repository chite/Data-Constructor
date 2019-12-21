let Graph = require('./ES6_Dijkstra_algoritms.js');
let graph = new Graph();
let randomNode = function () { return Math.floor(Math.random() * 1000) };  //0-999

for (let i = 0; i < 1000; i++) {
    graph.addVertex(String(i));
}
for (let i = 0; i < 1000; i++) {
    let j = i + 1 > 999 ? 0 : i + 1;
    graph.addEdge(String(i), String(j), 1);
}

let x = 100;    //edge amounts, should be randomed
let y = 150;  //x's edge leight, the whole y shold be the same
let z = 100;    //sample amount,return distance as d

// test 1: What is the relationship between x and d?
let edgesAmount = 0;
while (++edgesAmount < x + 1) {
    for (let i = 0; i < edgesAmount; i++) {
        let ranA = randomNode();
        let ranB = randomNode();
        graph.addEdge(String(ranA), String(ranB), 1);
    }
    let results = 0;
    for (let i = 0; i < 10; i++) {
        let ranA = randomNode();
        let ranB = randomNode();
        let ans = graph.shortestPath(String(ranA), String(ranB)).length;
        results += ans;
    }
    console.log(String('第' + edgesAmount + '次實驗：' + 'edges有' + edgesAmount + '個，結果' + (results / 10)));
}


// 2.  What is the relationship between y and d? 

let edgesLength = 0;
while (++edgesLength < y + 1) {
    for (let i = 0; i < 20; i++) {
        let ranA = randomNode();
        let ranB = randomNode();
        graph.addEdge(String(ranA), String(ranB), edgesLength);
    }
    let results = 0;
    for (let i = 0; i < 10; i++) {
        let ranA = randomNode();
        let ranB = randomNode();
        let ans = graph.shortestPath(String(ranA), String(ranB)).length;
        results += ans;
        console.log(ranA, ranB, ans)
        results += ans;
    }
    let ans = String('第' + edgesLength + '次實驗：' + 'edges距離為' + edgesLength + '，結果' + (results / 10));
    console.log(ans);
}


// 3. How to choose z properly to reflect the true average distance between all pairs of source and destination?

let sampleAmount = 0;
for (let i = 0; i < 100; i++) {
    let ranA = randomNode();
    let ranB = randomNode();
    graph.addEdge(String(ranA), String(ranB), 1);
}
while (++sampleAmount < z + 1) {
    let results = 0;
    for (let i = 0; i < sampleAmount; i++) {
        let ranA = randomNode();
        let ranB = randomNode();
        let ans = graph.shortestPath(String(ranA), String(ranB)).length;
        results += ans;
    }
    let ans = String('第' + sampleAmount + '次實驗：' + 'sample取' + sampleAmount + '個，結果' + Math.round(results / sampleAmount));
    console.log(ans)
    // data.push(ans);
}



// 4. Which implementation of Dijkstra's Algorithm is the fastest?

let counts = 200;
let timeAdd = 0;
for (let i = 0; i < 100; i++) {
    let ranA = randomNode();
    let ranB = randomNode();
    graph.addEdge(String(ranA), String(ranB), 1);
}
let lasttime = 0;
let time = process.hrtime();
for (let i = 0; i < counts; i++) {
    let ranA = randomNode();
    let ranB = randomNode();
    // let dijkstra = new jsgraphs.Dijkstra(g, ranA);
    // let ans = Number(dijkstra.distanceTo(ranB));
    graph.shortestPath(String(ranA), String(ranB));
    let diff = process.hrtime(time);
    diff = diff[0] * 1000 + diff[1] / Math.pow(10, 6); //毫秒
    timeAdd += (diff - lasttime);
    lasttime = diff;
}
console.log('實驗有' + counts + '次測試來平均，結果速度為' + String(timeAdd / counts) + '毫秒');