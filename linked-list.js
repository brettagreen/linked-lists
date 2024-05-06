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
        this.head = null
        this.tail = null
        this.length = 0;

        for (let val of vals) {
            this.push(val);
        } 
    }

    /** push(val): add new value to end of list. */

    push(val) {
        let node = new Node(val);

        if (!this.head) {
            this.head = node;
            this.tail = node;
        } else if (this.head && !this.tail) {
            this.tail = node;
            this.head.next = this.tail;
        } else {
            let tempnode = this.tail;
            tempnode.next = node;
            this.tail = node;
        }
        this.length++;
    }

    /** unshift(val): add new value to start of list. */

    unshift(val) {
        let newNode = new Node(val);

        if (this.length === 0) {
            this.head = newNode;
            this.tail = newNode;
        } else {
            newNode.next = this.head;
            this.head = newNode;
        }

        this.length++;

    }

    /** pop(): return & remove last item. */

    pop() {

        if (!this.tail || !this.head) {
            throw "whoopsie! list appears to be empty."
        }

        if (this.length === 1) {
            let rtr = this.head;
            this.head = null;
            this.tail = null;
            this.length --;
            return rtr.val;
        }

        let current = this.head.next || null
        let prevnode = this.head;

        while (current !== this.tail) {
          prevnode = current;
          current = current.next;
        }

        let returnVal = current.val;
        prevnode.next = null;
        this.tail = prevnode;
        this.length--;
        
        return returnVal;
    }

    /** shift(): return & remove first item's val. */

    shift() {
        if (!this.tail || !this.head) {
            throw "whoopsie! list appears to be empty."
        }
        let returnVal;
        if (this.length > 1) {
            let newHead = this.head.next;
            returnVal = this.head.val;
            this.head = newHead;
        } else {
            returnVal = this.head.val;
            this.head = null;
            this.tail = null;
        }

        this.length--;
        
        return returnVal
    }

    /** getAt(idx): get val at idx. */

    getAt(idx) {

        let currentNode = this.head;
        let count = 0;

        while (count <= this.length -1) {
            if (count === idx) {
                return currentNode.val;
            }
            count++;

            currentNode = currentNode.next;
        }

        throw "whoopsie, your index doesn't exist.";

    }

    /** getAtNode(idx): get node at idx. */

    getAtNode(idx) {
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
        if (idx > this.length) {
            throw "idx too large for number of nodes"
        }

        let currentNode = this.head;
        let count = 0;
        let hold;
        let newNode = new Node(val);

        if (this.length === 0) {
            this.head = newNode;
            this.next = null;
            this.tail = newNode;
            this.length++
            return;

        } else {

            while (count <= this.length -1) {
                if (count + 1 === idx || idx === 0) {
    
                    if (idx === 0) {
                        this.head = newNode;
                    }
                    
                    if (idx < this.length) {
                        hold = currentNode.next;
                        currentNode.next = newNode; 
                        newNode.next = hold; 
                    } else {
                        hold = this.tail;
                        hold.next = newNode;
                        this.tail = newNode;
                        currentNode.next = this.tail;
                        this.tail.next = null;
                    }
    
                    this.length++;
                    return;
                }
                count++;
                currentNode = currentNode.next;
            }
        }
    }

    /** removeAt(idx): return & remove item at idx, */

    removeAt(idx) {
        if (idx > this.length) {
            throw "idx too large for number of nodes"
        }

        let currentNode = this.head;
        let count = 0;

        if (this.length === 0) {
            throw "list is empty. there's nothing to remove";
        } else {
            while (count <= this.length -1) {
                if (count + 1 === idx || idx === 0) {
                    if (idx === 0) {
                        this.head = currentNode.next
                        currentNode = null;
                    } else {
                        let nodeToRemove = currentNode.next;
                        currentNode.next = currentNode.next.next;
                        nodeToRemove = null;
                    }
    
                    if (idx === this.length -1) {
                        this.tail = currentNode;
                    }

                    this.length--;
                    return this;
                }
                count++;
                currentNode = currentNode.next;
            }
    
            throw "whoopsie, your index doesn't exist.";
        }

    }

    /** average(): return an average of all values in the list */

    average() {
        if (this.length === 0) {
            return 0;
        }

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
                this.getAtNode(this.length - 2).next = this.tail;
            } else {
                let firstNode = this.getAtNode(count);
                let secondNode = this.getAtNode(this.length - count - 1);
                const secondNext = secondNode.next;
                secondNode.next = firstNode.next;
                firstNode.next = secondNext;
                this.getAtNode(count - 1).next = secondNode;
                this.getAtNode(this.length - count - 2).next = firstNode;
            }

            count++;
        }

    }

    pivot(pivotPoint) {
        let currentNode = this.head;
        let prevLeftNode = currentNode;
        let prevRightNode;
        let prevRightNodeFirst;

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

    let currentNode1 = list1.head;
    let currentNode2 = list2.head;
    let priorVal;

    while (currentNode1 && currentNode2) {
        if (currentNode1.val >= currentNode2.val) {
            if (priorVal !== currentNode2.val) {
                sortedList.push(currentNode2.val);
                priorVal = currentNode2.val;
            }
            currentNode2 = currentNode2.next;
        } else {
            if (priorVal !== currentNode1.val) {
                sortedList.push(currentNode1.val);
                priorVal = currentNode1.val;
            }
            currentNode1 = currentNode1.next;
        }
    }
    
    while (currentNode1) {
        if (priorVal !== currentNode1.val) {
            sortedList.push(currentNode1.val);
            priorVal = currentNode1.val;
        }
        currentNode1 = currentNode1.next;
    }

    while (currentNode2) {
        if(priorVal !== currentNode2.val) {
            sortedList.push(currentNode2.val);
            priorVal = currentNode2.val;
        }
        currentNode2 = currentNode2.next;
    }

    sortedList.head = sortedList.getAtNode(0);
    sortedList.tail = sortedList.getAtNode(sortedList.length -1);
    return sortedList;
}

function iterate(ll) {
    let currentNode = ll.head;

    while(currentNode) {
        console.log(currentNode.val);
        currentNode = currentNode.next;
    }
}


module.exports = { LinkedList, Node, sortSorted, iterate }
