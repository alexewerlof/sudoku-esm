export class Checker {
  constructor() {
    this.vals = new Array(10)
    this.reset()
  }

  reset() {
    this.vals.fill(true, 1)
    this.remaining = 9
  }

  getRemaining() {
    const { vals } = this
    const ret = []
    for (let i = 1; i <= 9; i++ ) {
      if (vals[i]) {
        ret.push(i)
      }
    }
    return ret
    // TODO: return this.vals.filter(Boolean)
  }

  eliminate(n) {
    const { vals } = this
    if (vals[n]) {
      vals[n] = false
      this.remaining--
    }
    // returns true if there is nothing remaining
    if (this.remaining === 0) {
      return true
    }
  }
}