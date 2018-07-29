import { rowsFail, colsFail, housesFail } from './rules.mjs'

function normalizeCell(val) {
  let n = val;
  if (typeof val !== 'number') {
    n = Number(val) || 0;
  }
  return n < 1 || n > 9 ? 0 : n;
}

export class Board {
  constructor(origin) {
    if (typeof origin === 'string') {
      this.fill(origin)
    } else {
      this.cells = [].concat(origin.cells)
    }
  }

  xy2r(x, y) {
    return x * 9 + y
  }

  r2xy(r) {
    const x = Math.floor(r / 9)
    const y = r % 9
    return [x, y]
  }

  getCell(x, y) {
    return this.cells[this.xy2r(x, y)]
  }

  setCell(x, y, val) {
    this.cells[this.xy2r(x, y)] = val
  }

  fill(rows) {
    if (rows.length !== 81) {
      throw `Expecting exactly 81 chars found ${rows.length} in ${rows}`;
    }
    this.cells = Array.from(rows, ch => normalizeCell(ch))

    const fail = rowsFail(this) || colsFail(this) || housesFail(this);
    if (fail) {
      console.error(fail);
      return fail;
    }
  }

  findFirstEmptyCell() {
    const r = this.cells.findIndex(val => val === 0)
    return r !== -1 ? this.r2xy(r) : undefined
  }

  toString(board) {
    const ret = [];
    for (let y = 0; y < 9; y++) {
      if (y !== 0 && !(y % 3)) {
        ret.push('- - - + - - - + - - - \n');
      }
      for (let x = 0; x < 9; x++) {
        if (x !== 0 && !(x % 3)) {
          ret.push('| ');
        }
        ret.push(`${board.getCell(x, y)} `);
      }
      ret.push('\n');
    }
    return ret.join('');
  }
}
