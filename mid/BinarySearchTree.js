var BinarySearchTree = function (value) {

    var thisTree = {};

    thisTree.value = value;
    thisTree.left = null;
    thisTree.right = null;

    extend(thisTree, BinarySearchTreeMethods);  // 功能添入

    return thisTree;
};

// 功能添入函式
var extend = function (to, from) {
    for (var key in from) {
        to[key] = from[key];
    }
};

var BinarySearchTreeMethods = {
    //插入
    insert: function (value) {
        // O(log(n))
        this.traverse(value); // 遍歷
        this.checkBalance();  // 檢查平衡
    },
    traverse: function (value) {
        if (value === this.value) { // 指定值跟目前子樹值重複
            return this;
        }
        var child = (value > this.value) ? 'right' : 'left';    // 是歸左邊或右邊
        if (this[child] === null) { // 目前左方或右方沒指派子樹
            this[child] = BinarySearchTree(value); // 新建一個
            return;
        }
        return this.traverse.call(this[child], value); // 在子樹上再遍歷一次
    },

    // 查詢樹上是否包含某值
    contains: function (target) {
        // O(log(n))
        return !!this.traverse(target);
    },

    //查詢深度過程
    depthFirstLog: function (callback, depth) {
        // O(n)
        callback(this, depth); 
        // 目前樹下還有子樹就depth+1且遞迴
        // 分左右分支向下去遞迴
        if (this.right !== null) {  
            this.depthFirstLog.call(this.right, callback, depth + 1);
        }
        if (this.left !== null) {
            this.depthFirstLog.call(this.left, callback, depth + 1);
        }
    },
    getBalance: function () {
        var branchLengths = [];
        var countDepth = function (node, depth) {   //node：即this, 目前節點物件  depth: 深度
            if (node.left === null && node.right === null) {
                branchLengths.push(depth);  // 都沒有子樹就將深度傳進陣列，因為depthFirstLog()是分左右分支向下去遞迴，若某節點沒有向下的分支就回傳深度
            }
        };
        this.depthFirstLog(countDepth, 1); // 將函式帶入去探測深度，初始深度為1
        var minDepth = Math.min.apply(null, branchLengths);
        var maxDepth = Math.max.apply(null, branchLengths);
        return maxDepth / minDepth; // 深淺比應該要 1:1
    },
    checkBalance: function () {
        if (this.getBalance() > 2) {
            this.rebalance();
        }
    },
    rebalance: function () {
        var allValues = [];
        var parseValue = function (node) {
            allValues.push(node.value); // 將所有節點值放進array
        };
        this.depthFirstLog(parseValue);
        allValues.sort(function (a, b) { return a - b; }); //從小排到大

        var makeBalancedTree = function (values) {
            console.log('aaaa')
            if (values.length === 0) {
                return;
            }
            var medianIndex = Math.floor(values.length / 2);    // 取中間大小值
            var leftArr = values.splice(0, medianIndex);    //擷取左半array
            var root = values.splice(0, 1)[0];  //擷取中間大小值
            var rightArr = values.slice(0); // 獲得右半array
            //重新建構樹
            if (leftArr.length > 0) {
                this.left = BinarySearchTree();
            }
            if (rightArr.length > 0) {
                this.right = BinarySearchTree();
            }
            this.value = root;
            makeBalancedTree.call(this.left, leftArr);
            makeBalancedTree.call(this.right, rightArr);
        }
        //開始建構樹
        this.left = null;
        this.right = null;

        makeBalancedTree.call(this, allValues);
    }

}

let a = BinarySearchTree(8);
a.insert(4);
a.insert(1);
a.insert(2);
a.insert(6);
a.insert(1);
console.log(a.left.left.right)