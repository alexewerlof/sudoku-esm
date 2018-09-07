import { getGuess, boardError, boardToArray, boardArrayToString } from './utils'

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
    const board = unsolvedBoards[unsolvedBoards.length - 1]

    const guess = getGuess(board)

    if (guess && guess.possibilities) {
      const { r, possibilities } = guess
      board[r] = possibilities[0]
      for (let i = 1; i < possibilities.length; i++) {
        // Clone the array
        const newBoard = board.slice()
        newBoard[r] = possibilities[i]
        unsolvedBoards.push(newBoard)
      }
    } else {
      unsolvedBoards.pop()
      if (guess === null) {
        answers.push(boardArrayToString(board))
      }
    }
  }
  return answers;
}
