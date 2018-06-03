/*
 * All these traverse functions are similar.
 * they get a board and a function.
 * they pass values to the function and
 * if the function returns something
 * truthy, it'll break the loop.
 */

export function forRow(board, y, fn) {
  return forRange(0, 9, 1, x => fn(board.getCell(x, y), x, y));
}

export function forCol(board, x, fn) {
  return forRange(0, 9, 1, y => fn(board.getCell(x, y), x, y));
}

export function forRange(start, stop, step, fn) {
  for (let i = start; i < stop; i += step) {
    const ret = fn(i);
    if (ret) {
      return ret;
    }
  }
  return false;
}

export function times(x, fn) {
  return forRange(0, x, 1, fn);
}

export function forRange2D(x1, x2, y1, y2, fn) {
  return forRange(y1, y2, 1, y => forRange(x1, x2, 1, x => fn(x, y)));
}

export function forEveryCell(board, fn) {
  return forRange2D(0, 9, 0, 9, (x, y) => fn(board.getCell(x, y), x, y));
}

export function forHouse(board, houseX, houseY, fn) {
  const x1 = houseX * 3
  const y1 = houseY * 3
  const x2 = x1 + 3
  const y2 = y1 + 3
  return forRange2D(x1, x2, y1, y2, (x, y) =>
    fn(board.getCell(x, y), x, y)
  );
}

export function findFirstEmptyCell(board) {
  return forEveryCell(board, (val, x, y) => (val === 0 ? [x, y] : null));
}

function isAllFull(board) {
  return !!findFirstEmptyCell(board);
}
