export default class Cell {

    constructor(init = 0) {
      this.value = init;
    }

    set value(v) {
      if (typeof v === 'number') {
        if (v < 0 || v > 9) {
          throw `Value out of range: ${v}`;
        } else {
          this._value = v;
        }
      } else if (typeof v === 'string') {
        this._value = this._fromString(v);
      } else {
        throw `Invalid type for setting a cell value: ${typeof v}. ${v}`;
      }
    }

    get value() {
      return this._value;
    }

    _fromString(ch) {
      switch (ch) {
        case ' ': return 0;
        case '1': return 1;
        case '2': return 2;
        case '3': return 3;
        case '4': return 4;
        case '5': return 5;
        case '6': return 6;
        case '7': return 7;
        case '8': return 8;
        case '9': return 9;
        default: throw `Invalid character "${ch}"`;
      }
    }

    toString() {
      return this.value ? String(this.value) : '_';
    }
  }
