import { readLines } from "https://deno.land/std@0.117.0/io/mod.ts";
import * as path from "https://deno.land/std@0.117.0/path/mod.ts";

export const process = async (fileName: string) => {
  const filename = path.join(Deno.cwd(), fileName);
  let fileReader = await Deno.open(filename);

  let startPositions: number[] = [];

  for await (let line of readLines(fileReader)) {
    startPositions = line.split(',').map((x) => parseInt(x, 10)).sort((a, b) => a - b);
  }

  Deno.close(fileReader.rid)

  let start = startPositions.at(1) as number
  let end = startPositions.at(-1) as number

  let lowestFuelCost = Infinity;

  for (let index = start; index < end; index++) {
    const fuelCost = startPositions.reduce((acc, curr) => {
      return acc + Math.abs(curr - index)
    }, 0)

    if (fuelCost < lowestFuelCost) { lowestFuelCost = fuelCost }
  }

  return lowestFuelCost
}

const calculateTriangleNumber = (number: number) => (number * (number + 1)) / 2

export const process2 = async (fileName: string) => {
  const filename = path.join(Deno.cwd(), fileName);
  let fileReader = await Deno.open(filename);

  let startPositions: number[] = [];

  for await (let line of readLines(fileReader)) {
    startPositions = line.split(',').map((x) => parseInt(x, 10)).sort((a, b) => a - b);
  }

  Deno.close(fileReader.rid)

  let start = startPositions.at(1) as number
  let end = startPositions.at(-1) as number

  let lowestFuelCost = Infinity;

  for (let index = start; index < end; index++) {
    const fuelCost = startPositions.reduce((acc, curr) => {
      return acc + calculateTriangleNumber(Math.abs(curr - index))
    }, 0)

    if (fuelCost < lowestFuelCost) { lowestFuelCost = fuelCost }
  }

  return lowestFuelCost
}


// console.log(await process('/Day7/input.txt'))
console.log(await process2('/Day7/input.txt'))
