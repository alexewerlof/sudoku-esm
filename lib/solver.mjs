import { DiffBoard, boardToString } from "./board.mjs";
import {
  boardFail,
  diffBoardFail,
} from "./rules.mjs";
import { findFirstEmptyCell, forRange } from './traverse.mjs'

function solveDiffBoard(diffBoard) {
  const fail = diffBoardFail(diffBoard);
  if (fail) {
    failCounter++
    return fail;
  }
  const firstEmptyCellDim = findFirstEmptyCell(diffBoard);
  if (firstEmptyCellDim) {
    const [x, y] = firstEmptyCellDim;
    // console.log(`Found an empty cell at ${x},${y}`);
    forRange(1, 10, val => {
      const newBoard = new DiffBoard(diffBoard, x, y, val);
      solveDiffBoard(newBoard);
    });
  } else {
    winCounter++
    console.log('Try', failCounter, 'Win', winCounter)
    console.log(boardToString(diffBoard));
  }
}

let failCounter = 0, winCounter = 0
export function solve(board) {
  const fail = boardFail(board);
  if (fail) {
    failCounter++
    console.log(fail);
    return fail;
  }
  const firstEmptyCellDim = findFirstEmptyCell(board);
  if (firstEmptyCellDim) {
    const [x, y] = firstEmptyCellDim;
    // console.log(`Found an empty cell at ${x},${y}`);
    forRange(1, 10, val => {
      const newBoard = new DiffBoard(board, x, y, val);
      solveDiffBoard(newBoard);
    });
  } else {
    winCounter++
    console.log('Try', failCounter, 'Win', winCounter)
    console.log(boardToString(board));
  }
}
