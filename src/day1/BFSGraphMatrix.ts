export default function bfs(
    graph: WeightedAdjacencyMatrix,
    source: number,
    needle: number,
): number[] | null {
    console.log(JSON.stringify(graph));

    const queue: number[] = [source];
    const visited: number[] = [];
    const parents: number[] = [];
    let found = false;
    let node = queue.shift();

    while (node !== undefined) {
        console.log(`queue`, queue);
        console.log(`visited`, visited);
        console.log(`node`, node);

        if (node === needle) {
            found = true;
            break;
        }

        const children: number[] = graph[node];
        console.log(`children`, children);

        for (const [child, weight] of children.entries()) {
            if (weight > 0 && !visited.includes(child)) {
                parents[child] = node;
                queue.push(child);
            }
        }

        visited.push(node);
        node = queue.shift();
    }

    if (found) {
        const path = [needle];
        let parent = parents[needle];
        while (parent !== undefined) {
            path.push(parent);
            parent = parents[parent];
            console.log(parent);
        }
        console.log(`parents`, parents);
        console.log(`path`, path);
        return path.reverse();
    }

    return null;
}
