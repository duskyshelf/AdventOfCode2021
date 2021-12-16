import { readLines } from 'https://deno.land/std@0.117.0/io/mod.ts'
import * as path from 'https://deno.land/std@0.117.0/path/mod.ts'

export const mapToCoords = (line: string, diagonals = false): string[] => {
  const [start, end] = line.split(' -> ');
  const [startX, startY] = start.split(',').map((x) => parseInt(x, 10))
  const [endX, endY] = end.split(',').map((x) => parseInt(x, 10))

  let coords = []

  const horizontalLine = startX === endX
  const verticalLine = startY === endY
  if (horizontalLine) {
    const [smallNum, bigNum] = [startY, endY].sort((a, b) => a - b);
    const distance = bigNum - smallNum

    for (let index = smallNum; index <= bigNum; index++) {
      coords.push(startX + ',' + index)
    }
  }
  if (verticalLine) {
    const [smallNum, bigNum] = [startX, endX].sort((a, b) => a - b);
    const distance = bigNum - smallNum

    for (let index = smallNum; index <= bigNum; index++) {
      coords.push(index + ',' + startY)
    }
  }

  if (diagonals) {
    const upSlope = endX - startX === endY - startY
    const downSlope = endX - startX === startY - endY

    const [smallX, bigX] = [startX, endX].sort((a, b) => a - b);
    const [smallY, bigY] = [startY, endY].sort((a, b) => a - b);

    if (upSlope) {
      for (let indexX = smallX, indexY = smallY; indexX <= bigX; indexX++, indexY++) {
        coords.push(indexX + ',' + indexY)
      }
    }
    if (downSlope) {
      for (let indexX = smallX, indexY = bigY; indexX <= bigX; indexX++, indexY--) {
        coords.push(indexX + ',' + indexY)
      }
    }
  }

  return coords;
}

export const process = async (fileName: string, diagonals = false) => {
  const filename = path.join(Deno.cwd(), fileName);
  let fileReader = await Deno.open(filename);

  const coords = []

  for await (let line of readLines(fileReader)) {
    coords.push(...mapToCoords(line, diagonals))
  }

  Deno.close(fileReader.rid);

  const counts: Record<string, number> = {}
  coords.forEach(coord => {
    counts[coord] = counts[coord] ? counts[coord] + 1 : 1
  })

  let numberOfDuplicates = 0

  Object.values(counts).forEach(count => {
    if (count > 1) { numberOfDuplicates += 1 }
  })

  return numberOfDuplicates
}


// console.log(await process('/Day5/input.txt'))
console.log(await process('/Day5/input.txt', true))


