export class Checker {
  constructor() {
    this.vals = {
      '1': true,
      '2': true,
      '3': true,
      '4': true,
      '5': true,
      '6': true,
      '7': true,
      '8': true,
      '9': true,
    }
    this.remaining = 9
  }

  getRemaining() {
    const { vals } = this
    const ret = []
    if (vals[1]) ret.push('1')
    if (vals[2]) ret.push('2')
    if (vals[3]) ret.push('3')
    if (vals[4]) ret.push('4')
    if (vals[5]) ret.push('5')
    if (vals[6]) ret.push('6')
    if (vals[7]) ret.push('7')
    if (vals[8]) ret.push('8')
    if (vals[9]) ret.push('9')
    return ret
  }

  eliminate(n) {
    const { vals } = this
    if (vals[n]) {
      vals[n] = false
      this.remaining--
    }
    // returns true if there is nothing remaining
    return this.remaining === 0
  }
}