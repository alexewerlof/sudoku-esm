import { memoizedGetGuesses, getFirstEmptyCell, boardError, memoizedSetCharAt } from './utils'

export function solve(input, maxAnswers = 2) {
  if (maxAnswers <= 0) {
    throw new RangeError(`maxAnswers should be a positive number but got ${maxAnswers}`)
  }
  const err = boardError(input)
  if (err) {
    throw new Error(`Invalid input ${input}: ${err}`)
  }
  const unsolvedBoards = [ input ]
  const answers = [];
  while (unsolvedBoards.length > 0 && answers.length < maxAnswers) {
    const board = unsolvedBoards.pop()

    if (getFirstEmptyCell(board) === -1) {
      answers.push(board)
      continue
    }

    const guesses = memoizedGetGuesses(board)

    if (guesses) {
      // Make new boards for every possibility
      for ( let i = guesses.possibilities.length - 1; i >= 0; i-- ) {
        const possibility = guesses.possibilities[i]
        unsolvedBoards.push(memoizedSetCharAt(board, guesses.r, possibility))
      }
    }
  }
  return answers;
}
