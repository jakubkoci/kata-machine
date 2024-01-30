export default function two_crystal_balls(breaks: boolean[]): number {
    const jump = Math.floor(Math.sqrt(breaks.length));

    let pointer = 0;
    while (pointer < breaks.length) {
        if (breaks[pointer]) {
            for (let i = pointer - jump; i < pointer; i++) {
                if (breaks[i]) return i;
            }
        }
        pointer = pointer + jump;
    }
    return -1;
}
