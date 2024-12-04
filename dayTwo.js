const fs = require("fs");
const readline = require("readline");

async function readlineByLine(filePath) {
  const arr = [];
  try {
    const fileStream = fs.createReadStream(filePath);

    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity, // Recognizes all instances of CR LF (\r\n) as a single line break.
    });

    for await (const line of rl) {
      const splitLine = line.split(" ").map((el) => parseInt(el));
      arr.push(splitLine);
    }
    return arr;
  } catch (err) {
    console.error(`Error reading file: ${err.message}`);
    return [];
  }
}

const filePath = "d2.txt";

async function solve1() {
  const input = await readlineByLine(filePath);
  counter = 0;
  for (let i = 0; i < input.length; i++) {
    const element = input[i];
    difference = input[i][0] - input[i][1];
    factor = "";
    if (difference > 0 && difference < 4) {
      factor = "DOWN";
    } else if (difference < 0 && difference > -4) {
      factor = "UP";
    }

    if (factor) {
      for (let j = 1; j < element.length; j++) {
        d2 = element[j - 1] - element[j];
        if (
          (d2 > 0 && d2 < 4 && factor === "DOWN") ||
          (d2 < 0 && d2 > -4 && factor === "UP")
        ) {
        } else {
          break;
        }
        if (j === element.length - 1) {
          console.log();
          counter++;
        }
      }
    }
  }
  console.log('part1: ', counter);
}
solve1();

async function solve2() {
  const input = await readlineByLine(filePath);
  counter = 0;
  for (let i = 0; i < input.length; i++) {
    const element = input[i];
    difference = input[i][0] - input[i][1];
    factor = "";
    if (difference > 0 && difference < 4) {
      factor = "DOWN";
    } else if (difference < 0 && difference > -4) {
      factor = "UP";
    }

    for (let j = 1; j < element.length; j++) {
      d = element[j - 1] - element[j];
      if (
        (d > 0 && d < 4 && factor === "DOWN") ||
        (d < 0 && d > -4 && factor === "UP")
      ) {
      } else {

        if (removeOneAndCheck(element)) {
          counter++;
        }
        break;
      }
      if (j === element.length - 1) {
        counter++;
      }
    }
  }
  console.log('part2: ', counter);
}

function removeOneAndCheck(arr) {
  let valid = false;
  for (let i = 0; i < arr.length; i++) {
    const input = [...arr.slice(0, i), ...arr.slice(i + 1)];
    difference = input[0] - input[1];
    factor = "";
    if (difference > 0 && difference < 4) {
      factor = "DOWN";
    } else if (difference < 0 && difference > -4) {
      factor = "UP";
    }

    if (factor) {
      for (let j = 1; j < input.length; j++) {
        d2 = input[j - 1] - input[j];
        if (
          (d2 > 0 && d2 < 4 && factor === "DOWN") ||
          (d2 < 0 && d2 > -4 && factor === "UP")
        ) {
        } else {
          break;
        }
        if (j === input.length - 1) {
          valid = true;
        }
      }
    }

    if (valid) {
      break;
    }
  }

  return valid;
}
solve2();
