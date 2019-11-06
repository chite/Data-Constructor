function LinkedList() {
    const Node = function (element) {   // 建構式
        this.element = element;
        this.next = null;
    }
    let length = 0; // 存放 LinkedList 長度
    let head = null;    // 第一個節點的指標

    // 1. 在尾部新增一個節點
    this.append = function (element) {
        const node = new Node(element);
        let current;    //輔助指標

        if (head === null) {
            // 若串列為空，將 head 改為指向新的節點
            head = node;
        } else {
            // 若串列不為空，使用 current 當做輔助指標，指向第一個節點物件
            // 先將 current 指到 head 指向的節點，再使用迴圈尋找到最後的節點
            current = head;
            while (current.next) {  // 若 current.next 不為 null 代表後面還有節點
                current = current.next;
            }
            current.next = node;    // 將串列最後一個物件的 next 屬性指向新生成的物件
        }
        // 新增串列長度
        length++;
    };

    // 2. 回傳元素在串列的元素節點 index，若無則回傳 -1
    this.indexOf = function (element) {
        var current = head;
        var index = -1;

        while (current) {
            // 循序尋找若找到則回傳 index
            if (element === current.element) {
                return index;
            }
            index++;
            current = current.next;
        }
        return -1;
    };

    // 3. 串列長度
    this.size = function () {
        return length;
    }

    // 4. print 串列
    this.toString = function () {
        let current = head;
        let string = '';
        // 循序檢查 current 指到的 node 是否存在，若存在則串接資料內容成字串
        while (current) {
            string += current.element;
            // 指到下一個元素
            current = current.next;
        }
        return string;
    }

    // 5. 刪除
    this.delete = function (element) {
        let pre = null, current = head;
        while (current) {
            if (element === current.element) {
                if (pre !== null) {
                    pre.next = current.next;
                } else {
                    head = current.next;
                }
                return;
            }
            pre = current;
            current = current.next;
        }
    }

}
const linkdeList = new LinkedList();
linkdeList.append('Mark');
linkdeList.append('Jack');
linkdeList.append('Amy');
linkdeList.delete('Amy')
console.log(linkdeList.toString())