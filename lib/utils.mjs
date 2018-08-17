/**
 * Loops a function n times passing the current loop number to it
 * if the function returns something (other that undefined) it breaks
 * the loop and returns that value
 */
export function times(n, fn) {
  for (let i = 0; i < n; i++) {
    const result = fn(i)
    if (result !== undefined) {
      return result
    }
  }
}

export const times9 = fn => times(9, fn)
export const times81 = fn => times(81, fn)

class Checker {
  constructor() {
    this.vals = new Array(10)
    this.reset()
  }

  reset() {
    this.vals.fill(true, 1)
    this.remaining = 9
  }

  getRemaining() {
    const { vals } = this
    const ret = []
    for (let i = 1; i <= 9; i++ ) {
      if (vals[i]) {
        ret.push(i)
      }
    }
    return ret
  }

  eliminate(n) {
    const { vals } = this
    if (vals[n]) {
      vals[n] = false
      this.remaining--
    }
    // returns true if there is nothing remaining
    if (this.remaining === 0) {
      return true
    }
  }
}

export function setCharAt(str, index, newChar) {
  const before = str.substring(0, index)
  const after = str.substring(index + 1)
  return before + newChar + after
}

export function xy2r(x, y) {
  return x + y * 9
}

export function r2x(r) {
  return r % 9
}

export function r2y(r) {
  return Math.floor(r / 9)
}

function getImportantCells(r) {
  const x = r2x(r)
  const y = r2y(r)
  let ret = new Set;

  times9(t => {
    ret.add(xy2r(x, t))
    ret.add(xy2r(t, y))
  })

  const x1 = Math.floor(x / 3) * 3;
  const y1 = Math.floor(y / 3) * 3;
  const x2 = x1 + 3;
  const y2 = y1 + 3;
  for (let xx = x1; xx < x2; xx++) {
    for (let yy = y1; yy < y2; yy++) {
      ret.add(xy2r(xx, yy))
    }
  }
  // Remove the current cell from the list
  ret.delete(xy2r(x, y))
  return [...ret];
}

export function boardError(board) {
  if (typeof board.cells !== 'string') {
    return `Expected string but got ${typeof board.cells}: ${board.cells}`
  }
  if (/^[1-9\s]{81}$/.test(board.cells) === false) {
    return `Expected exactly 81 characters of 1-9 and spaces but have ${board.cells.length}: "${board.cells}"`
  }
  const duplicateCell = times81(r => {
    const currCellValue = board.getCell(r)
    if (currCellValue !== ' ') {
      return traverseCell(board, r, (cellValue) => {
        if (cellValue === currCellValue ) {
          return cellValue
        }
      })
    }
  })
  if (duplicateCell) {
    return `A cell with value ${duplicateCell} is duplicated in a row, column or house`
  }
}

function initImportantCells() {
  const importantCells = []
  times81(r => {
    importantCells[r] = getImportantCells(r)
  })
  return importantCells
}

export const importantCells = initImportantCells()

export function traverseCell(board, r, fn) {
  const ic = importantCells[r]
  return times(ic.length, i => fn(board.getCell(ic[i])))
}

export function getPossibilities(board, r) {
  const checker = new Checker
  traverseCell(board, r, cellValue => checker.eliminate(cellValue))
  return checker.getRemaining()
}
