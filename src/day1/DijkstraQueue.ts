export default class DijkstraQueue {
    public length: number;
    public data: Node[];

    constructor() {
        this.data = [];
        this.length = 0;
    }

    insert(node: Node): void {
        console.log(`insert`, node);
        this.data.push(node);
        this.length++;
        this.heapifyUp();
    }

    update(node: Node): void {
        console.log(`update`, node);
        let found = false;
        for (const n of this.data) {
            if (n.value === node.value) {
                found = true;
                n.distance = node.distance;
            }
        }
        if (found) this.heapifyUp();
    }

    delete(): Node | null {
        if (this.data.length > 0) {
            const min = this.data[0];
            const lastValue = this.data.pop();
            if (!lastValue) throw new Error("Pop from empty array");
            this.length--;
            this.data[0] = lastValue;
            this.heapifyDown();
            return min;
        }
        return null;
    }

    swap(i: number, j: number) {
        const tmp = this.data[i];
        this.data[i] = this.data[j];
        this.data[j] = tmp;
    }

    heapifyUp() {
        for (let index = this.data.length - 1; index > 0; index--) {
            let parentIndex = Math.floor(index / 2);
            if (this.data[index].distance < this.data[parentIndex].distance) {
                this.swap(index, parentIndex);
            }
        }
    }

    heapifyDown() {
        for (let index = 0; index < this.data.length;) {
            const leftIndex = 2 * index + 1;
            const rightIndex = 2 * index + 2;

            if (leftIndex > this.data.length - 1) {
                break;
            }

            const lowerChildIndex =
                rightIndex > this.data.length - 1 ||
                    this.data[leftIndex].distance < this.data[rightIndex].distance
                    ? leftIndex
                    : rightIndex;

            if (
                this.data[lowerChildIndex].distance < this.data[index].distance
            ) {
                this.swap(index, lowerChildIndex);
            }

            // We could stop the loop if we don't swap but we can count on the boundary check in the next loop.
            index = lowerChildIndex;
        }
    }
}

interface Node {
    value: number;
    distance: number;
}

const heap = new DijkstraQueue();

heap.insert({ value: 0, distance: 5 });
heap.insert({ value: 1, distance: 3 });
heap.insert({ value: 2, distance: 8 });
console.log(heap.data);

heap.update({ value: 0, distance: 1 });
console.log(heap.data);

heap.update({ value: 0, distance: 9 });
console.log(heap.data);
