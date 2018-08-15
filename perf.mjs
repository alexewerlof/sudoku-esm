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

const iterations = 3
for (let i = 1; i <= iterations; i++) {
  console.time(`iteration ${i}`)
  solve(b, 100000)
  console.timeEnd(`iteration ${i}`)
}