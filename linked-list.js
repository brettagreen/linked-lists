/** Node: node for a singly linked list. */

class Node {
    constructor(val) {
        this.val = val;
        this.next = null;
    }
}

/** LinkedList: chained together nodes. */

class LinkedList {
    constructor(vals = []) {
        this.head = null;
        this.tail = null;
        this.length = vals.length;

        for (let val of vals) {
            this.push(val);
        } 
    }

    /** push(val): add new value to end of list. */

    push(val) {
        let node = new Node(val);

        if (this.head === null) {
            this.head = node;
        }

        if (this.tail !== null) {
            this.tail.next = node;
        }
    
        this.tail = node;
    }

    /** unshift(val): add new value to start of list. */

    unshift(val) {
        let newNode = new Node(val);

        newNode.next = this.head;
        this.head = newNode;

        this.length +=1;

    }

    /** pop(): return & remove last item. */

    pop() {
        
        if (!this.tail || !this.head) {
            throw "whoopsie! list appears to be empty."
        }

        let current = this.head;

        while (current.next.next) {
          current = current.next;
        }

        ll.tail = current;
        let returnVal = current.next.val;
        current.next = null;

        this.length -= 1;
        
        return returnVal;
    }

    /** shift(): return & remove first item. */

    shift() {
        if (!this.tail || !this.head) {
            throw "whoopsie! list appears to be empty."
        }

        let newHead = this.head.next;
        this.head.next = null;
        let returnVal = this.head;
        this.head = newHead;

        this.length -= 1;
        
        return returnVal;
    }

    /** getAt(idx): get val at idx. */

    getAt(idx) {

        let currentNode = this.head;
        let count = 0;

        while (count <= this.length -1) {
            if (count === idx) {
                return currentNode;
            }
            count++;

            currentNode = currentNode.next;
        }

        throw "whoopsie, your index doesn't exist.";

    }

    /** setAt(idx, val): set val at idx to val */

    setAt(idx, val) {

        let currentNode = this.head;
        let count = 0;

        while (count <= this.length -1) {
            if (count === idx) {
                currentNode.val = val;
                return;
            }
            count++;
            currentNode = currentNode.next;
        }

        throw "whoopsie, your index doesn't exist.";
    }

    /** insertAt(idx, val): add node w/val before idx. */

    insertAt(idx, val) {
        let currentNode = this.head;
        let count = 0;

        while (count <= this.length -1) {
            if (count + 1 === idx || idx === 0) {
                let newNode = new Node(val);

                if (idx === 0) {
                    ll.head = newNode;
                }

                newNode.next = currentNode;

                if (idx === this.length -1) {
                    ll.tail = newNode;
                    newNode.next = null;
                }

                this.length++;
                return;
            }
            count++;
            currentNode = currentNode.next;
        }

        throw "whoopsie, your index doesn't exist.";

    }

    /** removeAt(idx): return & remove item at idx, */

    removeAt(idx) {
        let currentNode = this.head;
        let count = 0;

        while (count <= this.length -1) {
            if (count + 1 === idx || idx === 0) {
                if (idx === 0) {
                    ll.head = currentNode.next
                    currentNode = null;
                } else {
                    let nodeToRemove = currentNode.next;
                    currentNode.next = currentNode.next.next;
                    nodeToRemove = null;
                    if (idx === this.length -1) {
                        ll.tail = currentNode;
                    }
                }

                this.length--;
                return;
            }
            count++;
            currentNode = currentNode.next;
        }

        throw "whoopsie, your index doesn't exist.";
    }

    /** average(): return an average of all values in the list */

    average() {
        let currentNode = this.head;
        let runningTotal = 0;
        while(currentNode) {
            runningTotal += currentNode.val;
            currentNode = currentNode.next;
        }

        return runningTotal / this.length;
    }

    /** REVERSE IN PLACE i.e. 1,3,5,7,9 --> 9,7,5,3,1 */

    reverseInPlace() {
        let currentNode = this.head;
        let count = 0;

        while (count <= Math.floor(this.length/2) - 1) {
            if (count === 0) {
                this.tail.next = currentNode.next;
                const head = this.head;
                this.head = this.tail;
                this.tail = head;
                this.tail.next = null;
                this.getAt(this.length - 2).next = this.tail;
            } else {
                let firstNode = this.getAt(count);
                let secondNode = this.getAt(this.length - count - 1);
                const secondNext = secondNode.next;
                secondNode.next = firstNode.next;
                firstNode.next = secondNext;
                this.getAt(count - 1).next = secondNode;
                this.getAt(this.length - count - 2).next = firstNode;
            }

            count++;
        }

    }

    // let ll = new LinkedList([7, 6, 2, 3, 9, 1, 1])

    // ll.pivot(5)

    // now list is 2 3 1 1 7 6 9
    //new LinkedList([3, 5, 7, 23, 41, 50, 77, 100]);

    pivot(pivotPoint) {
        let currentNode = this.head;
        let prevLeftNode = currentNode;
        let prevRightNode;
        let prevRightNodeFirst;
        debugger
        while (currentNode) {
            if (currentNode.val < pivotPoint) {
                if (this.head.val >= pivotPoint) {
                    this.head = currentNode;
                } else if (currentNode !== prevLeftNode) {
                    prevLeftNode.next = currentNode;
                }
                prevLeftNode = currentNode;
            } else {
                if (!prevRightNode) {
                    prevRightNode = currentNode;
                    prevRightNodeFirst = currentNode;
                } else {
                    prevRightNode.next = currentNode;
                }
                prevRightNode = currentNode;
            }
            currentNode = currentNode.next;
        }


        prevLeftNode.next = prevRightNodeFirst;
        this.tail = prevRightNode;
        this.tail.next = null;

        return this;

    }

}


function sortSorted(list1, list2) {

    if (list1.length === 0 || list2.length === 0) {
        return 'one or both passed lists are....EMPTY!!! Try again with some data whydonchya?'
    }

    let sortedList = new LinkedList([]);
    let count = 0;

    let currentNode1 = list1.head;
    let currentNode2 = list2.head;
    const iterations = list1.length + list1.length - 2;
    let hold;
    let holdStack;
    let node;
    
    while (count <= iterations) {
        if (!currentNode1) {
            if (currentNode2.val > hold && hold !== node.val) {
                node.next = new Node(hold);
                node = node.next;
                currentNode2 = currentNode2.next;
            } else {
                node.next = new Node(currentNode2.val);
                node = node.next;
                currentNode2 = currentNode2.next;
            }

            while (currentNode2) {
                node.next = new Node(currentNode2.val);
                node = node.next;
                currentNode2 = currentNode2.next;
            }
            break;

        } else if (!currentNode2) {
            if (currentNode1.val > hold && hold !== node.val) {
                node.next = new Node(hold);
                node = node.next;
                currentNode1 = currentNode1.next;
            } else {
                node.next = new Node(currentNode1.val);
                node = node.next;
                currentNode1 = currentNode1.next;
            }

            while (currentNode1) {
                node.next = new Node(currentNode1.val);
                node = node.next;
                currentNode1 = currentNode1.next;
            }
            break;
        } 

        if (count === 0) {
            if (currentNode1.val > currentNode2.val) {
                node = new Node(currentNode2.val);
                sortedList.head = node;
                node = sortedList.head;
                hold = currentNode1.val;
                holdStack = list1;
            } else if (currentNode1.val < currentNode2.val) {
                node = new Node(currentNode1.val);
                sortedList.head = node;
                node = sortedList.head;
                hold = currentNode2.val;
                holdStack = list2;
            } else { 
                node = new Node(currentNode1.val);
                sortedList.head = node;
                node = sortedList.head;
            }
        } else {
            if (holdStack) {
                if (holdStack === list2) {
                    if (currentNode1.val > hold) {
                        node.next = new Node(hold);
                        node = node.next;
                        hold = currentNode1.val;
                        holdStack = list1;
                    } else if (currentNode1.val < hold && currentNode1.val !== node.val) {
                        node.next = new Node(currentNode1.val);
                        node = node.next;
                    } 
                } else {
                    if (currentNode2.val > hold) {
                        node.next = new Node(hold);
                        node = node.next;
                        hold = currentNode2.val;
                        holdStack = list2;
                    } else if (currentNode2.val < hold && currentNode2.val !== node.val) {
                        node.next = new Node(currentNode2.val);
                        node = node.next;
                    }
                }
            } else {
                if (currentNode1.val > currentNode2.val) {
                    node.next = new Node(currentNode2.val);
                    node = node.next;
                    hold = currentNode1.val;
                    holdStack = list1;
                } else if (currentNode1.val < currentNode2.val) {
                    node.next = new Node(currentNode1.val);
                    node = node.next;
                    hold = currentNode2.val;
                    holdStack = list2;
                } else {
                    node.next = new Node(currentNode1.val); // i.e. given equality, arbitrary. could also use currentNode2.val
                    node = node.next;
                }
            }

        }
        
        if (holdStack === list1) {
            currentNode2 = currentNode2.next;
        } else if (holdStack === list2) {
            currentNode1 = currentNode1.next;
        } else {
            currentNode1 = currentNode1.next;
            currentNode2 = currentNode2.next;
        }
        
        count++;
    }

    sortedList.tail = node;
    return sortedList;
}

function iterate(ll) {
    let currentNode = ll.head;
    console.log(ll);

    while(currentNode) {
        console.log(currentNode.val);
        currentNode = currentNode.next;
    }
}

const ll = new LinkedList([33, 5, 77, 23, 4, 50, 10]);
const pivot = ll.pivot(25);
console.log(iterate(pivot));

//const lll = new LinkedList([3, 6, 9, 44, 100, 101]);
// const ll = new LinkedList([2, 5, 7, 23, 41, 50, 77, 100]);
// const lll = new LinkedList([3, 6, 9, 10, 44, 101]);
// const ll = new LinkedList([2,5,7,7,7,8,9,99]);
// const lll = new LinkedList([4, 12, 77, 99, 100]);
// const newLL = sortSorted(ll, lll);
// iterate(newLL);


module.exports = LinkedList;
