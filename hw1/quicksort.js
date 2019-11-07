let trans = Math.pow(10, 6);
let alltimes = 0;

// Uniformly Randomly
for (let i = 0; i < 10; i++) {
    let test1 = [];
    for (let i = 1; i <= Math.pow(10, 7); i++) {    // 3-8
        let b = Math.floor(Math.random() * 1000) + 1;
        test1.push(b);
    }
    let time = process.hrtime();
    quickSort(test1, 0, test.length - 1);
    let diff = process.hrtime(time);
    diff = diff[0] * 1000 + diff[1] / trans; //毫秒
    alltimes += diff;
    console.log(diff);
}
console.log('finish Uniformly Randomly:', alltimes / 10);

// Almost Sorted
for (let i = 0; i < 10; i++) {
    let test1 = [];

    for (let i = 1; i <= Math.pow(10, 7); i++) {    // 3-8
        let b = Math.floor(Math.random() * 1000) + 1;
        test1.push(b);
    }

    text1 = text1.sort((a, b) => a - b);
    let b = [];
    for (let i = 0; i < 100; i++) { //產生100個位置
        let c = Math.floor(Math.random() * Math.pow(10, 7)) + 1;    // 3-8
        b.push(c);
    }
    for (let i = 0; i < b.length; i++) {
        test1[b[i]] = Math.floor(Math.random() * 1000) + 1;
    }

    let time = process.hrtime();
    quickSort(test1, 0, test.length - 1);
    let diff = process.hrtime(time);
    diff = diff[0] * 1000 + diff[1] / trans; //毫秒
    alltimes += diff;
    console.log(diff);
}
console.log('finish Almost Sorted:', alltimesB / 10);

function swap(items, leftIndex, rightIndex) {
    var temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp;
}
function partition(items, left, right) {
    var pivot = items[Math.floor((right + left) / 2)], //middle element
        i = left, //left pointer
        j = right; //right pointer
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