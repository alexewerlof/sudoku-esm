import chalk from 'chalk';

function normalizeCell(val) {
  let n = val;
  if (typeof val !== "number") {
    n = Number(val);
  }
  return n < 1 || n > 9 ? 0 : n;
}

function colorDigit(digit) {
  switch (digit) {
    case 1: return chalk.green(digit);
    case 2: return chalk.yellow(digit);
    case 3: return chalk.cyan(digit);
    case 4: return chalk.white(digit);
    case 5: return chalk.redBright(digit);
    case 6: return chalk.yellowBright(digit);
    case 7: return chalk.blueBright(digit);
    case 8: return chalk.magentaBright(digit);
    case 9: return chalk.cyanBright(digit);
    default: return chalk.red(digit);
  }
}

export function boardToString(board) {
  var ret = "";
  for (let y = 0; y < 9; y++) {
    if (y !== 0 && !(y % 3)) {
      ret += chalk.blue("- - - + - - - + - - - \n");
    }
    for (let x = 0; x < 9; x++) {
      if (x !== 0 && !(x % 3)) {
        ret += chalk.blue("| ");
      }
      ret += colorDigit(board.getCell(x, y)) + " ";
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
