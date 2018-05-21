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

export function forRange2D(x1, x2, xDelta, y1, y2, yDelta, fn) {
  return forRange(y1, y2, yDelta, y => forRange(x1, x2, xDelta, x => fn(x, y)));
}

export function forEveryCell(board, fn) {
  return forRange2D(0, 9, 1, 0, 9, 1, (x, y) => fn(board.getCell(x, y), x, y));
}

export function forHouse(board, xLeft, yTop, fn) {
  return forRange2D(xLeft, xLeft + 3, 1, yTop, yTop + 3, 1, (x, y) =>
    fn(board.getCell(x, y), x, y)
  );
}
