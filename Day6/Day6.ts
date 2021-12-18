import { readLines } from "https://deno.land/std@0.117.0/io/mod.ts";
import * as path from "https://deno.land/std@0.117.0/path/mod.ts";

export const process = async (fileName: string, days = 80) => {
  const filename = path.join(Deno.cwd(), fileName);
  let fileReader = await Deno.open(filename);

  let startingFish: number[] = [];

  for await (let line of readLines(fileReader)) {
    startingFish = line.split(',').map((x) => parseInt(x, 10))
  }

  Deno.close(fileReader.rid)

  const fishCount = startingFish.reduce((acc, curr) => {
    acc[curr] = acc[curr] + 1;
    return acc
  }, [0, 0, 0, 0, 0, 0, 0, 0, 0, 0])


  for (let index = 0; index < days; index++) {
    let newFish = fishCount[0]

    fishCount.shift();

    fishCount[6] = fishCount[6] + newFish
    fishCount[8] = newFish
  }
  return fishCount.reduce((acc, curr) => acc + curr);
}


console.log(await process('/Day6/input.txt', 256))
