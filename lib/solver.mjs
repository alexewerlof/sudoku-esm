import { Board } from './board.mjs';
import {
  possibilities,
} from './rules.mjs';

let winCounter = 0;

export function solve(board) {
  const firstEmptyCellDim = board.findFirstEmptyCell();
  if (firstEmptyCellDim) {
    const [x, y] = firstEmptyCellDim;
    // console.log(`Found an empty cell at ${x},${y}`);
    const possib = possibilities(board, x, y)
    if (possib) {
      possib.forEach((val) => {
        const newBoard = new Board(board)
        newBoard.setCell(x, y, val);
        solve(newBoard);
      });
    }
  } else {
    winCounter++;
    console.log(`Board #${winCounter}`);
    console.log(board.toString(board));
  }
}
