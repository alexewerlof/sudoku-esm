import { rowsFail, colsFail, housesFail } from './rules.mjs'
import { times9, setCharAt, xy2r, r2xy } from './utils.mjs'
import { Checker } from './checker.mjs'
import { traverseCell, traverseCell1D } from './utils.mjs'

export class Board {
  constructor(anotherBoard) {
    if (anotherBoard) {
      if (anotherBoard instanceof Board) {
        this.cells = anotherBoard.cells
      } else {
        this.fill(anotherBoard)
      }
    }
  }

  fill(rows) {
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
    return this.getCell1D(xy2r(x, y))
  }

  getCell1D(r) {
    return this.cells.charAt(r)
  }

  setCell(x, y, val) {
    const r = xy2r(x, y)
    this.cells = setCharAt(this.cells, r, val)
  }

  setCell1D(r, val) {
    this.cells = setCharAt(this.cells, r, val)
  }

  findFirstEmptyCell() {
    const r = this.cells.indexOf(' ')
    return r !== -1 ? r2xy(r) : undefined
  }

  findFirstEmptyCell1D() {
    const r = this.cells.indexOf(' ')
    return r !== -1 ? r : undefined
  }

  findAllEmptyCells() {
    const allEmptyCells = []
    const { cells } = this
    for (let r = cells.indexOf(' '); r !== -1; r = cells.indexOf(' ', r + 1)) {
      allEmptyCells.push(r2xy(r))
    }

    return allEmptyCells
  }

  findAllEmptyCells1D() {
    const allEmptyCells = []
    const { cells } = this
    for (let r = cells.indexOf(' '); r !== -1; r = cells.indexOf(' ', r + 1)) {
      allEmptyCells.push(r)
    }

    return allEmptyCells
  }

  getPossibilities(x, y) {
    const checker = new Checker
    traverseCell(this, x, y, cellValue => checker.eliminate(cellValue))
    return checker.getRemaining()
  }

  getPossibilities1D(r) {
    const checker = new Checker
    traverseCell1D(this, r, cellValue => checker.eliminate(cellValue))
    return checker.getRemaining()
  }

  get isSolved() {
    return this.cells.indexOf(' ') === -1
  }

  toString() {
    const ret = [];
    times9((y) => {
      if (y !== 0 && !(y % 3)) {
        ret.push('- - - + - - - + - - - \n');
      }
      times9((x) => {
        if (x !== 0 && !(x % 3)) {
          ret.push('| ');
        }
        ret.push(`${this.getCell(x, y)} `);
      })
      ret.push('\n');
    })
    return ret.join('');
  }
}
