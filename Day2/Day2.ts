import { readLines } from "https://deno.land/std@0.117.0/io/mod.ts";
import * as path from "https://deno.land/std@0.117.0/path/mod.ts";

export const process = async (fileName: string) => {
  const filename = path.join(Deno.cwd(), fileName);
  let fileReader = await Deno.open(filename);

  let horizontal = 0;
  let depth = 0;

  for await (let line of readLines(fileReader)) {
    const [direction, distanceStr] = line.split(' ')

    const distance = parseInt(distanceStr)

    if(direction === 'forward') { horizontal += distance }
    if(direction === 'up') { depth -= distance }
    if(direction === 'down') { depth += distance }
  }

  Deno.close(fileReader.rid)

  return horizontal * depth;
}

export const process2 = async (fileName: string) => {
  const filename = path.join(Deno.cwd(), fileName);
  let fileReader = await Deno.open(filename);

  let horizontal = 0;
  let depth = 0;
  let aim = 0;

  for await (let line of readLines(fileReader)) {
    const [direction, distanceStr] = line.split(' ')

    const distance = parseInt(distanceStr)

    if(direction === 'forward') {
      horizontal += distance
      depth += (distance * aim)
    }
    if(direction === 'up') { aim -= distance }
    if(direction === 'down') { aim += distance }
  }

  Deno.close(fileReader.rid)

  return horizontal * depth;
}

// console.log(await process('/Day2/input.txt'))
// console.log(await process2('/Day2/input.txt'))
