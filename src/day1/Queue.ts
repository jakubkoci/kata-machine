export default class Queue<T> {
    public length: number;
    private head?: Node<T>;

    constructor() {
        this.length = 0;
    }

    enqueue(item: T): void {
        const node = new Node(item);
        if (!this.head) {
            this.head = node;
        } else {
            let tail = this.head;
            while (tail.next) {
                tail = tail.next;
            }
            tail.next = node;
        }
        this.length++;
    }
    deque(): T | undefined {
        if (this.head) {
            const value = this.head.value;
            this.head = this.head.next;
            this.length--;
            return value;
        }
        return;
    }
    peek(): T | undefined {
        return this.head?.value;
    }
}

class Node<T> {
    next: Node<T>;
    value: T;

    constructor(value: T) {
        this.value = value;
    }
}
