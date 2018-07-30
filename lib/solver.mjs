import { Board } from './board.mjs'
import { Checker } from './checker.mjs'

function getPossibilities(board, x, y) {
  const checker = new Checker()
  for (let t = 0; t < 9; t++) {
    if (checker.eliminate(board.getCell(x, t))) {
      return
    }
    if (checker.eliminate(board.getCell(t, y))) {
      return
    }
  }
  const x1 = Math.floor(x / 3) * 3;
  const y1 = Math.floor(y / 3) * 3;
  const x2 = x1 + 3;
  const y2 = y1 + 3;
  for (let xx = x1; xx < x2; xx++) {
    for (let yy = y1; yy < y2; yy++) {
      if (checker.eliminate(board.getCell(xx, yy))) {
        return
      }
    }
  }
  return checker.getRemaining();
}

export function solve(initBoard, maxAnswers = 3) {
  if (maxAnswers <= 0) {
    throw new RangeError(`maxAnswers should be a positive number but got ${maxAnswers}`)
  }
  const answers = [];
  const unsolvedBoards = [ initBoard ]
  while (unsolvedBoards.length && answers.length < maxAnswers) {
    const board = unsolvedBoards.pop()
    const firstEmptyCellDim = board.findFirstEmptyCell();
    if (firstEmptyCellDim) {
      const [x, y] = firstEmptyCellDim;
      // console.log(`Found an empty cell at ${x},${y}`);
      const possibilities = getPossibilities(board, x, y)
      if (possibilities) {
        for (let i = 0; i < possibilities.length; i++) {
          const newBoard = new Board(board)
          newBoard.setCell(x, y, possibilities[i]);
          unsolvedBoards.push(newBoard);
        }
      }
    } else {
      answers.push(board)
    }
  }
  return answers;
}
