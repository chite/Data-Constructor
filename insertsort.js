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
    insertionSort(test1);
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
    insertionSort(test1);
    let diff = process.hrtime(time);
    diff = diff[0] * 1000 + diff[1] / trans; //毫秒
    alltimesB += diff;
    console.log(diff);
}
console.log('finish Almost Sorted:', alltimesB / 10);

function insertionSort(inputArr){
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

// 八次方
// for (let i = 0; i < 10; i++) {
//     let test1 = [];
//     // Uniformly Randomly
//     for (let i = 1; i <= Math.pow(10, 8); i++) {
//         let b = Math.floor(Math.random() * 1000) + 1;
//         test1.push(b);
//     }
//     let time = process.hrtime();
//     insertionSort(test1);
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
//     insertionSort(test1);
//     let diff = process.hrtime(time);
//     diff = diff[0] * 1000 + diff[1] / trans; //毫秒
//     alltimesB += diff;
//     console.log(diff);
// }
// console.log('finish Almost Sorted:', alltimesB / 10);
