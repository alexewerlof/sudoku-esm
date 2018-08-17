import { solve } from './lib/solver.mjs'
import { boardToString } from './lib/utils'

const sixSolution =  '95612 3 8' +
'123578469' +
'478369125' +
'214635897' +
'         ' +
'         ' +
'531   946' +
'847916532' +
'692453781'

console.log(`Starting with:\n${boardToString(sixSolution)}`)
console.time('computation');
const answerBoards = solve(sixSolution, 3);
console.timeEnd('computation')
console.log(`Found ${answerBoards.length} answers:`)
answerBoards.forEach(answerBoard => console.log(boardToString(answerBoard)))
console.log('Done!')
