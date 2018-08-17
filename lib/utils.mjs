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
export const timesArr = (arr, fn) => times(arr.length, i => fn(arr[i]))

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
  if (typeof board !== 'string') {
    return `Expected string but got ${typeof board}: ${board}`
  }
  if (/^[1-9\s]{81}$/.test(board) === false) {
    return `Expected exactly 81 characters of 1-9 and spaces but have ${board.length}: "${board}"`
  }
  const duplicateCell = times81(r => {
    const currCellValue = board.charAt(r)
    if (currCellValue !== ' ') {
      return timesArr(importantCells[r], (cellIndex) => {
        if (board.charAt(cellIndex) === currCellValue ) {
          return currCellValue
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

export function traverseCell(r, fn) {
  return timesArr(importantCells[r], fn)
}

export function getPossibilities(board, r) {
  const vals = [ true, true, true, true, true, true, true, true, true, true ]
  let remaining = 9
  const arr = importantCells[r]
  const n = arr.length
  const ret = []
  for (let i = 0; i < n; i++) {
    const cellValue = board.charAt(arr[i])
    if (vals[cellValue] === true) {
      vals[cellValue] = false
      remaining--
    }
    // returns true if there is nothing remaining
    if (remaining === 0) {
      return ret
    }
  }
  for (let i = 1; i <= 9; i++ ) {
    if (vals[i] === true) {
      ret.push(i)
    }
  }
  return ret
}

export function boardToString(board) {
  const ret = [];
  times9((y) => {
    if (y && !(y % 3)) {
      ret.push('------+-------+-------\n');
    }
    times9((x) => {
      if (x && !(x % 3)) {
        ret.push('| ');
      }
      ret.push(`${board.charAt(xy2r(x, y))} `);
    })
    ret.push('\n');
  })
  return ret.join('');
}
