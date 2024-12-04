const fs = require("fs");
const readline = require("readline");

async function readFileLineByLine(filePath) {
  const arr1 = [];
  const arr2 = [];
  try {
    const fileStream = fs.createReadStream(filePath);

    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity, // Recognizes all instances of CR LF (\r\n) as a single line break.
    });

    for await (const line of rl) {
      const splitLine = line.split("  ").map((el) => parseInt(el));
      arr1.push(splitLine[0]);
      arr2.push(splitLine[1]);
    }
    arr1.sort((a, b) => a - b);
    arr2.sort((a, b) => a - b);
    return { arr1, arr2 };
  } catch (err) {
    console.error(`Error reading file: ${err.message}`);
    return {};
  }
}

const filePath = "d1.txt";
async function solve1() {
  const input = await readFileLineByLine(filePath);
  deltaSum = 0;
  for (let i = 0; i < input.arr1.length; i++) {
    const di = Math.abs(input.arr1[i] - input.arr2[i]);
    deltaSum += di;
  }
  console.log('part1: ', deltaSum);
}
solve1();

async function solve2() {
  const input = await readFileLineByLine(filePath);
  searchMap = new Map();
  result = 0;
  for (let i = 0; i < input.arr1.length; i++) {
    const occurance =
      searchMap.get(input.arr1[i]) ||
      input.arr2.filter((el) => el === input.arr1[i]).length;

    searchMap.set(input.arr1[i], occurance);
    result += input.arr1[i] * occurance;
  }
  console.log('part2: ', result);
}
solve2();
