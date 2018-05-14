import Board from './lib/Board'

const b = new Board;
b.setCells(
  '956      ',
  ' 3   826 ',
  ' 8  463 7',
  '6  28    ',
  '5  7  48 ',
  '2        ',
  '  5 7  4 ',
  '8 1  372 ',
  '729   6  '
);
b.print();
b.solve();
