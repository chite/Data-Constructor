"use strict";
var trans = Math.pow(10, 6);
var alltimes = 0;
var alltimesB = 0;
// Uniformly Randomly
for (var i = 0; i < 10; i++) {
    var test1 = [];
    for (var j = 1; j <= Math.pow(10, 7); j++) {    // 3-8
        var b = Math.floor(Math.random() * 1000) + 1;
        test1.push(b);
    }
    var time = process.hrtime();
    mergeSort(test1);
    var diff = process.hrtime(time);
    diff = diff[0] * 1000 + diff[1] / trans; //毫秒
    alltimes += diff;
    console.log(diff);
}
console.log('finish Uniformly Randomly:', alltimes / 10);

// Almost Sorted
for (var k = 0; k < 10; k++) {
    var test1 = [];
    for (var m = 1; m <= Math.pow(10, 7); m++) {    // 3-8
        var b = Math.floor(Math.random() * 1000) + 1;
        test1.push(b);
    }
    text1 = text1.sort((a, b) => a - b);
    var b = [];
    for (var n = 0; n < 100; n++) { //產生100個位置
        var c = Math.floor(Math.random() * Math.pow(10, 7)) + 1;    // 3-8
        b.push(c);
    }
    for (var o = 0; o < b.length; o++) {
        test1[b[i]] = Math.floor(Math.random() * 1000) + 1;
    }
    var time = process.hrtime();
    mergeSort(test1);
    var diff = process.hrtime(time);
    diff = diff[0] * 1000 + diff[1] / trans; //毫秒
    alltimesB += diff;
    console.log(diff);
}
console.log('finish Almost Sorted:', alltimesB / 10);

function mergeSort(arr) {

    // 遞回函式終止條件：當陣列被拆到只剩一個元素時
    if (arr.length <= 1) {
        return arr
    }

    // 接受一組尚未排序的陣列當作參數，將它們對半切分
    var middleIndex = Math.floor(arr.length / 2)
    var firstHalf = arr.slice(0, middleIndex)
    var secondHalf = arr.slice(middleIndex)

    // 遞回
    return sortBeforeMerge(mergeSort(firstHalf), mergeSort(secondHalf))
}

function sortBeforeMerge(arr1, arr2) {
    /**
     * 代入兩個已經"各自排序過"的陣列，
     * 將這兩個陣列利用 merge sort 的方式排序後，合併回傳成一個陣列
     **/
    var sortedArr = []

    // 當 arr1 或 arr2 都不是空陣列時
    while (arr1.length && arr2.length) {
        // 以兩陣列中第一個元素進行比較，較小的推入 sortedArr 中
        var minElement = (arr1[0] < arr2[0]) ? arr1.shift() : arr2.shift()
        sortedArr.push(minElement)
    }

    /**
     * 會跳出上面 while 的迴圈，表示 arr1 或 arr2 其中至少有一個為空陣列
     * 因此，如果 arr1 不是空陣列，則把它 concat 到 sortedArr 內；
     * 如果是 arr2 中不是空陣列，則把它 concat 到 sortedArr 內。
     **/
    sortedArr = arr1.length ? sortedArr.concat(arr1) : sortedArr.concat(arr2)


    return sortedArr
}

