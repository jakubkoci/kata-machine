export default function bfs(
    graph: WeightedAdjacencyMatrix,
    source: number,
    needle: number,
): number[] | null {
    console.log(JSON.stringify(graph));

    const queue: number[] = [];
    queue.push(source);
    const visited: number[] = [];
    const parents: number[] = [];
    let found = false;

    do {
        console.log(`queue`, queue);
        console.log(`visited`, visited);

        const node = queue.shift();
        console.log(`node`, node);

        if (node === undefined) throw new Error("Dequed node is not defined.");

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
    } while (queue.length > 0);

    if (found) {
        const path = [];
        let parent = parents[needle];
        path.push(needle);
        do {
            if (parent !== undefined) path.push(parent);
            parent = parents[parent];
            console.log(parent);
        } while (parent !== undefined);
        console.log(`parents`, parents);
        console.log(`path`, path);
        return path.reverse();
    }

    return null;
}
