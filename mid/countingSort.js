let countingSort = (array, min, max) => {
    let i = min,
        j = 0,
        count = [];

    for (i; i <= max; i++) {
        // 初始化一個陣列，預設都是 0
        count[i] = 0;
    }
    for (i = 0; i < array.length; i++) {
        // 將值作為索引，對照到count 位置上並+1
        count[array[i]] += 1;
    }
    for (i = min; i <= max; i++) {
        while (count[i] > 0) { //將count套用到 array 上生成排序過的陣列
            array[j] = i;
            j++;
            count[i]--;
        }
    }
    return array;
};