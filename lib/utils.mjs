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

export function setCharAt(str, index, newChar) {
  const before = str.substring(0, index)
  const after = str.substring(index + 1)
  return before + newChar + after
}

export function memoize(fn) {
  const dic = {}
  switch(fn.length) {
    case 1:
      return function memoized1(key) {
        const val = dic[key]
        return val !== undefined ? val : dic[key] = fn(key)
      }
    case 2:
      return  function memoized2(a, b) {
        const key = `${a} ${b}`
        const val = dic[key]
        return val !== undefined ? val : dic[key] = fn(a, b)
      }
    case 3:
      return function memoized3(a, b, c) {
        const key = `${a} ${b} ${c}`
        const val = dic[key]
        return val !== undefined ? val : dic[key] = fn(a, b, c)
      }
    default:
      throw new Error(`Can only memoize a function with 1 to 3 parameters but ${fn.name} has ${fn.length}`)
    }
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

const memoizedGetImportantCells = memoize(getImportantCells)

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
      return memoizedGetImportantCells(r).find(cellIndex => board.charAt(cellIndex) === currCellValue )
    }
  })
  if (duplicateCell) {
    return `Duplication detected in a row, column or house`
  }
}

export function getPossibilities(board, r) {
  const vals = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
  let remaining = 9

  const nothingRemaining = memoizedGetImportantCells(r).some(r2 => {
    const cellValue = board.charAt(r2)
    if (cellValue !== ' ' && vals[cellValue] !== 0) {
      vals[cellValue] = 0
      remaining--
      // returns true if there is nothing remaining
      if (remaining === 0) {
        return true
      }
    }
  })
  if (nothingRemaining) {
    return
  }
  return vals.filter(Boolean)
}

function getStats(board) {
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
  times81(n => {
    ret[board.charAt(n)]++
  })
  return ret
}

function sortByWeight(arr, weight) {
  return arr.sort((a, b) => {
    return weight[b] - weight[a]
  })
}

function guessWeight(possibilities, weight) {
  if (possibilities.length === 0) {
    return 0
  }
  let sum = 0
  possibilities.forEach(p => sum += weight[p])
  return sum / (possibilities.length ** 2)
}

export const memoizedGetGuess = memoize(getGuess)
export const memoizedSetCharAt = memoize(setCharAt)

function getGuess(board) {
  const guesses = []
  const weight = getStats(board)
  for (let r = getFirstEmptyCell(board); r !== -1; r = getFirstEmptyCell(board, r + 1)) {
    const possibilities = getPossibilities(board, r)
    if (!possibilities) {
      // At least one empty cell has no possibilities so the board doesn't worth exploring
      return
    }
    if (possibilities.length === 1) {
      // One cell with a single possiblity is detected so just use that one
      return { r, possibilities }
    }
    guesses.push({ r, possibilities: sortByWeight(possibilities, weight) })
  }

  switch (guesses.length) {
  case 0:
    return
  case 1:
  return guesses[0]
  default:
    const sortedGuesses = guesses.sort((a, b) => guessWeight(b.possibilities, weight) - guessWeight(a.possibilities, weight))
    return sortedGuesses[0]
  }
}

export function getFirstEmptyCell(board, from = 0) {
  return board.indexOf(' ', from)
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
