let arr = [1, 3, 5, 7, 8, 9]; 
let x = 5   // 目標值，是否存在arr中
let binarySort = function (arr, x, start, end) { 
       
    // 開頭不可大於結尾
    if (start > end) return false; 
   
    // 找尋中點
    let mid=Math.floor((start + end)/2); //無條件捨去
   
    // 中點是x
    if (arr[mid]===x) return true; 
          
    // 若中點值大於x，找尋左邊陣列 
    if(arr[mid] > x)  
        return binarySort(arr, x, start, mid-1); 
    else
        return binarySort(arr, x, mid+1, end); 
};
console.log(binarySort(arr,x,0, arr.length))