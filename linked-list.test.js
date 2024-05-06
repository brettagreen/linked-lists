const { LinkedList, Node, sortSorted, iterate } = require("./linked-list");

describe("push", function() {
    it("appends node and increments length", function() {
        let lst = new LinkedList();

        lst.push(5);
        expect(lst.length).toBe(1);
        expect(lst.head.val).toBe(5);
        expect(lst.tail.val).toBe(5);

        lst.push(10);
        expect(lst.length).toBe(2);
        expect(lst.head.val).toBe(5);
        expect(lst.head.next.val).toBe(10);
        expect(lst.tail.val).toBe(10);

        lst.push(15);
        expect(lst.length).toBe(3);
        expect(lst.head.val).toBe(5);
        expect(lst.head.next.next.val).toBe(15);
        expect(lst.tail.val).toBe(15);
    });
});

describe("unshift", function() {
    it("adds node at start and increments length", function() {
        let lst = new LinkedList();

        lst.unshift(5);
        expect(lst.length).toBe(1);
        expect(lst.head.val).toBe(5);
        expect(lst.tail.val).toBe(5);

        lst.unshift(10);
        expect(lst.length).toBe(2);
        expect(lst.head.val).toBe(10);
        expect(lst.head.next.val).toBe(5);
        expect(lst.tail.val).toBe(5);

        lst.unshift(15);
        expect(lst.length).toBe(3);
        expect(lst.head.val).toBe(15);
        expect(lst.head.next.val).toBe(10);
        expect(lst.head.next.next.val).toBe(5);
        expect(lst.tail.val).toBe(5);
    });
});

describe("pop", function() {
    it("removes node at end and decrements length", function() {
        let lst = new LinkedList([5, 10]);

        expect(lst.pop()).toBe(10);
        expect(lst.head.val).toBe(5);
        expect(lst.tail.val).toBe(5);
        expect(lst.length).toBe(1);

        expect(lst.pop()).toBe(5);
        expect(lst.tail).toBe(null);
        expect(lst.head).toBe(null);
        expect(lst.length).toBe(0);
    });
});

describe("shift", function() {
    it("removes node at start and decrements length", function() {
        let lst = new LinkedList([5, 10]);
        expect(lst.shift()).toBe(5);
        expect(lst.tail.val).toBe(10);
        expect(lst.length).toBe(1);

        expect(lst.shift()).toBe(10);
        expect(lst.tail).toBe(null);
        expect(lst.head).toBe(null);
        expect(lst.length).toBe(0);
    });
});

describe("getAt", function() {
    it("gets val at index", function() {
        let lst = new LinkedList([5, 10]);

        expect(lst.getAt(0)).toBe(5);
        expect(lst.getAt(1)).toBe(10);
    });
});

describe("setAt", function() {
    it("sets val at index", function() {
        let lst = new LinkedList([5, 10]);

        expect(lst.setAt(0, 1));
        expect(lst.setAt(1, 2));
        expect(lst.head.val).toBe(1);
        expect(lst.head.next.val).toBe(2);
    });
});

describe("insertAt", function() {
    it("inserts node and adjusts nearby nodes", function() {
        let lst = new LinkedList([5, 10, 15, 20]);

        lst.insertAt(2, 12);
        expect(lst.length).toBe(5);
        expect(lst.head.val).toBe(5);
        expect(lst.head.next.val).toBe(10);
        expect(lst.head.next.next.val).toBe(12);
        expect(lst.head.next.next.next.val).toBe(15);
        expect(lst.head.next.next.next.next.val).toBe(20);

        lst.insertAt(5, 25);
        expect(lst.head.next.next.next.next.next.val).toBe(25);//5,12,10,15,20
        expect(lst.tail.val).toBe(25);
    });

    it("inserts into empty list", function() {
        let lst = new LinkedList();

        lst.insertAt(0, 5);
        expect(lst.length).toBe(1);
        expect(lst.head.val).toBe(5);
        expect(lst.tail.val).toBe(5);
    });
});

describe("removeAt", function() {
    it("removes from 1-item list", function() {
      let lst = new LinkedList(["a"]);

      lst.removeAt(0);
      expect(lst.length).toBe(0);
      expect(lst.head).toBe(null);
      expect(lst.tail).toBe(null);
    });
});

describe("average", function() {
    it("calculates the average of items in a list", function() {
        let lst = new LinkedList([2, 3, 1, 1, 7, 6, 9]);
        expect(lst.average()).toBeCloseTo(4.1429, 4);
    });

    it("returns 0 for empty lists", function() {
        let lst = new LinkedList();
        expect(lst.average()).toBe(0);
    });
});

describe("reverse in place", function() {
    it("eg 1,3,5,7,9 --> 9,7,5,3,1", function() {
        let lst = new LinkedList([5,206,9,3,11,-9,0,43]); //even length

        lst.reverseInPlace();
        expect(lst.length).toBe(8);
        expect(lst.head.val).toBe(43);
        expect(lst.head.next.val).toBe(0);
        expect(lst.head.next.next.val).toBe(-9);
        expect(lst.head.next.next.next.val).toBe(11);
        expect(lst.head.next.next.next.next.val).toBe(3);
        expect(lst.head.next.next.next.next.next.val).toBe(9);
        expect(lst.head.next.next.next.next.next.next.val).toBe(206);
        expect(lst.tail.val).toBe(5);

        lst = new LinkedList([5,206,9,3,88,11,-9,0,43]); //odd length
        lst.reverseInPlace();
        expect(lst.length).toBe(9);
        expect(lst.head.val).toBe(43);
        expect(lst.head.next.val).toBe(0);
        expect(lst.head.next.next.val).toBe(-9);
        expect(lst.head.next.next.next.val).toBe(11);
        expect(lst.head.next.next.next.next.val).toBe(88);
        expect(lst.head.next.next.next.next.next.val).toBe(3);
        expect(lst.head.next.next.next.next.next.next.val).toBe(9);
        expect(lst.head.next.next.next.next.next.next.next.val).toBe(206);
        expect(lst.tail.val).toBe(5);
    })
});

/*
example of pivot function:

let ll = new LinkedList([7, 6, 2, 3, 9, 1, 1])
ll.pivot(5)
now list is [2, 3, 1, 1, 7, 6, 9]
i.e. numbers < pivot value are shifted to the left (in their existing order) and numbers > pivot value are shifted to the right
*/
describe("pivot on x", function() {
    it("see comment", function() {
        let lst = new LinkedList([5,6,100,22,0,-1,4,45,99]);
        lst.pivot(23);
        expect(lst.length).toBe(9);
        expect(lst.head.val).toBe(5);
        expect(lst.head.next.val).toBe(6);
        expect(lst.head.next.next.val).toBe(22);
        expect(lst.head.next.next.next.val).toBe(0);
        expect(lst.head.next.next.next.next.val).toBe(-1);
        expect(lst.head.next.next.next.next.next.val).toBe(4);
        expect(lst.head.next.next.next.next.next.next.val).toBe(100);
        expect(lst.head.next.next.next.next.next.next.next.val).toBe(45);
        expect(lst.tail.val).toBe(99);
    });
});

describe("sort sorted", function() {
    it("given two sorted arrays, return a linked list of the two arrays' values in sorted order", function() {
        let lst1 = new LinkedList([4,9,10,20,55,56]);
        let lst2 = new LinkedList([-1,5,19,41,57]);
        let returnedList = sortSorted(lst1, lst2);
         
        expect(returnedList.head.val).toBe(-1);
        expect(returnedList.head.next.val).toBe(4);
        expect(returnedList.head.next.next.val).toBe(5);
        expect(returnedList.head.next.next.next.val).toBe(9);
        expect(returnedList.head.next.next.next.next.val).toBe(10);
        expect(returnedList.head.next.next.next.next.next.val).toBe(19);
        expect(returnedList.head.next.next.next.next.next.next.val).toBe(20);
        expect(returnedList.head.next.next.next.next.next.next.next.val).toBe(41);
        expect(returnedList.head.next.next.next.next.next.next.next.next.val).toBe(55);
        expect(returnedList.head.next.next.next.next.next.next.next.next.next.val).toBe(56);
        expect(returnedList.tail.val).toBe(57);
    });
});