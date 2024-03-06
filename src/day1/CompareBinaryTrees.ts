export default function compare(
    a: BinaryNode<number> | null,
    b: BinaryNode<number> | null,
): boolean {
    if (a === null && b === null) {
        return true;
    }

    if (a && b) {
        if (a.value === b.value) {
            return compare(a.left, b.left) && compare(a.right, b.right);
        }
    }

    return false;
}
