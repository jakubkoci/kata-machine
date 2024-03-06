export default function dfs(head: BinaryNode<number>, needle: number): boolean {
    return search(head, needle);
}

function search(head: BinaryNode<number> | null, needle: number): boolean {
    if (!head) {
        return false;
    }

    if (needle === head.value) {
        return true;
    }

    if (needle > head.value) {
        return search(head.right, needle);
    }

    if (needle < head.value) {
        return search(head.left, needle);
    }

    return false;
}
