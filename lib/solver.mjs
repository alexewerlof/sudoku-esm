import { Board } from './board.mjs'

function allEmptyCellsWithPossibilities(board) {
  const allEmptyCells = board.findAllEmptyCells1D()
  const guesses = []
  for (let i = 0; i < allEmptyCells.length; i++) {
    const r = allEmptyCells[i]
    const possibilities = board.getPossibilities1D(r)
    if (possibilities.length === 0) {
      return
    }
    if (possibilities.length === 1) {
      return { r, possibility: possibilities[0] }
    }
    guesses.push({ r, possibilities })
  }
  return guesses
}

export function solve(input, maxAnswers = 2) {
  if (maxAnswers <= 0) {
    throw new RangeError(`maxAnswers should be a positive number but got ${maxAnswers}`)
  }
  const answers = [];
  const unsolvedBoards = [ new Board(input) ]
  while (unsolvedBoards.length > 0 && answers.length < maxAnswers) {
    const board = unsolvedBoards.pop()

    if (board.isSolved) {
      answers.push(board)
      continue
    }

    const guesses = allEmptyCellsWithPossibilities(board)

    if (guesses === undefined) {
      // At least one empty cell has no possibilities
      continue
    }

    if (!Array.isArray(guesses)) {
      // One cell with a single possiblity is detected
      const newBoard = new Board(board)
      newBoard.setCell1D(guesses.r, guesses.possibility)
      unsolvedBoards.push(newBoard)
      continue
    }

    // sort the guesses so the ones with less possibilities end up last so they'll be at the end of unsolvedBoards
    const sortedGuesses = guesses.sort((a, b) => b.possibilities.length - a.possibilities.length)
    // Make new boards for every possibility
    sortedGuesses.forEach(sortedGuess => {
        sortedGuess.possibilities.forEach(possibility => {
          const newBoard = new Board(board)
          newBoard.setCell1D(sortedGuess.r, possibility)
          unsolvedBoards.push(newBoard)
        })
    })
  }
  return answers;
}
