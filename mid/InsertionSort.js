function insertionSort(inputArr) {
    for (let i = 1; i < inputArr.length; i++) {
        let key = inputArr[i];  // 目前數值
        let j = i - 1;  // 前一位
        while (j >= 0 && inputArr[j] > key) {
            // 若前一位索引大於0且其值大於目前數值則將此值帶到目前索引位置
            // 再往前一位
            inputArr[j + 1] = inputArr[j];
            j = j - 1;
        }
        // 脫離迴圈後將原本目前數值賦予至 不小於前索引位置值 的位置
        inputArr[j + 1] = key;
    }
    return inputArr;
};