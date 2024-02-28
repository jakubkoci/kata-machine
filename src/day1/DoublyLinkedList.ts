export default class DoublyLinkedList<T> {
    public length: number;
    private head?: Node<T>;

    constructor() {
        this.length = 0;
    }

    prepend(item: T): void {
        const node: Node<T> = { value: item };
        if (!this.head) {
            this.head = node;
        } else {
            node.next = this.head;
            this.head.prev = node;
            this.head = node;
        }
        this.length++;
    }

    insertAt(item: T, idx: number): void {
        if (idx < 0) throw new Error("Out of range");
        if (!this.head) throw new Error("List is empty");
        const nodeAtPosition = this.getNodeAt(idx);
        if (!nodeAtPosition) throw new Error("Out of range");

        const node: Node<T> = { value: item };
        node.prev = nodeAtPosition.prev;
        node.next = nodeAtPosition;

        if (nodeAtPosition.prev) {
            nodeAtPosition.prev.next = node;
        } else {
            this.head = node;
        }

        nodeAtPosition.prev = node;
        this.length++;
    }

    append(item: T): void {
        const node: Node<T> = { value: item };
        if (!this.head) {
            this.head = node;
        } else {
            let lastNode = this.head;
            while (lastNode.next) {
                lastNode = lastNode.next;
            }
            node.prev = lastNode;
            lastNode.next = node;
        }
        this.length++;
    }

    remove(item: T): T | undefined {
        let nodeWithValue = this.head;
        while (nodeWithValue && nodeWithValue.value !== item) {
            nodeWithValue = nodeWithValue.next;
        }
        if (nodeWithValue) {
            this.removeNode(nodeWithValue);
        }
        return nodeWithValue?.value;
    }

    get(idx: number): T | undefined {
        if (idx < 0) throw new Error("Out of range");
        if (!this.head) throw new Error("List is empty");
        const nodeAtPosition = this.getNodeAt(idx);
        if (!nodeAtPosition) throw new Error("Out of range");
        return nodeAtPosition.value;
    }

    removeAt(idx: number): T | undefined {
        if (idx < 0) throw new Error("Out of range");
        if (!this.head) throw new Error("List is empty");
        let nodeAtPosition = this.getNodeAt(idx);
        if (!nodeAtPosition) throw new Error("Out of range");
        this.removeNode(nodeAtPosition);
        return nodeAtPosition.value;
    }

    private getNodeAt(idx: number): Node<T> | undefined {
        let nodeAtPosition = this.head;
        for (let i = 0; nodeAtPosition && i < idx; i++) {
            nodeAtPosition = nodeAtPosition.next;
        }
        return nodeAtPosition;
    }

    private removeNode(node: Node<T>) {
        if (node.prev) {
            node.prev.next = node.next;
        }

        if (node.next) {
            node.next.prev = node.prev;
        }

        if (node === this.head) {
            this.head = node.next;
        }

        this.length--;
    }
}

interface Node<T> {
    prev?: Node<T>;
    next?: Node<T>;
    value: T;
}
