import {
  forRow,
  forCol,
  forHouse,
  forRange2D,
  times9,
  forHouseXY,
} from './traverse.mjs';

function rowFail(board, y) {
  const checker = new Set();
  return forRow(board, y, (val) => {
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
  return times9((y) => rowFail(board, y));
}

function colFail(board, x) {
  const checker = new Set();
  return forCol(board, x, (val) => {
    if (val !== 0) {
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
    if (val !== 0) {
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

export function boardFail(board) {
  return rowsFail(board) || colsFail(board) || housesFail(board);
}

const ALL_DIGITS = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export function possibilities(board, x, y) {
  const ret = new Set(ALL_DIGITS);
  times9((t) => {
    const colVal = board.getCell(x, t);
    const rowVal = board.getCell(t, y);
    if (colVal) {
      ret.delete(colVal);
    }
    if (ret.size > 0 && rowVal) {
      ret.delete(rowVal);
    }
    if (ret.size <= 0) {
      return true;
    }
  });
  if (ret.size > 0) {
    forHouseXY(board, x, y, (val) => {
      if (val) {
        ret.delete(val);
      }
      if (ret.size <= 0) {
        return true;
      }
    });
  }
  return ret;
}
