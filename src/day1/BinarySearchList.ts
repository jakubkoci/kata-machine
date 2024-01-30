export default function bs_list(haystack: number[], needle: number): boolean {
    let start = 0;
    let end = haystack.length;

    while (start <= end) {
        const middle = Math.floor(start + (end - start) / 2);
        const value = haystack[middle];

        if (value === needle) {
            return true;
        }
        if (value < needle) {
            start = middle + 1;
        } else {
            end = middle - 1;
        }
    }
    return false;
}
