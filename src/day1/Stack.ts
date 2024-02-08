export default class Stack<T> {
    public length: number;
    private head?: Node<T>;

    constructor() {
        this.length = 0;
    }

    push(item: T): void {
        if (!this.head) {
            this.head = { value: item };
        } else {
            const node = { value: item, next: this.head };
            this.head = node;
        }
        this.length++;
    }

    pop(): T | undefined {
        if (this.head) {
            const currentHead = this.head;
            this.head = this.head.next;
            this.length--;
            return currentHead.value;
        }
        return;
    }

    peek(): T | undefined {
        return this.head?.value;
    }
}

type Node<T> = {
    next?: Node<T>;
    value: T;
};
