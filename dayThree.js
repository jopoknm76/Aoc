const fs = require("fs");

async function readlineByLine(filePath) {
  try {
    const data = fs.readFileSync(filePath, "utf8");
    return data;
  } catch (err) {
    console.error(err);
  }
}

const filePath = "d3.txt";
async function solve1() {
  const inp = await readlineByLine(filePath);
  const pairs = inp.match(/mul\(\d{1,3},\d{1,3}\)/g);
  const result = pairs
    .map((p) => pairMultiplication(p))
    .reduce((count, el) => count + el, 0);

  console.log("part1: ", result);
}
solve1();

async function solve2() {
  const inp = await readlineByLine(filePath);
  const pattern = /mul\(\d{1,3},\d{1,3}\)/g;
  const patternDo = /do\(\)/g;
  const patternDont = /don't\(\)/g;
  const matches = [];
  const result = [];
  let match;
  while ((match = patternDo.exec(inp)) !== null) {
    matches.push({ match: match[0], index: match.index });
  }
  while ((match = patternDont.exec(inp)) !== null) {
    matches.push({ match: match[0], index: match.index });
  }

  while ((match = pattern.exec(inp)) !== null) {
    matches.push({ match: match[0], index: match.index });
  }
  matches.sort((a, b) => a.index - b.index);
  for (let i = 0; i < matches.length; i++) {
    const element = matches[i];
    const operation = matches.filter(
      (x) => x.match.includes("do") && x.index < element.index
    );
    const operation_match = operation.at(-1) ? operation.at(-1).match : null;

    if (!element.match.includes("do")) {
      if (
        operation_match === "do()" || !operation_match
      ) {
        result.push(pairMultiplication(element.match));
      }
    }
  }

  console.log(
    "part2: ",
    result.reduce((count, el) => count + el, 0)
  );
}
function pairMultiplication(p) {
  return p
    .replaceAll("mul(", "")
    .replaceAll(")", "")
    .split(",")
    .reduce((acc, el) => parseInt(el) * acc, 1);
}
solve2();
