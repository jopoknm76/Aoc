const fs = require("fs");
const readline = require("readline");

async function readlineByLine(filePath) {
    const arr = [];
    try {
        const fileStream = fs.createReadStream(filePath);

        const rl = readline.createInterface({
            input: fileStream,
            crlfDelay: Infinity,
        });

        for await (const line of rl) {
            const splitLine = line.split("")
            arr.push(splitLine);
        }
        return arr;
    } catch (err) {
        console.error(`Error reading file: ${err.message}`);
        return [];
    }
}
const filePath = 'd6.txt';
async function solve() {
    const playground = await readlineByLine(filePath);
    let i = playground.findIndex(r => r.includes("^"));
    let j = playground[i].findIndex(c => c === '^');
    partOne(i, j, playground);
    partTwo(i, j, playground)


}
async function partOne(i, j, playground) {
    let way = 'UP';

    do {
        try {
            if (way === 'UP' && playground[i - 1][j] !== '#') {
                i--;
                coordinates.push(`${i}|${j}`)
            }
            else if (way === 'UP' && playground[i - 1][j] === '#') {
                way = 'RIGHT';
            } else if (way === 'RIGHT' && playground[i][j + 1] !== '#') {
                j++;
                coordinates.push(`${i}|${j}`)
            } else if (way === 'RIGHT' && playground[i][j + 1] === '#') {
                way = 'DOWN'
            } else if (way === 'DOWN' && playground[i + 1][j] !== '#') {
                i++;
                coordinates.push(`${i}|${j}`)
            } else if (way === 'DOWN' && playground[i + 1][j] == '#') {
                way = 'LEFT'
            } else if (way === 'LEFT' && playground[i][j - 1] !== '#') {
                j--;
                coordinates.push(`${i}|${j}`)
            } else if (way === 'LEFT' && playground[i][j - 1] === '#') {
                way = 'UP'
            }
        } catch (error) {
            break;
        }
    } while (true);
    const setCoordinates = new Set(coordinates)
    const positions = [...setCoordinates].length
    console.log('partOne: ', positions);
}

async function partOneMod(i, j, playground) {
    let way = 'UP';
    let coordinates = new Set();
    try {
        do {
            if (way === 'UP' && playground[i - 1][j] !== '#') {
                i--;
            } else if (way === 'UP' && playground[i - 1][j] === '#') {
                way = 'RIGHT';
                const check = `${i}|${j}|RR`;
                if (coordinates.has(check)) {
                    return 'LOOP_DETECTED';
                } else {
                    coordinates.add(check);
                }
            } else if (way === 'RIGHT' && playground[i][j + 1] !== '#') {
                if (playground[i][j + 1] === undefined) { return false; }

                j++;
            } else if (way === 'RIGHT' && playground[i][j + 1] === '#') {
                way = 'DOWN';
                const check = `${i}|${j}|RD`;
                if (coordinates.has(check)) {
                    return 'LOOP_DETECTED';
                } else {
                    coordinates.add(check);
                }
            } else if (way === 'DOWN' && playground[i + 1][j] !== '#') {
                i++;
            } else if (way === 'DOWN' && playground[i + 1][j] === '#') {
                way = 'LEFT';
                const check = `${i}|${j}|RL`;
                if (coordinates.has(check)) {
                    return 'LOOP_DETECTED';
                } else {
                    coordinates.add(check);
                }
            } else if (way === 'LEFT' && playground[i][j - 1] !== '#') {
                if (playground[i][j - 1] === undefined) { return false; }
                j--;
            } else if (way === 'LEFT' && playground[i][j - 1] === '#') {
                way = 'UP';
                const check = `${i}|${j}|RU`;
                if (coordinates.has(check)) {
                    return 'LOOP_DETECTED';
                } else {
                    coordinates.add(check);
                }
            }
        } while (true);
    } catch (error) {
        return 'ERROR_OCCURED';
    }
}
async function partTwo(i, j, playground) {
    let count = 0;

    for (let y = 0; y < playground.length; y++) {
        const row = playground[y];
        for (let x = 0; x < row.length; x++) {
            const element = row[x];
            if (element === '.') {
                let newPlayground = JSON.parse(JSON.stringify([...playground]));
                newPlayground[y][x] = '#';
                const loop = await partOneMod(i, j, newPlayground);
                if (loop === 'LOOP_DETECTED') {
                    count++
                }
            }
        }
    }
    console.log('partTwo: ', count)
}

solve();

