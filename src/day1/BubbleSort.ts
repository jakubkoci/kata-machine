export default function bubble_sort(arr: number[]): void {
    for (let j = 0; j < arr.length - 1 - j; j++) {
        for (let i = 0; i < arr.length - 1; i++) {
            if (arr[i] > arr[i + 1]) {
                const tmp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = tmp;
            }
        }
    }
}
