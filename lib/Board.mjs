function normalizeCell(val) {
  let n = val;
  if (typeof val !== "number") {
    n = Number(val);
  }
  return n < 1 || n > 9 ? 0 : n;
}

export function boardToString(board) {
  var ret = "";
  for (let y = 0; y < 9; y++) {
    if (y !== 0 && !(y % 3)) {
      ret += "- - - + - - - + - - - \n";
    }
    for (let x = 0; x < 9; x++) {
      if (x !== 0 && !(x % 3)) {
        ret += "| ";
      }
      ret += board.getCell(x, y) + " ";
    }
    ret += "\n";
  }
  return ret;
}

export function fillBoard(board, ...rowsArr) {
  const rows = rowsArr.join("");
  if (rows.length !== 81) {
    throw `Expecting exactly 81 chars found ${rows.length}`;
  }
  for (let r = 0; r < 81; r++) {
    const x = r % 9;
    const y = Math.floor(r / 9);
    const val = rows.charAt(r);
    board.setCell(x, y, val);
  }
}

export class Board {
  constructor() {
    this._cells = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ];
  }

  getCell(x, y) {
    return this._cells[x][y];
  }

  setCell(x, y, val) {
    this._cells[x][y] = normalizeCell(val);
  }
}

export class DiffBoard {
  constructor(parent, x, y, val) {
    this._parent = parent;
    this._x = x;
    this._y = y;
    this._val = val;
  }

  getCell(x, y) {
    return x === this._x && y === this._y
      ? this._val
      : this._parent.getCell(x, y);
  }

  setCell(x, y, val) {
    if (x === this._x && y === this._y) {
      this._val = normalizeCell(val);
    } else {
      this._parent.setCell(x, y, normalizeCell(val));
    }
  }
}
