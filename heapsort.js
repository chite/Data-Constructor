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
    heapSort(test1);
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

    text1 = text1.sort((a,b)=>a-b);
    let b = [];
    for (let i = 0; i < 100; i++) { //產生100個位置
        let c = Math.floor(Math.random() * Math.pow(10, 7)) + 1;    // 3-8
        b.push(c);
    }
    for (let i = 0; i < b.length; i++) {
        test1[b[i]] = Math.floor(Math.random() * 1000) + 1;
    }

    let time = process.hrtime();
    heapSort(test1);
    let diff = process.hrtime(time);
    diff = diff[0] * 1000 + diff[1] / trans; //毫秒
    alltimes += diff;
    console.log(diff);
}
console.log('finish Almost Sorted:', alltimesB / 10);


function swap(data, i, j){ 
    var tmp = data[i];
    data[i] = data[j];
    data[j] = tmp;
};

// 令Root的左、右子樹皆符合Heap，僅Root不符合Heap，將樹調整為Max Heap
function heapify(data, root, length){
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

function heapSort(data){
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