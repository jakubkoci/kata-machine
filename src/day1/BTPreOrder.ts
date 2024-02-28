export default function pre_order_search(head: BinaryNode<number>): number[] {
    const result: number[] = [];
    walk(head, result);
    return result;
}

function walk(node: BinaryNode<number>, result: number[]) {
    result.push(node.value);
    if (node.left) walk(node.left, result);
    if (node.right) walk(node.right, result);
}
