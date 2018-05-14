import Cell from './Cell'
import Checker from './Checker'

export default class Board {

    constructor(anotherBoard) {
      if (anotherBoard) {
        this.cells = [[],[],[],[],[],[],[],[],[]];
        this.forEveryCell((cell, x, y) => this.cells[x][y] = anotherBoard.cells[x][y]);
      } else {
        this.cells = [];
        for (let y = 0; y < 9; y++) {
          let currentRow = [];
          for (let x = 0; x < 9; x++) {
            currentRow.push(new Cell);
          }
          this.cells.push(currentRow);
        }
      }
    }

    forEveryCell(fn) {
      for (let x = 0; x < 9; x++) {
        for (let y = 0;y < 9; y++) {
          if (fn(this.cells[x][y], x, y) === true) {
            return;
          }
        }
      }
    }

    findFirstEmptyCell() {
      var ret;
      this.forEveryCell((cell, x, y) => {
        if (cell.value === 0) {
          ret = [x, y];
          return true;
        }
      });
      return ret;
    }

    isAllFull() {
      return !!this.findFirstEmptyCell();
    }

    toString() {
      var ret = '';
      for (let y = 0; y < 9; y++) {
        if ( y !== 0 && !(y % 3)) {
            ret += '- - - + - - - + - - - \n'
        }
        for (let x = 0; x < 9; x++) {
            if (x !== 0 && !(x % 3)) {
                ret += '| '
            }
            ret += this.cells[x][y].toString() + ' ';
        }
        ret += '\n';
      }
      return ret;
    }

    print() {
      console.log(this.toString());
    }

    setCells(...rows) {
      if (rows.length !== 9) {
        throw 'Expecting exactly 9 rows';
      }
      for (let r = 0; r < 9; r++) {
        let row = rows[r];
        if (typeof row !== 'string') {
          throw `Invalid row type ${typeof row}`;
        }
        if (row.length !== 9) {
          throw `"${row}" row must have exactly 9 characters`;
        }
        for (let x = 0; x < 9; x++) {
          this.cells[x][r].value = row.charAt(x);
        }
      }
    }

    checkRows() {
      var checker = new Set;
      for (let y = 0; y < 9; y++) {
        for (let x = 0; x < 9; x++) {
          if (checker.add(this.cells[x][y]) === false) {
            // console.warn(`Row ${y} is not good`);
            return false;
          }
        }
        checker.clear();
      }
      return true;
    }

    checkColumns() {
      var checker = new Checker;
      for (let x = 0; x < 9; x++) {
        for (let y = 0; y < 9; y++) {
          if (checker.add(this.cells[x][y]) === false) {
            // console.warn(`Column ${x} is not good`);
            return false;
          }
        }
        checker.clear();
      }
      return true;
    }

    _checkHouse(x, y) {
      var checker = new Checker;
      for (var xx = 0; xx < 3; xx++) {
        for (var yy = 0; yy < 3; yy++) {
          if (checker.add(this.cells[x + xx][y + yy]) === false) {
            return false;
          }
        }
      }
      return true;
    }

    checkHouses() {
      for (let x = 0; x < 9; x+=3) {
        for (let y = 0; y < 9; y +=3) {
          if (this._checkHouse(x, y) === false) {
            // console.warn(`The house at ${x}, ${y} is faulty`);
            return false;
          }
        }
      }
      return true;
    }

    check() {
      return this.checkRows() && this.checkColumns() && this.checkHouses();
    }

    solve() {
      if (!this.check()) {
        // console.log('Rules do not check. No future here.');
        return;
      }
      var firstEmptyCellDim = this.findFirstEmptyCell();
      if (firstEmptyCellDim) {
        var [x, y] = firstEmptyCellDim;
        // console.log(`Found an empty cell at ${x},${y}`);
        for (let i = 1; i <=9; i++) {
          var newBoard = new Board(this);
          newBoard.cells[x][y] = new Cell(i);
          newBoard.solve();
        }
      } else {
        this.print();
      }
    }
  }
