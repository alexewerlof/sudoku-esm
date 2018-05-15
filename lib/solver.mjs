import { DiffBoard, boardToString } from './board'

function findFirstEmptyCell(board) {
  return forEveryCell(board, (val, x, y) => (val === 0 ? [x, y] : undefined));
}

function isAllFull(board) {
  return !!findFirstEmptyCell(board);
}

function _checkRow(board, y) {
  const checker = new Set();
  for (let x = 0; x < 9; x++) {
    const val = board.getCell(x, y);
    if (val === 0) {
      continue
    }

    if (checker.has(val)) {
      return false;
    } else {
      checker.add(val);
    }
  }
  return true;
}

function checkRows(board) {
  for (let y = 0; y < 9; y++) {
    if (!_checkRow(board, y)) {
      return false;
    }
  }
  return true;
}

function _checkColumn(board, x) {
  const checker = new Set();
  for (let y = 0; y < 9; y++) {
    const val = board.getCell(x, y);
    if (val === 0) {
      continue
    }

    if (checker.has(val)) {
      return false;
    } else {
      checker.add(val);
    }
  }
  return true
}

function checkColumns(board) {
  for (let x = 0; x < 9; x++) {
    if (!_checkColumn(board, x)) {
      return false;
    }
  }
  return true;
}

function _checkHouse(board, x, y) {
  const checker = new Set();
  for (var xx = 0; xx < 3; xx++) {
    for (var yy = 0; yy < 3; yy++) {
      const val = board.getCell(x + xx, y + yy);
      if (val === 0) {
        continue
      }
      if (checker.has(val)) {
        return false;
      } else {
        checker.add(val);
      }
    }
  }
  return true;
}

function checkHouses(board) {
  for (let x = 0; x < 9; x += 3) {
    for (let y = 0; y < 9; y += 3) {
      if (_checkHouse(board, x, y) === false) {
        // console.warn(`The house at ${x}, ${y} is faulty`);
        return false;
      }
    }
  }
  return true;
}

function check(board) {
  return checkRows(board) && checkColumns(board) && checkHouses(board);
}

function forEveryCell(board, fn) {
  for (let x = 0; x < 9; x++) {
    for (let y = 0; y < 9; y++) {
      const ret = fn(board.getCell(x, y), x, y);
      if (ret) {
        return ret;
      }
    }
  }
}

export function solve(board) {
  if (!check(board)) {
    // console.log("Rules do not check. No future here.");
    return;
  }
  const firstEmptyCellDim = findFirstEmptyCell(board);
  if (firstEmptyCellDim) {
    const [x, y] = firstEmptyCellDim;
    // console.log(`Found an empty cell at ${x},${y}`);
    for (let i = 1; i <= 9; i++) {
      const newBoard = new DiffBoard(board, x, y, i);
      solve(newBoard);
    }
  } else {
    console.log(boardToString(board));
  }
}
