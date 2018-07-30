import { Board } from './board.mjs';
import {
  getPossibilities,
} from './rules.mjs';

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
