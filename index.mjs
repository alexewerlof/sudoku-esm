import { Board, boardToString, fillBoard } from "./lib/board";
import { solve } from "./lib/solver";

const b = new Board();
fillBoard(b,
  "956      ",
  "437158269",
  " 8  463 7",
  "6  28    ",
  "5  7  48 ",
  "2        ",
  "  5 7  4 ",
  "8 1  372 ",
  "729   6  "
);

console.log(boardToString(b));
solve(b);
