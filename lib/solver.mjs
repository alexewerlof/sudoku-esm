import { Board } from './board.mjs'
import { getPossibilities, boardError } from './utils'

function getGuesses(board) {
  const guesses = []
  for (let r = board.getFirstEmptyCell(); r !== -1; r = board.getFirstEmptyCell(r + 1)) {
    const possibilities = getPossibilities(board, r)
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

export function solve(input, maxAnswers = 2) {
  if (maxAnswers <= 0) {
    throw new RangeError(`maxAnswers should be a positive number but got ${maxAnswers}`)
  }
  const answers = [];
  const inputBoard = input instanceof Board ? input : new Board(input)
  const err = boardError(inputBoard)
  if (err) {
    throw new Error(`Invalid input ${input}: ${err}`)
  }
  const unsolvedBoards = [ inputBoard ]
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
          const newBoard = new Board(board.cells)
          newBoard.setCell(guess.r, possibility)
          unsolvedBoards.push(newBoard)
        })
    })
  }
  return answers;
}
