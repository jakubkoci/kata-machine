export default class MinHeap {
    public length: number;
    public data: number[];

    constructor() {
        this.data = [];
        this.length = 0;
    }

    insert(value: number): void {
        this.data.push(value);
        this.length++;

        for (let index = this.data.length - 1; index > 0; index--) {
            let parentIndex = Math.floor(index / 2);
            if (this.data[index] < this.data[parentIndex]) {
                this.swap(index, parentIndex);
            }
        }
    }

    delete(): number {
        if (this.data.length > 0) {
            const min = this.data[0];

            const lastValue = this.data.pop();
            if (!lastValue) throw new Error("Pop from empty array");
            this.length--;
            this.data[0] = lastValue;

            for (let index = 0; index < this.data.length; ) {
                const leftIndex = 2 * index + 1;
                const rightIndex = 2 * index + 2;

                if (leftIndex > this.data.length - 1) {
                    break;
                }

                const lowerChildIndex =
                    rightIndex > this.data.length - 1 ||
                    this.data[leftIndex] < this.data[rightIndex]
                        ? leftIndex
                        : rightIndex;

                if (this.data[lowerChildIndex] < this.data[index]) {
                    this.swap(index, lowerChildIndex);
                }

                // We could stop the loop if we don't swap but we can count on the boundary check in the next loop.
                index = lowerChildIndex;
            }
            return min;
        }
        return 0;
    }

    swap(i: number, j: number) {
        const tmp = this.data[i];
        this.data[i] = this.data[j];
        this.data[j] = tmp;
    }
}

const heap = new MinHeap();

heap.insert(10);
console.log(heap.data);

heap.insert(4);
console.log(heap.data);

heap.insert(15);
console.log(heap.data);

console.log(heap.delete());
console.log(heap.data);

console.log(heap.delete());
console.log(heap.data);
