import {
  forRow,
  forCol,
  forHouse,
  forRange2D,
  times9,
} from './traverse.mjs';
import { Checker } from './checker.mjs'

function rowFail(board, y) {
  const checker = new Set();
  return forRow(board, y, (val) => {
    if (val !== ' ') {
      if (checker.has(val)) {
        return `Row ${y} has at least two ${val}s`;
      }
      checker.add(val);
    }
    return false;
  });
}

export function rowsFail(board) {
  return times9((y) => rowFail(board, y));
}

function colFail(board, x) {
  const checker = new Set();
  return forCol(board, x, (val) => {
    if (val !== ' ') {
      if (checker.has(val)) {
        return `Column ${x} has at least two ${val}s`;
      }
      checker.add(val);
    }
  });
}

export function colsFail(board) {
  return times9((x) => colFail(board, x));
}

function houseFail(board, houseX, houseY) {
  const checker = new Set();
  return forHouse(board, houseX, houseY, (val) => {
    if (val !== ' ') {
      if (checker.has(val)) {
        return `The house ${houseX}, ${houseY} has at least two ${val}s`;
      }
      checker.add(val);
    }
  });
}

export function housesFail(board) {
  return forRange2D(0, 3, 0, 3, (x, y) => houseFail(board, x, y));
}

const EMPTY_ARRAY = [];

export function possibilities(board, x, y) {
  const checker = new Checker()
  for (let t = 0; t < 9; t++) {
    if (checker.eliminate(board.getCell(x, t))) {
      return EMPTY_ARRAY
    }
    if (checker.eliminate(board.getCell(t, y))) {
      return EMPTY_ARRAY
    }
  }
  const x1 = Math.floor(x / 3) * 3;
  const y1 = Math.floor(y / 3) * 3;
  const x2 = x1 + 3;
  const y2 = y1 + 3;
  for (let xx = x1; xx < x2; xx++) {
    for (let yy = y1; yy < y2; yy++) {
      if (checker.eliminate(board.getCell(xx, yy))) {
        return EMPTY_ARRAY
      }
    }
  }
  return checker.getRemaining();
}
