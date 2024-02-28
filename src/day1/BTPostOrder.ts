export default function post_order_search(head: BinaryNode<number>): number[] {
    const result: number[] = [];
    walk(head, result);
    return result;
}

function walk(node: BinaryNode<number>, result: number[]) {
    if (node.left) walk(node.left, result);
    if (node.right) walk(node.right, result);
    result.push(node.value);
}
