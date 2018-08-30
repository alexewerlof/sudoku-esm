import { getGuess, boardIsComplete, boardError, boardToArray, boardArrayToString } from './utils'

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

    if (boardIsComplete(board)) {
      answers.push(boardArrayToString(board))
      continue
    }

    const guess = getGuess(board)

    if (guess) {
      guess.possibilities.forEach(possibility => {
        // Clone the array
        const newBoard = board.slice()
        newBoard[guess.r] = possibility
        unsolvedBoards.push(newBoard)
      })
    }
  }
  return answers;
}
