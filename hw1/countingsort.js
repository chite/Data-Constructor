let trans = Math.pow(10, 6);
let alltimes = 0;
for (let i = 0; i < 10; i++) {
    let max = 0;
    let min = Infinity;
    let test1 = [];
    function getMinMax(val){
        if(val < min){
            min = val;
        }
        if(val > max){
            max = val;
        }
    }

    // Uniformly Randomly
    for (let i = 1; i <= Math.pow(10, 7); i++) {    // 3-8
        let b = Math.floor(Math.random() * 1000) + 1;
        test1.push(b);
        getMinMax(b);
    }
    let time = process.hrtime();
    countingSort(test1, min, max);
    let diff = process.hrtime(time);
    diff = diff[0] * 1000 + diff[1] / trans; //毫秒
    alltimes += diff;
    console.log(diff);
}
console.log('finish Uniformly Randomly:', alltimes / 10);

// Almost Sorted
for (let i = 0; i < 10; i++) {
    let max = 0;
    let min = Infinity;
    let test1 = [];
    function getMinMax(val){
        if(val < min){
            min = val;
        }
        if(val > max){
            max = val;
        }
    }


    for (let i = 1; i <= Math.pow(10, 7); i++) {    // 3-8
        let b = Math.floor(Math.random() * 1000) + 1;
        test1.push(b);
        getMinMax(test1[b[i]]);
    }

    text1 = text1.sort((a,b)=>a-b);
    let b = [];
    for (let i = 0; i < 100; i++) { //產生100個位置
        let c = Math.floor(Math.random() * Math.pow(10, 7)) + 1;    // 3-8
        b.push(c);
        getMinMax(test1[b[i]]);
    }
    for (let i = 0; i < b.length; i++) {
        test1[b[i]] = Math.floor(Math.random() * 1000) + 1;
    }

    let time = process.hrtime();
    countingSort(test1, min, max);
    let diff = process.hrtime(time);
    diff = diff[0] * 1000 + diff[1] / trans; //毫秒
    alltimes += diff;
    console.log(diff);
}
console.log('finish Almost Sorted:', alltimesB / 10);

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