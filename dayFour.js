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
const filePath = 'd4.txt';
async function solve1() {
  const input = await readlineByLine(filePath)
  let counter = 0;
  for (let i = 0; i < input.length; i++) {
    const row = input[i];
    for (let j = 0; j < row.length; j++) {
      if (j < row.length - 3) {
        // pozerame riadky
        const s = (`${row[j]}${row[j + 1]}${row[j + 2]}${row[j + 3]}`)
        if (s === 'XMAS' || s === 'SAMX') counter++;
      }
      if (i < input.length - 3) {
        // pozerame stlpce
        const s = (`${input[i][j]}${input[i + 1][j]}${input[i + 2][j]}${input[i + 3][j]}`)
        if (s === 'XMAS' || s === 'SAMX') counter++;

      }
      // diagonala TR-BL
      if (i < input.length - 3 && j < row.length - 3) {
        const s = (`${input[i][j]}${input[i + 1][j + 1]}${input[i + 2][j + 2]}${input[i + 3][j + 3]}`)
        if (s === 'XMAS' || s === 'SAMX') counter++;

      }
      // diagonala TL-BR
      if (i < input.length - 3 && j - 3 > -1) {
        const s = (`${input[i][j]}${input[i + 1][j - 1]}${input[i + 2][j - 2]}${input[i + 3][j - 3]}`)
        if (s === 'XMAS' || s === 'SAMX') counter++;

      }
    }
  }
  console.log('part1: ', counter)
}
solve1();

async function solve2() {
  const input = await readlineByLine(filePath)
  const validXMAS = ['MSAMS', "SSAMM", "MMASS", "SMASM"]
  let counter = 0;
  for (let i = 0; i < input.length; i++) {
    const row = input[i];
    for (let j = 0; j < row.length; j++) {
      if (j < row.length - 2 && i < input.length - 2) {
        const s = (`${input[i][j]}${input[i][j + 2]}${input[i + 1][j + 1]}${input[i + 2][j]}${input[i + 2][j + 2]}`);
        if (validXMAS.includes(s)) counter++;
      }
    }
  }
  console.log('part2: ', counter)
}
solve2();
