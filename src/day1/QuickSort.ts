export default function quick_sort(arr: number[]): void {
    // const result: number[] = [];
    // sort_no_mutation(arr, result);
    sort(arr, 0, arr.length - 1);
}

function sort_no_mutation(arr: number[], result: number[]) {
    if (arr.length <= 1) {
        result.push(...arr);
        return;
    }

    let half = Math.floor(arr.length / 2);
    let pivot = arr[half];
    const lower = arr.filter((n) => n < pivot);
    const higher = arr.filter((n) => n > pivot);

    sort_no_mutation(lower, result);
    result.push(pivot);
    sort_no_mutation(higher, result);
}

function sort(arr: number[], start: number, end: number): void {
    if (start >= end) {
        return;
    }

    const pivot = arr[end];
    console.log({ pivot, start, end });
    let i = start;
    let j = end;
    while (i < j) {
        console.log("arr", arr);
        console.log({ pivot, i, j, arrI: arr[i], arrJ: arr[j] });
        while (arr[i] <= pivot && i < j) i++;
        while (arr[j] >= pivot && i < j) j--;
        swap(arr, i, j);
    }
    swap(arr, i, end);

    sort(arr, start, i - 1);
    sort(arr, i + 1, end);
}

function swap(arr: number[], i: number, j: number) {
    console.log("swap");
    const tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp;
}

// const result: number[] = [];
// sort_no_mutation([9, 3, 7, 4, 69, 420, 42], result);
// console.log("result", result);
