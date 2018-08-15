import { times9, times81, setCharAt, xy2r } from './utils.mjs'
import { traverseCell } from './utils.mjs'

export class Board {
  constructor(anotherBoard) {
    if (anotherBoard !== undefined) {
      if (anotherBoard instanceof Board) {
        this.cells = anotherBoard.cells
      } else {
        this.setCellsStr(anotherBoard)
      }
    }
  }

  setCellsStr(val) {
    if (typeof val !== 'string') {
      throw new Error(`Expected string but got ${typeof val}: ${val}`)
    }
    if (/^[1-9\s]{81}$/.test(val) === false) {
      throw new Error(`Expected exactly 81 characters of 1-9 and spaces but got ${val.length}: "${val}"`)
    }

    const oldCells = this.cells
    this.cells = val

    if (!this.isValid()) {
      this.cells = oldCells
      throw new Error('There was an error')
    }
  }

  isValid() {
    const invalidCellExists = times81(r => {
      const currCellValue = this.getCell(r)
      if (currCellValue !== ' ') {
        return traverseCell(this, r, (cellValue) => {
          if (cellValue === currCellValue ) {
            return cellValue
          }
        })
      }
    })
    return !invalidCellExists
  }

  getCell2D(x, y) {
    return this.getCell(xy2r(x, y))
  }

  getCell(r) {
    return this.cells.charAt(r)
  }

  setCell2D(x, y, val) {
    this.setCell(xy2r(x, y), val)
  }

  setCell(r, val) {
    this.cells = setCharAt(this.cells, r, val)
  }

  getFirstEmptyCell(from = 0) {
    return this.cells.indexOf(' ', from)
  }

  get isSolved() {
    return this.getFirstEmptyCell() === -1
  }

  toString() {
    const ret = [];
    times9((y) => {
      if (y && !(y % 3)) {
        ret.push('------+-------+-------\n');
      }
      times9((x) => {
        if (x && !(x % 3)) {
          ret.push('| ');
        }
        ret.push(`${this.getCell(xy2r(x, y))} `);
      })
      ret.push('\n');
    })
    return ret.join('');
  }
}
