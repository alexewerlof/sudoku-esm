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
    // TODO: return this.vals.filter(Boolean)
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

export function r2xy(r) {
  return [r2x(r), r2y(r)]
}

function getImportantCells1D(r) {
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

function initImportantCells1D() {
  const importantCells = []
  times81(r => {
    importantCells[r] = getImportantCells1D(r)
  })
  return importantCells
}

export const importantCells1D = initImportantCells1D()

export function traverseCell1D(board, r, fn) {
  const ic = importantCells1D[r]
  const max = ic.length
  for (let i = 0; i < max; i++) {
    const result = fn(board.getCell1D(ic[i]))
    if (result !== undefined) {
      return result
    }
  }
}

export function getPossibilities1D(board, r) {
  const checker = new Checker
  traverseCell1D(board, r, cellValue => checker.eliminate(cellValue))
  return checker.getRemaining()
}
