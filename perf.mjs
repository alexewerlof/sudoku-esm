import { Board } from './lib/board.mjs'
import { solve } from './lib/solver.mjs'

const lotsSolution =  '95612 3 8' +
'1   78469' +
'         ' +
'         ' +
'         ' +
'         ' +
'         ' +
'8479    2' +
'69       '

const b = new Board(
  lotsSolution
);

console.time('computation');
solve(b, 100000);
console.timeEnd('computation')
