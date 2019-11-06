let a = [7, 6, 8, 5, 2, 1];
console.log(quickSort(a, 0, a.length - 1))
function quickSort(array, left, right) {
    var index;
    if (array.length > 1) {
        index = partition(array, left, right); //取得索引值
        if (left < index - 1) { //索引值左方還有未排序元素
            quickSort(array, left, index - 1);
        }
        if (index < right) { //索引值右方還有未排序元素
            quickSort(array, index, right);
        }
    }
    return array;
}
function swap(array, leftIndex, rightIndex) {
    // 將兩個位置的值交換
    var temp = array[leftIndex];
    array[leftIndex] = array[rightIndex];
    array[rightIndex] = temp;
}
function partition(array, left, right) {
    var pivot = array[Math.floor((right + left) / 2)], //取得陣列的中位值
        i = left, //開始索引
        j = right; //結束索引
    while (i <= j) {
        while (array[i] < pivot) {
            // 迭代出每個索引小於中位值的值
            // 亦即大於中位值會脫離迴圈
            i++;
        }
        while (array[j] > pivot) {
            // 迭代出每個索引大於中位值的值
            // 亦即小於中位值會脫離迴圈
            j--;
        }
        if (i <= j) {
            swap(array, i, j); //將i迭代到大於中位值的值 和 j迭代小於中位值的值 交換
            // 繼續
            i++;
            j--;
        }
    }
    return i;  // 回傳開始索引位置作為判斷是否還有未排序好的索引提示
}