import { rowsFail, colsFail, housesFail } from './rules.mjs'

function setCharAt(str, index, newChar) {
  const before = str.substring(0, index)
  const after = str.substring(index + 1)
  return before + newChar + after
}

function xy2r(x, y) {
  return x + y * 9
}

function r2xy(r) {
  const x = r % 9
  const y = Math.floor(r / 9)
  return [x, y]
}

export class Board {
  constructor(rows) {
    if (rows instanceof Board) {
      this.cells = rows.cells
      return
    }
    if (typeof rows !== 'string') {
      throw `Expected string but got ${typeof rows}: ${rows}`
    }
    if (/^[1-9\s]{81}$/.test(rows) === false) {
      throw `Expected exactly 81 characters of 1-9 and spaces but got ${rows}`
    }

    this.cells = rows

    const fail = rowsFail(this) || colsFail(this) || housesFail(this);
    if (fail) {
      throw fail
    }
  }

  getCell(x, y) {
    return this.cells.charAt(xy2r(x, y))
  }

  setCell(x, y, val) {
    const r = xy2r(x, y)
    this.cells = setCharAt(this.cells, r, val)
  }

  findFirstEmptyCell() {
    const r = this.cells.indexOf(' ')
    return r !== -1 ? r2xy(r) : undefined
  }

  toString() {
    const ret = [];
    for (let y = 0; y < 9; y++) {
      if (y !== 0 && !(y % 3)) {
        ret.push('- - - + - - - + - - - \n');
      }
      for (let x = 0; x < 9; x++) {
        if (x !== 0 && !(x % 3)) {
          ret.push('| ');
        }
        ret.push(`${this.getCell(x, y)} `);
      }
      ret.push('\n');
    }
    return ret.join('');
  }
}
