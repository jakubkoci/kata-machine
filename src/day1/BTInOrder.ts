export default function in_order_search(head: BinaryNode<number>): number[] {
    const result: number[] = [];
    walk(head, result);
    return result;
}

function walk(node: BinaryNode<number>, result: number[]) {
    if (node.left) walk(node.left, result);
    result.push(node.value);
    if (node.right) walk(node.right, result);
}
