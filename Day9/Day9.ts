import { readLines } from "https://deno.land/std@0.117.0/io/mod.ts";
import * as path from "https://deno.land/std@0.117.0/path/mod.ts";

export const process = async (fileName: string) => {
  const filename = path.join(Deno.cwd(), fileName);
  let fileReader = await Deno.open(filename);

  let map: number[][] = [];

  for await (let line of readLines(fileReader)) {
    map.push(line.split('').map((x) => parseInt(x, 10) + 1))
  }

  Deno.close(fileReader.rid)

  let sumOfLowest = 0

  map.forEach((row, indexY) => {
    row.forEach((XY, indexX) => {
      const left = row[indexX - 1] || 11
      const right = row[indexX + 1] || 11
      const down = map[indexY + 1] && map[indexY + 1][indexX] || 11
      const up = map[indexY - 1] && map[indexY - 1][indexX] || 11

      if (XY < left && XY < right && XY < down && XY < up) {
        sumOfLowest += XY
      }
    })
  })

  return sumOfLowest
}

const calculateBasin = (map: number[][], value: number, indexX: number, indexY: number): string[] => {
  const left = map[indexY][indexX - 1] || 10
  const right = map[indexY][indexX + 1] || 10
  const down = map[indexY + 1] && map[indexY + 1][indexX] || 10
  const up = map[indexY - 1] && map[indexY - 1][indexX] || 10

  let coords = [`${indexX},${indexY}`]

  if (left !== 10 && left > value) { coords.push(...calculateBasin(map, left, indexX - 1, indexY)) }
  if (right !== 10 && right > value) { coords.push(...calculateBasin(map, right, indexX + 1, indexY)) }
  if (down !== 10 && down > value) { coords.push(...calculateBasin(map, down, indexX, indexY + 1)) }
  if (up !== 10 && up > value) { coords.push(...calculateBasin(map, up, indexX, indexY - 1)) }

  return coords
}

export const process2 = async (fileName: string) => {
  const filename = path.join(Deno.cwd(), fileName);
  let fileReader = await Deno.open(filename);

  let map: number[][] = [];

  for await (let line of readLines(fileReader)) {
    map.push(line.split('').map((x) => parseInt(x, 10) + 1))
  }

  Deno.close(fileReader.rid)

  let lowPoints: number[][] = []

  map.forEach((row, indexY) => {
    row.forEach((XY, indexX) => {
      const left = row[indexX - 1] || 10
      const right = row[indexX + 1] || 10
      const down = map[indexY + 1] && map[indexY + 1][indexX] || 10
      const up = map[indexY - 1] && map[indexY - 1][indexX] || 10

      if (XY < left && XY < right && XY < down && XY < up) {
        lowPoints.push([XY, indexX, indexY])
      }
    })
  })

  let basinSizes: number[] = []
  lowPoints.forEach(lowPoint => {
    const deduped = new Set(calculateBasin(map, lowPoint[0], lowPoint[1], lowPoint[2]))
    basinSizes.push(deduped.size)
  })

  const sortedSizes = basinSizes.sort((a, b) => b - a)

  return sortedSizes[0] * sortedSizes[1] * sortedSizes[2]
}

// console.log(await process('/Day9/input.txt'))
console.log(await process2('/Day9/input.txt'))
