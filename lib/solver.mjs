import { DiffBoard, boardToString } from "./board.mjs";
import {
  rowsFail,
  colsFail,
  housesFail,
} from "./rules.mjs";
import { findFirstEmptyCell, forRange } from './traverse.mjs'

let failCounter = 0, winCounter = 0
export function solve(board) {
  const fail = rowsFail(board) || colsFail(board) || housesFail(board);
  if (fail) {
    // console.log(fail);
    failCounter++
    return fail;
  }
  const firstEmptyCellDim = findFirstEmptyCell(board);
  if (firstEmptyCellDim) {
    const [x, y] = firstEmptyCellDim;
    // console.log(`Found an empty cell at ${x},${y}`);
    forRange(1, 10, 1, val => {
      const newBoard = new DiffBoard(board, x, y, val);
      solve(newBoard);
    });
  } else {
    winCounter++
    console.log('Try', failCounter, 'Win', winCounter)
    console.log(boardToString(board));
  }
}
