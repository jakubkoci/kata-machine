export default function dfs(
    graph: WeightedAdjacencyList,
    source: number,
    needle: number,
): number[] | null {
    const path = walk(graph, needle, source, []);
    return path?.reverse() || null;
}

function walk(
    graph: WeightedAdjacencyList,
    needle: number,
    node: number,
    visited: number[],
): number[] | null {
    console.log("node", node);

    if (node === needle) return [node];
    visited.push(node);

    const edges = graph[node];
    for (const edge of edges) {
        console.log("edge", edge);
        if (!visited.includes(edge.to)) {
            const path = walk(graph, needle, edge.to, visited);
            if (path?.length) {
                return path.concat(node);
            }
        }
    }
    return null;
}
