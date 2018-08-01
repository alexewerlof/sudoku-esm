import { times9 } from './rules.mjs'

function getImportantCells(x, y) {
  let ret = [];
  function addIfNotXY(a, b) {
    if (a !== x || b !== y) {
      ret.push([a, b])
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
  return ret;
}

function initImportantCells() {
  const importantCells = []
  times9(() => {
    importantCells.push(new Array(9))
  })
  times9(x => {
    times9(y => {
      importantCells[x][y] = getImportantCells(x, y)
    })
  })
  return importantCells
}

export const importantCells = initImportantCells()

export function traverse(board, x, y, fn) {
  const ic = importantCells[x][y];
  for (let i = 0; i < ic.length; i++) {
    const [xx, yy] = ic[i]
    if (fn(board.getCell(xx, yy))) {
      break
    }
  }
}
