export function times9(fn) {
  for (let i = 0; i < 9; i++) {
    fn(i);
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

export function r2xy(r) {
  const x = r % 9
  const y = Math.floor(r / 9)
  return [x, y]
}

function uniq(arr) {
  const set = new Set(arr)
  return [...set]
}

function getImportantCells1D(r) {
  const [x, y] = r2xy(r)
  let ret = [];
  function addIfNotXY(a, b) {
    if (a !== x || b !== y) {
      ret.push(xy2r(a, b))
    }
  }
  times9(t => {
    addIfNotXY(x, t)
    addIfNotXY(t, y)
  })
  const x1 = Math.floor(x / 3) * 3;
  const y1 = Math.floor(y / 3) * 3;
  const x2 = x1 + 3;
  const y2 = y1 + 3;
  for (let xx = x1; xx < x2; xx++) {
    for (let yy = y1; yy < y2; yy++) {
      addIfNotXY(xx, yy)
    }
  }
  return uniq(ret);
}

function initImportantCells1D() {
  const importantCells = []
  times9(() => {
    importantCells.push(new Array(9))
  })
  times9(x => {
    times9(y => {
      const r = xy2r(x, y)
      importantCells[r] = getImportantCells1D(r)
    })
  })
  return importantCells
}

export const importantCells1D = initImportantCells1D()

export function traverseCell1D(board, r, fn) {
  const ic = importantCells1D[r]
  const max = ic.length
  const raw = board.cells
  for (let i = 0; i < max; i++) {
    const result = fn(raw.charAt(ic[i]))
    if (result) {
      return result
    }
  }
}
