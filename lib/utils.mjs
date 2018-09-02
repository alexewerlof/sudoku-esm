export function loop(n, fn) {
  for (let i = 0; i < n; i++) {
    fn(i)
  }
}

/**
 * Loops a function n times passing the current loop number to it
 * if the function returns something (other that undefined) it breaks
 * the loop and returns that value
 */
export function loopRet(n, fn) {
  for (let i = 0; i < n; i++) {
    const result = fn(i)
    if (result !== undefined) {
      return result
    }
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

  loop(9, t => ret.add(xy2r(x, t)).add(xy2r(t, y)))

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

export function boardToArray(board) {
  const ret = new Array(81)
  loop(81, r => {
    const ch = board.charAt(r)
    ret[r] = ch === ' ' ? 0 : Number(ch)
  })
  return ret
}

const _importantCellsCache = initImportantCells()

function initImportantCells() {
  const ret = new Array(81)
  loop(81, r => ret[r] = getImportantCells(r))
  return ret
}

export function boardError(board) {
  if (typeof board !== 'string') {
    return `Expected string but got ${typeof board}: ${board}`
  }
  if (/^[1-9\s]{81}$/.test(board) === false) {
    return `Expected exactly 81 characters of 1-9 and spaces but have ${board.length}: "${board}"`
  }
  const duplicateCell = loopRet(81, r => {
    const currCellValue = board.charAt(r)
    if (currCellValue !== ' ') {
      return _importantCellsCache[r].find(cellIndex => board.charAt(cellIndex) === currCellValue )
    }
  })
  if (duplicateCell) {
    return `Duplication detected in a row, column or house`
  }
}

export function getPossibilities(board, r) {
  const vals = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ]
  let remaining = 9

  _importantCellsCache[r].some(r2 => {
    const cellValue = board[r2]
    if (cellValue && vals[cellValue]) {
      vals[cellValue] = 0
      remaining--
      // break the loop early if nothing is remaining
      return remaining === 0
    }
  })
  if (remaining === 0) {
    return null
  }
  return vals.filter(v => v !== 0)
}

function getStats(board) {
  const ret = new Array(10)
  ret.fill(0)
  loop(81, n => ret[board[n]]++)
  return ret
}

function getGuessQuality(weight, { possibilities }) {
  let ret = weight[possibilities[0]]
  for (let i = 1; i < possibilities.length; i++ ) {
    const p = weight[possibilities[i]]
    if (p > ret) {
      ret = p
    }
  }
  return ret
}

function getBestGuess(weight, guesses) {
  if (guesses.length === 1) {
    return guesses[0]
  }
  let bestGuess = guesses[0]
  let bestGuessQuality = getGuessQuality(weight, bestGuess)
  for (let i = 1; i < guesses.length; i++) {
    const currentGuess = guesses[i]
    const currentGuessQuality = getGuessQuality(weight, currentGuess)
    if (currentGuessQuality < bestGuessQuality) {
      bestGuess = currentGuess
      bestGuessQuality = currentGuessQuality
    }
  }
  return bestGuess
}

export function getGuess(board) {
  const guesses = []
  for (let r = board.indexOf(0); r !== -1; r = board.indexOf(0, r + 1)) {
    const possibilities = getPossibilities(board, r)
    // At least one empty cell has no possibilities so the board doesn't worth exploring
    if (!possibilities) {
      return null
    }
    // One cell with a single possiblity is detected so just use that one
    if (possibilities.length === 1) {
      return { r, possibilities }
    }
    guesses.push({ r, possibilities })
  }

  // All guesses have at least 2 possibilities by this point
  // Let's find the best one
  const weight = getStats(board)
  let bestGuess = getBestGuess(weight, guesses)
  bestGuess.possibilities.sort((a, b) => weight[a] - weight[b])
  return bestGuess
}

export function boardIsComplete(board) {
  return board.indexOf(0) === -1
}

export function boardToString(board) {
  const ret = [];
  loop(9, y => {
    if (y && !(y % 3)) {
      ret.push('------+-------+-------\n');
    }
    loop(9, x => {
      if (x && !(x % 3)) {
        ret.push('| ');
      }
      ret.push(`${board[xy2r(x, y)]} `);
    })
    ret.push('\n');
  })
  return ret.join('');
}

export function boardArrayToString(boardArr) {
  return boardArr.map(i => i || ' ').join('')
}
