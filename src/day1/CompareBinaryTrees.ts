export default function compare(
    a: BinaryNode<number> | null,
    b: BinaryNode<number> | null,
): boolean {
    if (a === null && b === null) {
        return true;
    }

    if (a?.value === b?.value) {
        const result = compare(a?.left || null, b?.left || null);
        if (result) {
            return compare(a?.right || null, b?.right || null);
        }
    }

    return false;
}
