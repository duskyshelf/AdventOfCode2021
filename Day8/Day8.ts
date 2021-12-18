import { readLines } from "https://deno.land/std@0.117.0/io/mod.ts";
import * as path from "https://deno.land/std@0.117.0/path/mod.ts";

export const process = async (fileName: string) => {
  const filename = path.join(Deno.cwd(), fileName);
  let fileReader = await Deno.open(filename);

  let allOutputs: string[] = [];

  for await (let line of readLines(fileReader)) {
    const output = line.split(' | ')[1].split(' ')

    allOutputs.push(...output)
  }

  Deno.close(fileReader.rid)

  const acceptedOutputLengths = [2, 3, 4, 7]
  return allOutputs.filter(out => acceptedOutputLengths.some(length => length === out.length)).length
}

const intersectsWith = (mapNum: string, value: string) => {
  const valueSplit = value.split('')
  return mapNum.split('').every(char => valueSplit.includes(char))
}

export const calculateLine = (line: string) => {
  const [left, right] = line.split(' | ');

  const input = left.split(' ').map(string => string.split('').sort().join(''))
  const output = right.split(' ').map(string => string.split('').sort().join(''))

  const allValues = new Set([...input, ...output])

  let map: string[] = ['', '', '', '', '', '', '', '', '', '']

  Array.from(allValues).forEach(value => {
    if (value.length === 2) { map[1] = value }
    if (value.length === 4) { map[4] = value }
    if (value.length === 3) { map[7] = value }
    if (value.length === 7) { map[8] = value }
  })

  Array.from(allValues).forEach(value => {
    const mapped = map.indexOf(value) !== -1;
    if (!mapped) {
      if (value.length === 5) {
        if (intersectsWith(map[1], value)) {
          map[3] = value
        }
      }
      if (value.length === 6) {
        if (intersectsWith(map[4], value)) {
          map[9] = value
        }
        else if (!intersectsWith(map[1], value)) {
          map[6] = value
        } else {
          map[0] = value
        }
      }
    }
  })

  Array.from(allValues).forEach(value => {
    const mapped = map.indexOf(value) !== -1;
    if (!mapped) {
      if (value.length === 5) {
        if (intersectsWith(value, map[6])) {
          map[5] = value
        } else {
          map[2] = value
        }
      }
    }
  })

  return parseInt(output.map(num => map.findIndex(mappedNum => mappedNum === num)).join(''), 10)
}

export const process2 = async (fileName: string) => {
  const filename = path.join(Deno.cwd(), fileName);
  let fileReader = await Deno.open(filename);

  let total = 0

  for await (let line of readLines(fileReader)) {
    total += calculateLine(line)
  }

  Deno.close(fileReader.rid)

  return total
}


// console.log(await process('/Day8/input.txt'))
console.log(await process2('/Day8/input.txt'))
