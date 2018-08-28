import assert from 'assert'
import { loop, loopRet } from './utils'

export function loop_iterates_9_times() {
  const xSet = new Set
  loop(9, x => xSet.add(x))
  assert.deepEqual(xSet.size, 9, 'the set has only 9 distinct elements')
  for (let i = 0; i < 9; i++) {
    assert.ok(xSet.has(i), `has ${i}`)
  }
}

export function loopRet_breaks_the_loop_with_non_undefined_returns() {
  let counter = 0
  const result = loopRet(9, x => {
    counter++
    if (x === 4) {
      return 'hello'
    }
  })
  assert.deepEqual(counter, 5, 'The function is called 4 times')
  assert.deepEqual(result, 'hello', 'The result is from the iteration that returned a non-undefined')
}

export function loop_throws_if_any_iteration_throws() {
  function throwWhen5(x) {
    if (x === 5) {
      throw `Reached 5!`
    }
  }
  assert.throws(() => loopRet(9, throwWhen5), 'Throws')
}
