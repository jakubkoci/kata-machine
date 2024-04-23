export default class LRU<K, V> {
    private length: number = 0;
    private capacity: number;
    private head?: Node<K, V>;
    private tail?: Node<K, V>;
    private hashmap: Record<string, Node<K, V>> = {};

    constructor(capacity: number) {
        this.capacity = capacity;
    }

    update(key: K, value: V): void {
        let node: Node<K, V> | undefined = this.getNode(key);

        if (node) {
            // update
            this.log("update", { key, value });
            node.value = value;
        } else {
            // insert
            this.log("insert", { key, value });
            node = { key, value };
            if (!this.head) {
                this.head = node;
                this.tail = node;
            } else {
                node.next = this.head;
                this.head.prev = node;
                this.head = node;
            }

            this.hashmap[this.hash(key)] = node;
            this.length++;

            if (this.length > this.capacity) {
                this.remove();
            }
        }
    }

    remove() {
        if (this.tail) {
            this.log("remove", this.tail.key);
            delete this.hashmap[this.hash(this.tail.key)];
            this.tail = this.tail?.prev;
            if (this.tail) this.tail.next = undefined;
        }
    }

    get(key: K): V | undefined {
        return this.getNode(key)?.value;
    }

    getNode(key: K): Node<K, V> | undefined {
        const node = this.hashmap[this.hash(key)];
        if (node) {
            // move to the head
            if (node.prev) node.prev.next = node.next;
            if (node.next) node.next.prev = node;
            if (this.head) this.head.prev = node;
            node.next = this.head;
            this.head = node;
            if (this.tail === node) this.tail = node.prev;
            node.prev = undefined;
        }
        return node;
    }

    hash(key: K): string {
        return String(key);
    }

    getAll(): Node<K, V>[] {
        const result = [];
        for (
            let current = this.head;
            current !== undefined;
            current = current.next
        ) {
            result.push(current);
        }
        return result;
    }

    print() {
        for (const node of this.getAll()) {
            const { key, value, next, prev } = node;
            this.log({
                key,
                value,
                next: next?.key,
                prev: prev?.key,
            });
        }
        this.log();
    }

    log(...params: any) {
        // console.log(...params);
    }
}

interface Node<K, V> {
    key: K;
    value: V;
    prev?: Node<K, V>;
    next?: Node<K, V>;
}

const cache = new LRU(3);
cache.update(8, 1);
cache.update(9, 2);
cache.print();
cache.update(8, 3);
cache.print();
