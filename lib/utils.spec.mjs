import assert from 'assert'
import { loop } from './utils'

export function loop_iterates_9_times() {
  const xSet = new Set
  loop(9, x => xSet.add(x))
  assert.deepEqual(xSet.size, 9, 'the set has only 9 distinct elements')
  for (let i = 0; i < 9; i++) {
    assert.ok(xSet.has(i), `has ${i}`)
  }
}
