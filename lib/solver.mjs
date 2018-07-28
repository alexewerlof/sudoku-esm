import { DiffBoard, boardToString } from './board.mjs';
import {
  possibilities,
} from './rules.mjs';

let winCounter = 0;

function solveDiffBoard(diffBoard) {
  const firstEmptyCellDim = diffBoard.findFirstEmptyCell();
  if (firstEmptyCellDim) {
    const [x, y] = firstEmptyCellDim;
    // console.log(`Found an empty cell at ${x},${y}`);
    return possibilities(diffBoard, x, y).forEach((val) => {
      const newBoard = new DiffBoard(diffBoard, x, y, val);
      solveDiffBoard(newBoard);
    });
  }
  winCounter++;
  console.log(`Board #${winCounter}`);
  console.log(boardToString(diffBoard));
}

export function solve(board) {
  const firstEmptyCellDim = board.findFirstEmptyCell();
  if (firstEmptyCellDim) {
    const [x, y] = firstEmptyCellDim;
    // console.log(`Found an empty cell at ${x},${y}`);
    return possibilities(board, x, y).forEach((val) => {
      const newBoard = new DiffBoard(board, x, y, val);
      solveDiffBoard(newBoard);
    });
  }
  winCounter++;
  console.log(`Board #${winCounter}`);
  console.log(boardToString(board));
}
