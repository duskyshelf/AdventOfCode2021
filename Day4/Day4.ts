import { readLines } from 'https://deno.land/std@0.117.0/io/mod.ts'
import * as path from 'https://deno.land/std@0.117.0/path/mod.ts'

export const processInputs = async (fileName: string) => {
  const filename = path.join(Deno.cwd(), fileName);
  let fileReader = await Deno.open(filename);

  let lineCount = 0;

  let inputs: string[] = [];
  let boardCount = -1;
  const boards: string[][][] = [];

  for await (let line of readLines(fileReader)) {
    if (lineCount === 0) {
      inputs = line.split(',');
      lineCount++
    }

    if (line.length > 0) {
      const numbers = line.trim().split(/\s+/);
      if (!boards[boardCount]) { boards[boardCount] = [] }

      boards[boardCount].push(numbers)
    }

    if (line.length === 0) {
      boardCount++
    }
  }

  Deno.close(fileReader.rid);

  return { inputs, boards }
}

export const markBoard = (scoreBoard: number[][]) => {
  const xScores: number[] = [0, 0, 0, 0, 0]
  const yScores: number[] = [0, 0, 0, 0, 0]

  scoreBoard.forEach(tuple => {
    xScores[tuple[0]] += 1
    yScores[tuple[1]] += 1
  })

  if (xScores.some(score => score === 5) || yScores.some(score => score === 5)) return true
  return false
}

const calculateSum = (board: string[][]) => {
  let sum = 0

  board.forEach(row => {
    row.forEach(value => {
      if (value) { sum += parseInt(value, 10) }

    })
  })

  if (isNaN(sum)) { console.log('isNan', board) }

  return sum
}

const getWinner = (inputs: string[], boards: string[][][]) => {
  const scoreBoards: number[][][] = boards.map(board => []);

  let winner: string[][] | undefined = undefined;
  let finalInput = 0;

  for (const input of inputs) {
    if (winner) { break }
    boards.forEach((board, index) => {
      board.forEach((row, yIndex) => {
        row.forEach((value, xIndex) => {
          if (value === input) {
            scoreBoards[index].push([xIndex, yIndex])
            board[yIndex][xIndex] = '';
          }
        })
      })

      const complete = markBoard(scoreBoards[index])
      if (complete) {
        winner = board
        finalInput = parseInt(input, 10);
        return;
      }
    })
  }

  return { winner, finalInput }
}
const getLoser = (inputs: string[], boards: string[][][]) => {
  const scoreBoards: number[][][] = boards.map(board => []);

  let loserFilter: string[][][] = [...boards]
  let loser: string[][] | undefined = undefined
  let finalInput = 0;

  for (const input of inputs) {
    if (finalInput) { break }
    boards.forEach((board, index) => {
      board.forEach((row, yIndex) => {
        row.forEach((value, xIndex) => {
          if (value === input) {
            scoreBoards[index].push([xIndex, yIndex])
            board[yIndex][xIndex] = '';
          }
        })
      })

      const complete = markBoard(scoreBoards[index])

      if (complete) {
        if (loserFilter.filter(loserBoard => loserBoard.length).length === 1) {
          loser = loserFilter.find(loserBoard => loserBoard.length)
        }
        loserFilter.splice(index, 1, [])
      }
    })

    const allComplete = scoreBoards.every((scoreBoard) => markBoard(scoreBoard))

    if (allComplete) {
      finalInput = parseInt(input, 10);
    }
  }

  return { loser, finalInput }
}

export const process = async (fileName: string) => {
  const { inputs, boards } = await processInputs(fileName);

  const { winner, finalInput } = getWinner(inputs, boards)

  if (!winner) { console.log('error winner not found'); return; }

  return (calculateSum(winner) * finalInput)
}

export const process2 = async (fileName: string) => {
  const { inputs, boards } = await processInputs(fileName);

  const { loser, finalInput } = getLoser(inputs, boards)

  if (!loser) { console.log('error loser not found'); return; }

  return (calculateSum(loser) * finalInput)
}


// console.log(await process('/Day4/input.txt'))
console.log(await process2('/Day4/input.txt'))


