import { Board } from './board.mjs'

function getGuesses(board) {
  const allEmptyCells = board.findAllEmptyCells1D()
  const guesses = []
  for (let i = 0; i < allEmptyCells.length; i++) {
    const r = allEmptyCells[i]
    const possibilities = board.getPossibilities1D(r)
    if (possibilities.length === 0) {
      // At least one empty cell has no possibilities so the board doesn't worth exploring
      return []
    }
    if (possibilities.length === 1) {
      // One cell with a single possiblity is detected so just use that one
      return [{ r, possibilities }]
    }
    guesses.push({ r, possibilities })
  }

  // sort the guesses so the ones with less possibilities end up last so they'll be at the end of unsolvedBoards
  return guesses.sort((a, b) => b.possibilities.length - a.possibilities.length)
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

    const guesses = getGuesses(board)

    // Make new boards for every possibility
    guesses.forEach(guess => {
        guess.possibilities.forEach(possibility => {
          const newBoard = new Board(board)
          newBoard.setCell1D(guess.r, possibility)
          unsolvedBoards.push(newBoard)
        })
    })
  }
  return answers;
}
