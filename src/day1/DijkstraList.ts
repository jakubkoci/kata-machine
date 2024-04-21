export default function dijkstra_list(
  source: number,
  sink: number,
  arr: WeightedAdjacencyList,
): number[] {
  const length = arr.length;
  const visited = new Array(length).fill(false);
  const distances = new Array(length).fill(Number.MAX_VALUE) as number[];
  const parents = new Array(length).fill(-1) as number[];
  const queue = [source];
  distances[source] = 0;

  while (queue.length) {
    const node = queue.shift();
    if (node !== undefined && !visited[node]) {
      console.log("node", node);

      const children = arr[node];
      for (const edge of children) {
        console.log("edge", edge);
        const d = distances[node] + edge.weight;
        if (d < distances[edge.to]) {
          distances[edge.to] = d;
          parents[edge.to] = node;
        }
        queue.push(edge.to);
      }

      visited[node] = true;
    }
  }

  const path = [sink];
  let parent = parents[sink];
  while (parent > -1) {
    path.push(parent);
    parent = parents[parent];
  }

  console.log("parents", parents);
  console.log("distances", distances);
  console.log("path", path);

  return path.reverse();
}
