import { solve } from './lib/solver.mjs'
import { boardToString } from './lib/utils'

const hardBoard = 
  ' 7 4   92' +
  '    8   5' +
  '  3   7  ' +
  '       8 ' +
  '  7 1 5 4' +
  '   237   ' +
  '2 4  5  3' +
  '         ' +
  '8 5   1  '

console.log(`Starting with:\n${boardToString(hardBoard)}`)
console.time('computation');
const answerBoards = solve(hardBoard, 1);
console.timeEnd('computation')
console.log(`Found ${answerBoards.length} answers:`)
console.log(boardToString(answerBoards[0]))
console.log('Done!')
