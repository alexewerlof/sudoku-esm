import { Board } from './board.mjs'

function allEmptyCellsWithPossibilities(board) {
  const allEmptyCells = board.findAllEmptyCells1D()
  const ret = new Array(allEmptyCells.length)
  for (let i = 0; i < allEmptyCells.length; i++) {
    const r = allEmptyCells[i]
    const possibilities = board.getPossibilities1D(r)
    if (possibilities.length === 0) {
      return
    }
    ret[i] = ({ r, possibilities })
  }
  return ret
}

function fillInSimpleOnes(board) {
  let isBoardChanged
  do {
    isBoardChanged = false
    
    const guesses = allEmptyCellsWithPossibilities(board)

    if (!guesses) {
      return
    }
    
    guesses.forEach(p => {
        if (p.possibilities.length === 1) {
          board.setCell1D(p.r, p.possibilities[0])
          isBoardChanged = true
        }
      })
  } while(isBoardChanged)
  return true
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

    if (!fillInSimpleOnes(board)) {
      continue
    }

    if (board.isSolved) {
      answers.push(board)
    }

    const guesses = allEmptyCellsWithPossibilities(board)

    const sortedGuesses = guesses
      .sort((a, b) => b.possibilities.length - a.possibilities.length)

    sortedGuesses.forEach(sortedGuess => {
      sortedGuess.possibilities.forEach(possibility => {
        const newBoard = new Board(board)
        newBoard.setCell(sortedGuess.x, sortedGuess.y, possibility)
        unsolvedBoards.push(newBoard)
      })
    })
  }
  return answers;
}
