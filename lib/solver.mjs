import { DiffBoard, boardToString } from './board.mjs';
import { findFirstEmptyCell } from './traverse.mjs';
import {
  boardFail,
  diffBoardFail,
  possibilities,
} from './rules.mjs';

let failCounter = 0;
let winCounter = 0;

function solveDiffBoard(diffBoard) {
  const fail = diffBoardFail(diffBoard);
  if (fail) {
    failCounter++;
    return fail;
  }
  const firstEmptyCellDim = findFirstEmptyCell(diffBoard);
  if (firstEmptyCellDim) {
    const [x, y] = firstEmptyCellDim;
    // console.log(`Found an empty cell at ${x},${y}`);
    possibilities(diffBoard, x, y).forEach((val) => {
      const newBoard = new DiffBoard(diffBoard, x, y, val);
      solveDiffBoard(newBoard);
    });
  } else {
    winCounter++;
    console.log('Try', failCounter, 'Win', winCounter);
    console.log(boardToString(diffBoard));
  }
}

export function solve(board) {
  const fail = boardFail(board);
  if (fail) {
    failCounter++;
    console.log(fail);
    return fail;
  }
  const firstEmptyCellDim = findFirstEmptyCell(board);
  if (firstEmptyCellDim) {
    const [x, y] = firstEmptyCellDim;
    // console.log(`Found an empty cell at ${x},${y}`);
    possibilities(board, x, y).forEach((val) => {
      const newBoard = new DiffBoard(board, x, y, val);
      solveDiffBoard(newBoard);
    });
  } else {
    winCounter++;
    console.log('Try', failCounter, 'Win', winCounter);
    console.log(boardToString(board));
  }
}
