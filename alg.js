// merge sort
// source:https://pjchender.blogspot.com/2017/09/merge-sort.html
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
    return sortedArr
}

//   insertion sort
// sources: https://medium.com/javascript-algorithms/javascript-algorithms-insertion-sort-59b6b655373c
let insertionSort = (inputArr) => {
    let length = inputArr.length;
    for (let i = 1; i < length; i++) {
        let key = inputArr[i];
        let j = i - 1;
        while (j >= 0 && inputArr[j] > key) {
            inputArr[j + 1] = inputArr[j];
            j = j - 1;
        }
        inputArr[j + 1] = key;
    }
    return inputArr;
};

// quick sort
// source: https://www.guru99.com/quicksort-in-javascript.html
function swap(items, leftIndex, rightIndex){
    var temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp;
}
function partition(items, left, right) {
    var pivot   = items[Math.floor((right + left) / 2)], //middle element
        i       = left, //left pointer
        j       = right; //right pointer
    while (i <= j) {
        while (items[i] < pivot) {
            i++;
        }
        while (items[j] > pivot) {
            j--;
        }
        if (i <= j) {
            swap(items, i, j); //sawpping two elements
            i++;
            j--;
        }
    }
    return i;
}
function quickSort(items, left, right) {
    var index;
    if (items.length > 1) {
        index = partition(items, left, right); //index returned from partition
        if (left < index - 1) { //more elements on the left side of the pivot
            quickSort(items, left, index - 1);
        }
        if (index < right) { //more elements on the right side of the pivot
            quickSort(items, index, right);
        }
    }
    return items;
}

// counting sort
// source: https://medium.com/javascript-algorithms/javascript-algorithms-counting-sort-c94a5fd70c9c
let countingSort = (arr, min, max) => {
    let i = min,
        j = 0,
        len = arr.length,
        count = [];
    for (i; i <= max; i++) {
        count[i] = 0;
    }
    for (i = 0; i < len; i++) {
        count[arr[i]] += 1;
    }
    for (i = min; i <= max; i++) {
        while (count[i] > 0) {
            arr[j] = i;
            j++;
            count[i]--;
        }
    }
    return arr;
};

// heap sort
// source: http://notepad.yehyeh.net/Content/Algorithm/Sort/Heap/Heap.php

var swap = function(data, i, j){ 
    var tmp = data[i];
    data[i] = data[j];
    data[j] = tmp;
};

// 令Root的左、右子樹皆符合Heap，僅Root不符合Heap，將樹調整為Max Heap
var heapify = function(data, root, length){
    var leftChild = root*2 + 1;	    // Root的左子元素
    var rightChild = root*2 + 2;    // Root的右子元素
    var maxNode = -1;
		
    // 找出root, leftChild, rightChild，值最大者(maNode)
    if(leftChild < length && (data[leftChild] > data[root]))
        maxNode = leftChild;
    else
        maxNode = root;	
    if(rightChild < length && (data[rightChild] > data[maxNode]))
        maxNode = rightChild;
	
    // 如果值最大者不是root，則作swap及heapify
    if(maxNode != root){
        swap(data, root, maxNode);
        heapify(data, maxNode, length);
    }	
};

var heapSort = function(data){
    //將數列轉換成Max Heap
    for(var i = Math.floor( data.length/2)-1; i >= 0; i--){
        heapify(data, i, data.length);
    }	
	
    //排序
    for(i = data.length - 1; i > 0; i--){
        swap(data, 0, i);
        heapify(data, 0, i);
    }
};
