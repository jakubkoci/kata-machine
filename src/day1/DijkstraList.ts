import DijkstraQueue from "./DijkstraQueue";

export default function dijkstra_list(
  source: number,
  sink: number,
  arr: WeightedAdjacencyList,
): number[] {
  // return dijkstra_list_simple(source, sink, arr);
  return dijkstra_list_optimized(source, sink, arr);
}

function dijkstra_list_simple(
  source: number,
  sink: number,
  arr: WeightedAdjacencyList,
): number[] {
  const visited = new Array(arr.length).fill(false);
  const distances = new Array(arr.length).fill(Number.MAX_VALUE) as number[];
  const parents = new Array(arr.length).fill(-1) as number[];
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

  const path = createPath(parents, sink);

  console.log("parents", parents);
  console.log("distances", distances);
  console.log("path", path);

  return path.reverse();
}

function dijkstra_list_optimized(
  source: number,
  sink: number,
  arr: WeightedAdjacencyList,
): number[] {
  const distances = new Array(arr.length).fill(Infinity) as number[];
  const parents = new Array(arr.length).fill(-1) as number[];
  distances[source] = 0;

  const queue = new DijkstraQueue();
  for (const [i, _] of arr.entries()) {
    if (i === 0) {
      queue.insert({ value: i, distance: 0 });
    } else {
      queue.insert({ value: i, distance: Infinity });
    }
  }

  while (queue.length) {
    const node = queue.delete();
    if (node) {
      console.log("node", node);
      const children = arr[node.value];
      for (const edge of children) {
        console.log("edge", edge);
        const d = distances[node.value] + edge.weight;
        if (d < distances[edge.to]) {
          distances[edge.to] = d;
          parents[edge.to] = node.value;
          queue.update({ value: edge.to, distance: d });
        }
      }
    }
  }

  const path = createPath(parents, sink);

  console.log("parents", parents);
  console.log("distances", distances);
  console.log("path", path);

  return path.reverse();
}

function createPath(parents: number[], start: number): number[] {
  const path = [];
  let current = start;
  while (current > -1) {
    path.push(current);
    current = parents[current];
  }
  return path;
}
