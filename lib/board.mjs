import { rowsFail, colsFail, housesFail } from './rules.mjs'
import { setCharAt, xy2r, r2xy } from './utils.mjs'

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
      throw `Expected exactly 81 characters of 1-9 and spaces but got ${rows.length}: "${rows}"`
    }

    this.cells = rows

    rowsFail(this) || colsFail(this) || housesFail(this);
  }

  getCell(x, y) {
    return this.getCellRaw(xy2r(x, y))
  }

  getCellRaw(r) {
    return this.cells.charAt(r)
  }

  setCell(x, y, val) {
    const r = xy2r(x, y)
    this.cells = setCharAt(this.cells, r, val)
  }

  findFirstEmptyCell() {
    const r = this.cells.indexOf(' ')
    return r !== -1 ? r2xy(r) : undefined
  }

  findAllEmptyCell() {
    const allEmptyCells = []
    const { cells } = this
    for (let r = cells.indexOf(' '); r !== -1; r = cells.indexOf(' ', r + 1)) {
      allEmptyCells.push(r2xy(r))
    }

    return allEmptyCells
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
