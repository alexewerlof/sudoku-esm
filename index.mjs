import { Board, boardToString } from './lib/board.mjs';
import { solve } from './lib/solver.mjs';

const b = new Board();
b.fill(
  '956      ',
  '        5',
  // ' 8  463 7',
  // '6  28   1',
  '         ',
  '         ',
  '5  7  48 ',
  '2        ',
  '  5 7  4 ',
  '     372 ',
  '      6  ',
);

console.log(boardToString(b));
solve(b);
