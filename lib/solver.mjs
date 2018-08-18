import { memoizedGetPossibilities, boardError, memoizedSetCharAt } from './utils'

function getGuesses(board) {
  const guesses = []
  for (let r = board.indexOf(' '); r !== -1; r = board.indexOf(' ', r + 1)) {
    const possibilities = memoizedGetPossibilities(board, r)
    switch (possibilities.length) {
      case 0:
        // At least one empty cell has no possibilities so the board doesn't worth exploring
        return []
      case 1:
        // One cell with a single possiblity is detected so just use that one
        return [{ r, possibilities }]
      default:
        guesses.push({ r, possibilities })
    }
  }

  // sort the guesses so the ones with less possibilities end up last so they'll be at the end of unsolvedBoards
  return guesses.sort((a, b) => b.possibilities.length - a.possibilities.length)
}

const memoizedGetGuessesDic = {}
function memoizedGetGuesses(board) {
  const key = board
  const val = memoizedGetGuessesDic[key]
  if (val) {
    return val
  }
  return memoizedGetGuessesDic[key] = getGuesses(board)
}

export function solve(input, maxAnswers = 2) {
  if (maxAnswers <= 0) {
    throw new RangeError(`maxAnswers should be a positive number but got ${maxAnswers}`)
  }
  const answers = [];
  const err = boardError(input)
  if (err) {
    throw new Error(`Invalid input ${input}: ${err}`)
  }
  const unsolvedBoards = [ input ]
  while (unsolvedBoards.length > 0 && answers.length < maxAnswers) {
    const board = unsolvedBoards.pop()

    if (board.indexOf(' ') === -1) {
      answers.push(board)
      continue
    }

    const guesses = memoizedGetGuesses(board)

    // Make new boards for every possibility
    for (let i = 0; i < guesses.length; i++) {
      const guess = guesses[i]
      const { possibilities } = guess
      for (let j = 0; j < possibilities.length; j++) {
        const possibility = possibilities[j]
        unsolvedBoards.push(memoizedSetCharAt(board, guess.r, possibility))
      }
    }
  }
  return answers;
}
