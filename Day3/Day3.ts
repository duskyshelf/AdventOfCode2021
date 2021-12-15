import { readLines } from 'https://deno.land/std@0.117.0/io/mod.ts'
import * as path from 'https://deno.land/std@0.117.0/path/mod.ts'

interface BitCounter {
  '0': number
  '1': number
}

export const process = async (fileName: string) => {
  const filename = path.join(Deno.cwd(), fileName);
  let fileReader = await Deno.open(filename);

  const verticleBits: BitCounter[] = []

  for await (let line of readLines(fileReader)) {
    const bits = line.split('') as ('0' | '1')[];

    bits.forEach((bit, index) => {
      if (!verticleBits[index]) {
        verticleBits[index] = { '0': 0, '1': 0 }
      }
      verticleBits[index][bit] = verticleBits[index][bit] + 1;
    })
  }

  Deno.close(fileReader.rid);

  let gamma = '';
  let epsilon = '';

  verticleBits.forEach((count) => {
    if (count['0'] > count['1']) {
      gamma += '0'
      epsilon += '1'
    } else {
      gamma += '1'
      epsilon += '0'
    }
  })

  return parseInt(gamma, 2) * parseInt(epsilon, 2)
}

const splitByIndex = (array: string[], index: number) => {
  const zeros: string[] = []
  const ones: string[] = []

  array.forEach((string) => {
    const bits = string.split('');

    if (bits[index] === '0') { zeros.push(string) }
    if (bits[index] === '1') { ones.push(string) }
  })

  return { zeros, ones }
}

export const process2 = async (fileName: string) => {
  const filename = path.join(Deno.cwd(), fileName);
  let fileReader = await Deno.open(filename);

  const zeros: string[] = []
  const ones: string[] = []

  for await (let line of readLines(fileReader)) {
    if (line[0] === '0') { zeros.push(line) }
    if (line[0] === '1') { ones.push(line) }
  }

  Deno.close(fileReader.rid);

  let lineLength = zeros[0].length;
  let biggerFilter: string[];
  let smallerFilter: string[];

  if (zeros.length > ones.length) {
    biggerFilter = zeros;
    smallerFilter = ones;
  } else {
    biggerFilter = ones;
    smallerFilter = zeros;
  }

  for (let index = 1; index < lineLength; index++) {
    if (biggerFilter.length === 1) break;

    const bigSplit = splitByIndex(biggerFilter, index)

    if (bigSplit.ones.length >= bigSplit.zeros.length) {
      biggerFilter = bigSplit.ones
    }

    if (bigSplit.ones.length < bigSplit.zeros.length) {
      biggerFilter = bigSplit.zeros
    }
  }

  for (let index = 1; index < lineLength; index++) {
    if (smallerFilter.length === 1) break;

    const smallSplit = splitByIndex(smallerFilter, index)

    if (smallSplit.ones.length >= smallSplit.zeros.length) {
      smallerFilter = smallSplit.zeros
    }

    if (smallSplit.ones.length < smallSplit.zeros.length) {
      smallerFilter = smallSplit.ones
    }
  }


  return parseInt(biggerFilter[0], 2) * parseInt(smallerFilter[0], 2)

}

// console.log(await process('/Day3/input.txt'))
console.log(await process2('/Day3/input.txt'))


