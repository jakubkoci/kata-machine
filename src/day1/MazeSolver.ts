export default function solve(
    maze: string[],
    wall: string,
    start: Point,
    end: Point,
): Point[] {
    const path = move(maze, wall, start, end, []);
    return path;
}

function move(
    maze: string[],
    wall: string,
    current: Point,
    end: Point,
    path: Point[],
): Point[] {
    const { x, y } = current;
    const pathWithCurrent = path.concat(current);

    const isOutOfMap =
        y < 0 || y >= maze.length || x < 0 || x >= maze[y].length;
    const isWall = !isOutOfMap && maze[y][x] === wall;
    const isEnd = pointsEqual(current, end);
    const isVisited = path.find((p) => pointsEqual(p, current));

    const stop = isWall || isOutOfMap || isEnd || isVisited;

    if (stop) {
        return pathWithCurrent;
    }

    const path1 = move(maze, wall, { x: x + 1, y }, end, pathWithCurrent);
    const path2 = move(maze, wall, { x: x - 1, y }, end, pathWithCurrent);
    const path3 = move(maze, wall, { x, y: y + 1 }, end, pathWithCurrent);
    const path4 = move(maze, wall, { x, y: y - 1 }, end, pathWithCurrent);

    if (pathReachedEnd(path1, end)) return path1;
    if (pathReachedEnd(path2, end)) return path2;
    if (pathReachedEnd(path3, end)) return path3;
    if (pathReachedEnd(path4, end)) return path4;

    return [];
}

function pointsEqual(p1: Point, p2: Point) {
    return p1.x === p2.x && p1.y === p2.y;
}

function pathReachedEnd(path: Point[], end: Point) {
    return path.length > 0 && pointsEqual(path[path.length - 1], end);
}
