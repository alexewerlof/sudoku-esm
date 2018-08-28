import { times9, for81, xy2r, r2x, r2y, getPossibilities } from './utils.mjs'

function r2xy(r) {
  return [r2y(r), r2x(r)]
}

export default class Board {
  constructor(puzzle) {
    this.cells = []
    this.cellsStr = puzzle
    times9(() => {
      const row = []
      this.cells.push(row)
      times9(() => {
        row.push('H')
      })
    })
    if (puzzle) {
      for81(r => {
        const ch = puzzle.charAt(r)
        this.cells[r2y(r)][r2x(r)] = ch === ' ' ? 0 : Number(ch)
      })
    }
  }

  getCell(x, y) {
    return this.cells[y][x]
  }

  getPossibilities(x, y) {
    return getPossibilities(this.cellsStr, xy2r(x, y))
  }

  getStats() {
    const ret = {
      ' ': 0,
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
    }
    const { cellsStr } = this
    for81(n => {
      ret[cellsStr.charAt(n)]++
    })
    console.log({ret})
    return ret
  }
}