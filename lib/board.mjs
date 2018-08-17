import { times9, setCharAt, xy2r } from './utils.mjs'

const defaultCells = ' '.repeat(81)

export class Board {
  constructor(cells) {
    this.cells = cells || defaultCells
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
        ret.push(`${this.getCell2D(x, y)} `);
      })
      ret.push('\n');
    })
    return ret.join('');
  }
}
