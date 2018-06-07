/*
 * All these traverse functions are similar.
 * they get a board and a function.
 * they pass values to the function and
 * if the function returns something
 * truthy, it'll break the loop.
 */


export function forRange(start, stop, fn) {
  for (let i = start; i < stop; i++) {
    const ret = fn(i);
    if (ret) {
      return ret;
    }
  }
  return false;
}

export function times(x, fn) {
  return forRange(0, x, fn);
}

export function times9(fn) {
  return forRange(0, 9, fn);
}

export function forRow(board, y, fn) {
  return times9((x) => fn(board.getCell(x, y), x, y));
}

export function forCol(board, x, fn) {
  return times9((y) => fn(board.getCell(x, y), x, y));
}

export function forRange2D(x1, x2, y1, y2, fn) {
  return forRange(y1, y2, (y) => forRange(x1, x2, (x) => fn(x, y)));
}

export function forEveryCell(board, fn) {
  return forRange2D(0, 9, 0, 9, (x, y) => fn(board.getCell(x, y), x, y));
}

export function forHouse(board, houseX, houseY, fn) {
  const x1 = houseX * 3;
  const y1 = houseY * 3;
  const x2 = x1 + 3;
  const y2 = y1 + 3;
  return forRange2D(x1, x2, y1, y2, (x, y) => fn(board.getCell(x, y), x, y));
}

export function getHouseXY(x, y) {
  return {
    houseX: Math.floor(x / 3),
    houseY: Math.floor(y / 3),
  };
}

export function forHouseXY(board, x, y, fn) {
  const { houseX, houseY } = getHouseXY(x, y);
  return forHouse(board, houseX, houseY, fn);
}

export function findFirstEmptyCell(board) {
  return forEveryCell(board, (val, x, y) => (val === 0 ? [x, y] : null));
}
