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

const iterations = 3
for (let i = 1; i <= iterations; i++) {
  console.time(`iteration ${i}`)
  solve(lotsSolution, 100000)
  console.timeEnd(`iteration ${i}`)
}