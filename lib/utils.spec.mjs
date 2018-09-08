import assert from 'assert'
import { r2x } from './utils'

export function r2x_gives_the_right_results() {
  assert.equal(r2x(0), 0, 'works for 0')
  assert.equal(r2x(1), 1, 'works for 0')
  assert.equal(r2x(8), 8, 'works for 0')
  assert.equal(r2x(9), 0, 'works for 0')
}
