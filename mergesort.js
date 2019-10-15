let trans = Math.pow(10, 6);
let alltimes = 0;
let alltimesB = 0;
for (let i = 0; i < 10; i++) {
    let test1 = [];
    // Uniformly Randomly
    for (let i = 1; i <= Math.pow(10, 7); i++) {
        let b = Math.floor(Math.random() * 1000) + 1;
        test1.push(b);
    }
    let time = process.hrtime();
    mergeSort(test1);
    let diff = process.hrtime(time);
    diff = diff[0] * 1000 + diff[1] / trans; //毫秒
    alltimes += diff;
    console.log(diff);
}
console.log('finish Uniformly Randomly:', alltimes / 10);

for (let i = 0; i < 10; i++) {
    let test1 = [];
    // Uniformly Randomly
    for (let i = 1; i <= Math.pow(10, 7); i++) {
        let b = Math.floor(Math.random() * 1000) + 1;
        test1.push(b);
    }
    // Almost Sorted
    let b = [];
    for (let i = 0; i < 100; i++) { //產生100個位置
        let c = Math.floor(Math.random() * Math.pow(10, 7)) + 1;
        b.push(c);
    }
    for (let i = 0; i < b.length; i++) {
        test1[b[i]] = Math.floor(Math.random() * 1000) + 1;
    }
    let time = process.hrtime();
    mergeSort(test1);
    let diff = process.hrtime(time);
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
    let middleIndex = Math.floor(arr.length / 2)
    let firstHalf = arr.slice(0, middleIndex)
    let secondHalf = arr.slice(middleIndex)

    // 遞回
    return sortBeforeMerge(mergeSort(firstHalf), mergeSort(secondHalf))
}

function sortBeforeMerge(arr1, arr2) {
    /**
     * 代入兩個已經"各自排序過"的陣列，
     * 將這兩個陣列利用 merge sort 的方式排序後，合併回傳成一個陣列
     **/
    let sortedArr = []

    // 當 arr1 或 arr2 都不是空陣列時
    while (arr1.length && arr2.length) {
        // 以兩陣列中第一個元素進行比較，較小的推入 sortedArr 中
        let minElement = (arr1[0] < arr2[0]) ? arr1.shift() : arr2.shift()
        sortedArr.push(minElement)
    }

    /**
     * 會跳出上面 while 的迴圈，表示 arr1 或 arr2 其中至少有一個為空陣列
     * 因此，如果 arr1 不是空陣列，則把它 concat 到 sortedArr 內；
     * 如果是 arr2 中不是空陣列，則把它 concat 到 sortedArr 內。
     **/
    sortedArr = arr1.length ? sortedArr.concat(arr1) : sortedArr.concat(arr2)

    // console.log(process.memoryUsage().heapUsed);
    return sortedArr
}

// 八次方
// for (let i = 0; i < 10; i++) {
//     let test1 = [];
//     // Uniformly Randomly
//     for (let i = 1; i <= Math.pow(10, 8); i++) {
//         let b = Math.floor(Math.random() * 1000) + 1;
//         test1.push(b);
//     }
//     let time = process.hrtime();
//     mergeSort(test1);
//     let diff = process.hrtime(time);
//     diff = diff[0] * 1000 + diff[1] / trans; //毫秒
//     alltimes += diff;
//     console.log(diff);
// }
// console.log('finish Uniformly Randomly:', alltimes / 10);

// for (let i = 0; i < 10; i++) {
//     let test1 = [];
//     // Uniformly Randomly
//     for (let i = 1; i <= Math.pow(10, 8); i++) {
//         let b = Math.floor(Math.random() * 1000) + 1;
//         test1.push(b);
//     }
//     // Almost Sorted
//     let b = [];
//     for (let i = 0; i < 100; i++) { //產生100個位置
//         let c = Math.floor(Math.random() * Math.pow(10, 8)) + 1;
//         b.push(c);
//     }
//     for (let i = 0; i < b.length; i++) {
//         test1[b[i]] = Math.floor(Math.random() * 1000) + 1;
//     }
//     let time = process.hrtime();
//     mergeSort(test1);
//     let diff = process.hrtime(time);
//     diff = diff[0] * 1000 + diff[1] / trans; //毫秒
//     alltimesB += diff;
//     console.log(diff);
// }
// console.log('finish Almost Sorted:', alltimesB / 10);
