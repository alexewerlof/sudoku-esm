import { getGuess, getFirstEmptyCell, boardError, boardToArray, boardArrayToString } from './utils'

export function solve(input, maxAnswers = 2) {
  if (maxAnswers <= 0) {
    throw new RangeError(`maxAnswers should be a positive number but got ${maxAnswers}`)
  }
  const err = boardError(input)
  if (err) {
    throw new Error(`Invalid input ${input}: ${err}`)
  }
  const unsolvedBoards = [ boardToArray(input) ]
  const answers = [];
  while (unsolvedBoards.length > 0 && answers.length < maxAnswers) {
    const board = unsolvedBoards.pop()

    if (getFirstEmptyCell(board) === -1) {
      answers.push(boardArrayToString(board))
      continue
    }

    const guess = getGuess(board)

    if (guess !== undefined) {
      // Make new boards for every possibility
      const { possibilities } = guess
      for ( let i = possibilities.length - 1; i >= 0; i-- ) {
        const possibility = possibilities[i]
        const newBoard = board.slice()
        newBoard[guess.r] = possibility
        unsolvedBoards.push(newBoard)
      }
    }
  }
  return answers;
}
