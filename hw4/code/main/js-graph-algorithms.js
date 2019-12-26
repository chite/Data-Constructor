let jsgraphs = require('js-graph-algorithms');
let randomNode = function () { return Math.floor(Math.random() * 1000) };  //0-999
let data = [];
let write = require('../write');
let x = 100;    //edge amounts, should be randomed
let time2 = 0;  //x's edge leight, the whole y shold be the same
let time3 = 0;    //sample amount,return distance as d

// test 1: What is the relationship between x and d?
let edgesAmount = 0;
while (edgesAmount++ < x + 1) {
    let g = new jsgraphs.WeightedDiGraph(1000);
    for (let i = 0; i < 1000; i++) {
        for (let j = 0; j < 1000; j++) {
            if (j == i + 1 || (j == 999 && i == 0) || i == j + 1 || (i == 999 && j == 0)) {
                g.addEdge(new jsgraphs.Edge(i, j, 1));
            }
        }
    }
    for (let i = 0; i < edgesAmount; i++) {
        let ranA = randomNode();
        let ranB = randomNode();
        g.addEdge(new jsgraphs.Edge(ranA, ranB, 1));
        g.addEdge(new jsgraphs.Edge(ranB, ranA, 1));
    }
    let results = 0;
    for (let i = 0; i < 10; i++) {
        let ranA = randomNode();
        let ranB = randomNode();
        let dijkstra = new jsgraphs.Dijkstra(g, ranA);
        let ans = Number(dijkstra.distanceTo(ranB));
        results += ans;
    }
    let ans = String('第' + edgesAmount + '次實驗：' + 'edges有' + edgesAmount + '個，結果' + (results / 10));
    console.log(ans);
    data.push(ans);
}
// write('data1', data);

// 2.  What is the relationship between y and d? 

let y = 0;
while (++time2 < 21) {
    let g = new jsgraphs.WeightedDiGraph(1100);
    for (let i = 0; i < 1000; i++) {
        for (let j = 0; j < 1000; j++) {
            if (j == i + 1 || (j == 999 && i == 0) || i == j + 1 || (i == 999 && j == 0)) {
                g.addEdge(new jsgraphs.Edge(i, j, 1));
            }
        }
    }
    for (let i = 0; i < 100; i++) {
        let ranA = randomNode();
        let ranB = randomNode();
        g.addEdge(new jsgraphs.Edge(ranA, ranB, y));
        g.addEdge(new jsgraphs.Edge(ranB, ranA, y));
    }
    let results = 0;
    for (let i = 0; i < 10; i++) {
        let ranA = randomNode();
        let ranB = randomNode();
        let dijkstra = new jsgraphs.Dijkstra(g, ranA);
        let ans = Number(dijkstra.distanceTo(ranB));
        results += ans;
    }
    let ans = String('第' + time2 + '次實驗：' + 'edges距離為' + y + '，結果' + (results / 10));
    data.push(ans);
    console.log(ans);
    y += 50;
}
// write('data2', data);

// 3. How to choose z properly to reflect the true average distance between all pairs of source and destination?
{
    // y固定為1，x隨之增長
    for (let x = 0; x < 1000; x += 100) {
        let sampleAmount = 10;
        let time3 = 0;    //sample amount,return distance as d
        let g = new jsgraphs.WeightedDiGraph(1000 + x);
        for (let i = 0; i < 1000; i++) {
            for (let j = 0; j < 1000; j++) {
                if (j == i + 1 || (j == 999 && i == 0) || i == j + 1 || (i == 999 && j == 0)) {
                    g.addEdge(new jsgraphs.Edge(i, j, 1));
                }
            }
        }

        for (let i = 0; i < 100; i++) {
            let ranA = randomNode();
            let ranB = randomNode();
            g.addEdge(new jsgraphs.Edge(ranA, ranB, 1));
            g.addEdge(new jsgraphs.Edge(ranB, ranA, 1));
        }
        while (time3++ < 10) {
            let results = 0;
            for (let i = 0; i < sampleAmount; i++) {
                let ranA = randomNode();
                let ranB = randomNode();
                let dijkstra = new jsgraphs.Dijkstra(g, ranA);
                let ans = Number(dijkstra.distanceTo(ranB));
                results += ans;
            }
            let ans = String('第' + time3 + '次實驗：' + 'sample取' + sampleAmount + '個，固定 y 而 x 為' + x + '，結果' + Math.round(results / sampleAmount));
            console.log(ans)
            data.push(ans);
            sampleAmount += 20;
        }
    }
}
{
    // x固定為100，y隨之增長
    for (let y = 0; y < 1000; y += 100) {
        let sampleAmount = 10;
        let time3 = 0;    //sample amount,return distance as d
        let g = new jsgraphs.WeightedDiGraph(1000);
        for (let i = 0; i < 1000; i++) {
            for (let j = 0; j < 1000; j++) {
                if (j == i + 1 || (j == 999 && i == 0) || i == j + 1 || (i == 999 && j == 0)) {
                    g.addEdge(new jsgraphs.Edge(i, j, 1));
                }
            }
        }

        for (let i = 0; i < 100; i++) {
            let ranA = randomNode();
            let ranB = randomNode();
            g.addEdge(new jsgraphs.Edge(ranA, ranB, y));
            g.addEdge(new jsgraphs.Edge(ranB, ranA, y));
        }
        while (time3++ < 10) {
            let results = 0;
            for (let i = 0; i < sampleAmount; i++) {
                let ranA = randomNode();
                let ranB = randomNode();
                let dijkstra = new jsgraphs.Dijkstra(g, ranA);
                let ans = Number(dijkstra.distanceTo(ranB));
                results += ans;
            }
            let ans = String('第' + time3 + '次實驗：' + 'sample取' + sampleAmount + '個，固定 x 而 y 為' + y + '，結果' + Math.round(results / sampleAmount));
            console.log(ans)
            data.push(ans);
            sampleAmount += 20;
        }
    }
}
// write('data3', data);

// 4. Which implementation of Dijkstra's Algorithm is the fastest?

let counts = 200;
let timeAdd = 0;
for (let i = 0; i < 100; i++) {
    let ranA = randomNode();
    let ranB = randomNode();
    g.addEdge(new jsgraphs.Edge(ranA, ranB, 1));
    g.addEdge(new jsgraphs.Edge(ranB, ranA, 1));
}
let lasttime = 0;
let time = process.hrtime();
for (let i = 0; i < counts; i++) {
    let ranA = randomNode();
    let ranB = randomNode();
    let dijkstra = new jsgraphs.Dijkstra(g, ranA);
    let ans = Number(dijkstra.distanceTo(ranB));
    let diff = process.hrtime(time);
    diff = diff[0] * 1000 + diff[1] / Math.pow(10, 6); //毫秒
    timeAdd += (diff - lasttime);
    lasttime = diff;
}
console.log('實驗有' + counts + '次測試來平均，結果速度為' + String(timeAdd / counts) + '毫秒');

