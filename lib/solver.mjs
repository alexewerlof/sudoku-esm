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
    const board = unsolvedBoards[unsolvedBoards.length - 1]

    const guess = getGuess(board)

    /*
    if (guess) {
      if (guess.possibilities.length === 1) {
        console.log('---')
      } else {
        console.log(guess.possibilities.length)
      }
    } else {
      console.log('-')
    }
    */

    if (!guess || !guess.possibilities) {
      unsolvedBoards.pop()
      if (guess === null) {
        answers.push(boardArrayToString(board))
      }
      continue
    }

    let firstLoop = true
    const { r, possibilities } = guess
    possibilities.forEach(possibility => {
      if (firstLoop) {
        board[r] = possibility
        firstLoop = false
      } else {
        // Clone the array
        const newBoard = board.slice()
        newBoard[r] = possibility
        unsolvedBoards.push(newBoard)
      }
    })
  }
  return answers;
}
