import { times9 } from './utils.mjs'

function rowFail(board, y) {
  const checker = new Set();
  return times9(x => {
    const val = board.getCell(x, y)
    if (val !== ' ') {
      if (checker.has(val)) {
        throw new Error(`Row ${y} has at least two ${val}s`);
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
  return times9(y => {
    const val = board.getCell(x, y)
    if (val !== ' ') {
      if (checker.has(val)) {
        throw new Error(`Column ${x} has at least two ${val}s`);
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
  for (let x = houseX; x < houseX + 3; x++ ) {
    for (let y = houseY; y < houseY + 3; y++ ) {
      const val = board.getCell(x, y)
      if (val !== ' ') {
        if (checker.has(val)) {
          throw new Error(`The house ${houseX}, ${houseY} has at least two ${val}s`)
        }
        checker.add(val)
      }
    }
  }
}

export function housesFail(board) {
  for (let x = 0; x < 9; x += 3) {
    for (let y = 0; y < 9; y += 3) {
      houseFail(board, x, y)
    }
  }
}
