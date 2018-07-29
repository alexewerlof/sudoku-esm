import { Board } from './lib/board.mjs';
import { solve } from './lib/solver.mjs';

const b = new Board(
  '956      ' +
  '        5' +
  // ' 8  463 7' +
  // '6  28   1' +
  '         ' +
  '         ' +
  '5  7  48 ' +
  '2        ' +
  '  5 7  4 ' +
  '     372 ' +
  '      6  '
);

console.log(b.toString(b));
solve(b);
