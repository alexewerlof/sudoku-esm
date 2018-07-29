import { Board } from './board.mjs';
import {
  getPossibilities,
} from './rules.mjs';

function solveBoard(board, maxAnswers = 3, answers = []) {
  if (answers.length >= maxAnswers) {
    return
  }
  const firstEmptyCellDim = board.findFirstEmptyCell();
  if (firstEmptyCellDim) {
    const [x, y] = firstEmptyCellDim;
    // console.log(`Found an empty cell at ${x},${y}`);
    const possibilities = getPossibilities(board, x, y)
    if (possibilities) {
      possibilities.forEach((val) => {
        const newBoard = new Board(board)
        newBoard.setCell(x, y, val);
        solveBoard(newBoard, maxAnswers, answers);
      });
    }
  } else {
    answers.push(board)
  }
}

export function solve(board, maxAnswers = 1) {
  if (maxAnswers <= 0) {
    throw new RangeError(`maxAnswers should be a positive number but got ${maxAnswers}`)
  }
  if (!board.findFirstEmptyCell()) {
    throw new Error(`The board is already solved!`)
  }
  const answers = []
  solveBoard(board, maxAnswers, answers)
  return answers
}
