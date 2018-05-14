export default class Checker {

    constructor() {
      this.reset();
    }

    reset() {
      this.values = [];
    }

    has(value) {
      return this.values.indexOf(value) !== -1;
    }

    add(cell) {
      return this.addVal(cell.value);
    }

    addVal(val) {
      if (this.has(val)) {
        return false;
      }
      if (val !== 0) {
        this.values.push(val);
      }
      return true;
    }

    hasAllDigits() {
      return this.has(1) && this.has(2) && this.has(3) &&
             this.has(4) && this.has(5) && this.has(6) &&
             this.has(7) && this.has(8) && this.has(9);
    }

    whatIsMissing() {
      var ret = [];
      if (!this.has(1)) ret.push(1);
      if (!this.has(2)) ret.push(2);
      if (!this.has(3)) ret.push(3);
      if (!this.has(4)) ret.push(4);
      if (!this.has(5)) ret.push(5);
      if (!this.has(6)) ret.push(6);
      if (!this.has(7)) ret.push(7);
      if (!this.has(8)) ret.push(8);
      if (!this.has(9)) ret.push(9);
      return ret;
    }
  }
