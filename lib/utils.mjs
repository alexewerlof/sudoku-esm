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

  for (let t = 0; t < 9; t++) {
    // all cell indices for the current row and current column
    ret.add(xy2r(x, t)).add(xy2r(t, y))
  }

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
  if (typeof board !== 'string') {
    return `Expected string but got ${typeof board}: ${board}`
  }
  if (/^[1-9\s]{81}$/.test(board) === false) {
    return `Expected exactly 81 characters of 1-9 and spaces but have ${board.length}: "${board}"`
  }

  const ret = board.split('').map(ch => ch === ' ' ? 0 : Number(ch))
  const violation = ruleViolation(ret)
  if (violation) {
    throw new Error(violation)
  }
  return ret
}

const _importantCellsCache = initImportantCells()

function initImportantCells() {
  const ret = new Array(81)
  for (let r = 0; r < ret.length; r++) {
    ret[r] = getImportantCells(r)
  }
  return ret
}

function ruleViolation(board) {
  for (let r = 0; r < board.length; r++ ) {
    const currCellValue = board[r]
    if (currCellValue) {
      const duplicateCell = _importantCellsCache[r]
        .find(importantCellIndex => board[importantCellIndex] === currCellValue )
      if (duplicateCell) {
        return `Duplication detected at position ${r} (${r2x(r)}, ${r2y(r)}): ${currCellValue}`
      }
    }
  }
  return false
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
    vals.length = 0
    return vals
  }
  return vals.filter(v => v !== 0)
}

function getStats(board) {
  const stats = new Array(10)
  stats.fill(0)
  for (let i = 0; i < board.length; i++) {
    const val = board[i]
    stats[val]++
  }
  return stats
}

function getGuessQuality(freq, { possibilities }) {
  let sum = 0
  for (let i = 0; i < possibilities.length; i++ ) {
    const currentfreq = freq[possibilities[i]]
    sum += currentfreq
  }
  // The best quality guess is the one that has the least common numbers and has the biggest number of different possibilities
  return possibilities.length - sum
}

function getBestGuess(freq, guesses) {
  let bestGuess = guesses[0]
  let bestGuessQuality = getGuessQuality(freq, bestGuess)
  for (let i = 1; i < guesses.length; i++) {
    const currentGuess = guesses[i]
    const currentGuessQuality = getGuessQuality(freq, currentGuess)
    if (currentGuessQuality > bestGuessQuality) {
      bestGuess = currentGuess
      bestGuessQuality = currentGuessQuality
    }
  }
  return bestGuess
}


function getBestGuessWithSortedPossibilities(board, guesses) {
  const freq = getStats(board)
  let bestGuess = getBestGuess(freq, guesses)
  bestGuess.possibilities.sort((a, b) => freq[b] - freq[a])
  return bestGuess
}

export function getGuess(board) {
  const guesses = []
  for (let r = board.indexOf(0); r !== -1; r = board.indexOf(0, r + 1)) {
    const possibilities = getPossibilities(board, r)
    const guess = { r, possibilities }
    if (possibilities.length <= 1) {
      return guess
    }
    guesses.push(guess)
  }

  // There was no empty cell
  if (guesses.length === 0) {
    return null
  }

  // At this time we have at least one guess but in practice it's always more
  // Here all the guesses have at least two possibilities
  return getBestGuessWithSortedPossibilities(board, guesses)
}

export function boardToString(board) {
  const ret = [];
  for (let y = 0; y < 9; y++) {
    if (y && !(y % 3)) {
      ret.push('------+-------+-------\n');
    }
    for (let x = 0; x < 9; x++) {
      if (x && !(x % 3)) {
        ret.push('| ');
      }
      ret.push(`${board[xy2r(x, y)] || ' '} `);
    }
    ret.push('\n');
  }
  return ret.join('');
}

export function boardArrayToString(boardArr) {
  return boardArr.map(i => i || ' ').join('')
}
