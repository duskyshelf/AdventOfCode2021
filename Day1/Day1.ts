import { readLines } from "https://deno.land/std@0.117.0/io/mod.ts";
import * as path from "https://deno.land/std@0.117.0/path/mod.ts";

export const process = async (fileName: string) => {
  const filename = path.join(Deno.cwd(), fileName);
  let fileReader = await Deno.open(filename);

  let currentDepth = 0
  let countOfIncreases = -1

  for await (let line of readLines(fileReader)) {
    const depth = parseInt(line, 10);
    if(depth > currentDepth) { countOfIncreases++ }
    currentDepth = depth
  }

  Deno.close(fileReader.rid)

  return countOfIncreases;
}

const sumArray = (depths: number[]): number => depths.reduce((acc, value) => acc + value)

export const process2 = async (fileName: string) => {
  const filename = path.join(Deno.cwd(), fileName);
  let fileReader = await Deno.open(filename);

  let rollingDepths: number[] = [];
  let countOfIncreases = 0

  for await (let line of readLines(fileReader)) {
    const depth = parseInt(line, 10);
    if (rollingDepths.length < 3) { rollingDepths.push(depth) }
    else {
      const currentDepth = sumArray(rollingDepths);
      const [first, ...rest] = rollingDepths;
      rollingDepths = [...rest, depth ];
      const newDepth = sumArray(rollingDepths);

      if (newDepth > currentDepth) {countOfIncreases++ }
    }
  }

  Deno.close(fileReader.rid)

  return countOfIncreases;
}

// console.log(await process('/Day1/input.txt'))
console.log(await process2('/Day1/input.txt'))
