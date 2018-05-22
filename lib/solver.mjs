import { DiffBoard, boardToString } from "./board";
import {
  forRow,
  forCol,
  forEveryCell,
  forHouse,
  forRange,
  forRange2D,
  times
} from "./traverse.mjs";

function findFirstEmptyCell(board) {
  return forEveryCell(board, (val, x, y) => (val === 0 ? [x, y] : null));
}

function isAllFull(board) {
  return !!findFirstEmptyCell(board);
}

function rowFail(board, y) {
  const checker = new Set();
  return forRow(board, y, val => {
    if (val !== 0) {
      if (checker.has(val)) {
        return `Row ${y} has at least two ${val}s`;
      }
      checker.add(val);
    }
    return false;
  });
}

function rowsFail(board) {
  return times(9, y => rowFail(board, y));
}

function colFail(board, x) {
  const checker = new Set();
  return forCol(board, x, val => {
    if (val !== 0) {
      if (checker.has(val)) {
        return `Column ${x} has at least two ${val}s`;
      } else {
        checker.add(val);
      }
    }
  });
}

function colsFail(board) {
  return times(9, x => colFail(board, x));
}

function houseFail(board, xLeft, yTop) {
  const checker = new Set();
  return forHouse(board, xLeft, yTop, val => {
    if (val !== 0) {
      if (checker.has(val)) {
        return `The house at left=${xLeft}, top=${yTop} has at least two ${val}s`;
      } else {
        checker.add(val);
      }
    }
  });
}

function housesFail(board) {
  return forRange2D(0, 9, 3, 0, 9, 3, (x, y) => houseFail(board, x, y));
}

export function solve(board) {
  const fail = rowsFail(board) || colsFail(board) || housesFail(board);
  if (fail) {
    // console.log(fail);
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
    console.log(boardToString(board));
  }
}
