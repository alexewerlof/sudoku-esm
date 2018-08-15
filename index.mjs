import { Board } from './lib/board.mjs';
import { solve } from './lib/solver.mjs'

const sixSolution =  '95612 3 8' +
'123578469' +
'478369125' +
'214635897' +
'         ' +
'         ' +
'531   946' +
'847916532' +
'692453781'

const b = new Board(
  sixSolution
);

console.log(`Starting with:\n${b}`)
console.time('computation');
const answerBoards = solve(b, 3);
console.timeEnd('computation')
console.log(`Found ${answerBoards.length} answers:`)
answerBoards.forEach(answerBoard => console.log(`${answerBoard}Valid: ${answerBoard.isValid()}\n`))
console.log('Done!')
