import { readLines } from "https://deno.land/std@0.117.0/io/mod.ts";
import * as path from "https://deno.land/std@0.117.0/path/mod.ts";

const scoreMap = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
}

type OpenChar = '(' | '[' | '{' | '<'
type CloseChar = ')' | ']' | '}' | '>'
const closers: CloseChar[] = [')', ']', '}', '>']
const openers: Record<CloseChar, OpenChar> = {
  ')': '(',
  ']': '[',
  '}': '{',
  '>': '<',
}

export const scoreLine = (line: string): number => {
  const list = line.split('') as (CloseChar & OpenChar)[]

  let removableIndex = 0;
  let errorChar: CloseChar | '' = ''

  for (var [index, char] of list.entries()) {
    if (closers.some(closer => closer === char)) {
      if (index === 0) { errorChar = char }
      if (list[index - 1] !== openers[char]) {
        errorChar = char
      }

      removableIndex = index;

      break
    }
  }

  if (errorChar) { return scoreMap[errorChar] }

  const newList = [...list]
  newList.splice(removableIndex - 1, 2)

  if (!newList.length) {
    return 0
  }

  return scoreLine(newList.join(''))
}

export const process = async (fileName: string) => {
  const filename = path.join(Deno.cwd(), fileName);
  let fileReader = await Deno.open(filename);

  let scores = 0;

  for await (let line of readLines(fileReader)) {
    scores += scoreLine(line)
  }

  Deno.close(fileReader.rid)

  return scores;
}

export const getRemainingOpeners = (line: string): OpenChar[] => {
  const list = line.split('') as (CloseChar & OpenChar)[]

  let removableIndex = 0;
  let errorChar: CloseChar | '' = ''

  for (var [index, char] of list.entries()) {
    if (closers.some(closer => closer === char)) {
      if (index === 0) { errorChar = char }
      if (list[index - 1] !== openers[char]) {
        errorChar = char
      }

      removableIndex = index;

      break
    }
  }

  if (errorChar) { return [] }
  if (removableIndex === 0) {
    return list
  }

  const newList = [...list]
  newList.splice(removableIndex - 1, 2)

  if (!newList.length) {
    return []
  }

  return getRemainingOpeners(newList.join(''))
}

const closingScore = {
  '(': 1,
  '[': 2,
  '{': 3,
  '<': 4,
}

const scoreOpeners = (openers: OpenChar[]) => {
  return openers.reverse().map(openChar => closingScore[openChar]).reduce((acc, curr) => {
    return (acc * 5) + curr
  }, 0)
}

export const process2 = async (fileName: string) => {
  const filename = path.join(Deno.cwd(), fileName);
  let fileReader = await Deno.open(filename);

  let validScores: number[] = [];

  for await (let line of readLines(fileReader)) {
    const openers = getRemainingOpeners(line)
    if (openers.length) {
      validScores.push(scoreOpeners(openers))
    }
  }

  Deno.close(fileReader.rid)

  return validScores.sort((a, b) => b - a)[(validScores.length - 1) / 2]
}

// console.log(await process('/Day10/input.txt'))
// console.log(await process2('/Day10/input.txt'))
