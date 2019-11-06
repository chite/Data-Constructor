
var BTree = function (order) {
    this.order = order; //node 大小，要小於此
    this.values = [];   // node 包含的值
    this.children = []; // subtree
};

// 1. 插入一值
BTree.prototype.insert = function (value) {
    // console.log('this.parent ',this.parent);
    var destination = this.pickChild(value);

    if (typeof destination === "number") {  // 可插入 sub node 中
        this.insert.call(this.children[destination], value);
    } else {    // 不傳進 sub node
        this.values.push(value);
        this.sortNode();    // 由小到大排序
        if (this.isOverloaded()) {
            this.split();   // 分為 sub node
        }
    }
};

BTree.prototype.sortNode = function () {
    this.values.sort(function (a, b) { return a - b; });
};

BTree.prototype.isOverloaded = function () {
    return this.values.length === this.order;
};

BTree.prototype.split = function () {
    var leftSplit = new BTree(this.order);
    var rightSplit = new BTree(this.order);

    // 分左右兩半、中位數
    leftSplit.values = this.values.splice(0, Math.ceil(this.values.length / 2) - 1);
    var median = this.values.splice(0, 1)[0];
    rightSplit.values = this.values.splice(0);

    for (var i = 0; i < this.children.length; i++) {    // 將 sub node 分派到新的左右 sub node 下（下對上）
        if (i + 1 <= this.children.length / 2) {
            this.children[i].parent = leftSplit;
        } else {
            this.children[i].parent = rightSplit;
        }
    }
    leftSplit.children = this.children.splice(0, this.children.length / 2); //（上對下）
    rightSplit.children = this.children.splice(0);

    // 安排父子node 順序
    if (this.parent) {  // 如果有父 node
        var parent = this.parent;
        leftSplit.parent = parent;
        rightSplit.parent = parent;
        var destination = parent.pickChild(leftSplit.values[0]);
        parent.children.splice(destination, 1, leftSplit, rightSplit);
        parent.insert(median);
    } else {
        this.values[0] = median;
        this.children = [leftSplit, rightSplit];
        leftSplit.parent = this;
        rightSplit.parent = this;
    }
};

// 決定插入位置
BTree.prototype.pickChild = function (value) {
    var hasOpenSlots = ((this.children.length - 1) - this.values.length) > 0;   // 目前 node 有無位置
    if (this.children.length !== 0 && !hasOpenSlots) {  // 若 sub node 有元素且目前node沒空位
        for (var destination = 0; destination < this.values.length; destination++) {    // 將node長度進行迭代
            if (value < this.values[destination]) { // 若vlue 比 node 小就跳脫迴圈
                break;
            }
        }
        return destination; //回傳合適位置
    }
    return null;    // 若無 subnode 或 node 有空位
};

// BTree.prototype.contains = function (value) {
//     var found = false;
//     this.traverse(function (node) {
//         for (var i = 0; i < node.values.length; i++) {
//             found = found || value === node.values[i];
//         }
//     });
//     return found;
// }

// BTree.prototype.traverse = function (callback) {
//     callback(this);
//     for (var i = 0; i < this.children.length; i++) {
//         this.traverse.call(this.children[i], callback);
//     }
// };

// BTree.prototype.print = function () {
//     var results = [];
//     this.traverse(function (node) {
//         results.push(node.values);
//     });
//     return JSON.stringify(results);
// };

// BTree.prototype.multiInsert = function () {
//     var args = Array.prototype.slice.call(arguments);
//     for (var i = 0; i < args.length; i++) {
//         this.insert(args[i]);
//     }
// };

// BTree.prototype.printParents = function () {
//     var parents = [];
//     this.traverse(function (node) {
//         parents.push(node.parent.values);
//     });
//     return JSON.stringify(parents);
// };

let A = new BTree(3);
A.insert(2);
A.insert(5);
A.insert(7);
console.log(A.children[1].values)