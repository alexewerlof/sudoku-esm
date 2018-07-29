import { Board } from './lib/board.mjs';
import { solve } from './lib/solver.mjs';

const noSolution = '516849732' +
'3 76 5   ' +
'8 97   65' +
'135 6 9 7' +
'472591  6' +
'96837  5 ' +
'253186 74' +
'6842 75  ' +
'791 5 6 8'

const oneSolution =  '95612 3 8' +
'123578469' +
'478369125' +
'214635897' +
'         ' +
'3        ' +
'531287946' +
'847916532' +
'692453781'

const twoSolution =  '95612 3 8' +
'123578469' +
'478369125' +
'214635897' +
'         ' +
'         ' +
'531287946' +
'847916532' +
'692453781'

const sixSolution =  '95612 3 8' +
'123578469' +
'478369125' +
'214635897' +
'         ' +
'         ' +
'531   946' +
'847916532' +
'692453781'

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

console.log('Starting with:')
console.log(b.toString())
console.time('computation');
const answerBoards = solve(b, 3);
console.timeEnd('computation')
console.log(`Found ${answerBoards.length} answers:`)
answerBoards.forEach(answerBoard => console.log(`${answerBoard}`))
console.log('Done!')
