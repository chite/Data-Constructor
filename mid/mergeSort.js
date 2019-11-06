function mergeSort(arr) {
    // 遞回終止條件：陣列只剩一個元素
    if (arr.length <= 1) {
        return arr
    }

    // 將陣列對半切分
    var middleIndex = Math.floor(arr.length / 2);  // 無條件捨去
    var firstHalf = arr.slice(0, middleIndex)
    var secondHalf = arr.slice(middleIndex)

    // 遞回
    return sortBeforeMerge(mergeSort(firstHalf), mergeSort(secondHalf))
}

function sortBeforeMerge(arr1, arr2) {
    // 代入兩個已排序過陣列，將兩者利用 merge sort 排序後合併回傳
    var sortedArr = []

    // 若arr1 和 arr2 都不是空陣列
    while (arr1.length && arr2.length) {
        // 將兩陣列中第一個元素進行比較，較小者移除並回傳進 sortedArr
        var minElement = (arr1[0] < arr2[0]) ? arr1.shift() : arr2.shift()
        sortedArr.push(minElement)
    }

    // 將非空陣列者 concat 到 sortedArr
    sortedArr = arr1.length ? sortedArr.concat(arr1) : sortedArr.concat(arr2)

    return sortedArr
}