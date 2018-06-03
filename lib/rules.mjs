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

export function rowsFail(board) {
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

export function colsFail(board) {
  return times(9, x => colFail(board, x));
}

function houseFail(board, houseX, houseY) {
  const checker = new Set();
  return forHouse(board, houseX, houseY, val => {
    if (val !== 0) {
      if (checker.has(val)) {
        return `The house ${houseX}, ${houseY} has at least two ${val}s`;
      } else {
        checker.add(val);
      }
    }
  });
}

function getCellHouse(x, y) {
  const houseX = Math.floor(x / 3)
  const houseY = Math.floor(y / 3)
  return [ houseX, houseY ]
}

export function housesFail(board) {
  return forRange2D(0, 3, 0, 3, (x, y) => houseFail(board, x, y));
}
