import assert from 'assert'
import { times9, times81, importantCells1D } from './utils'

export function times9_iterates_9_times() {
  const xSet = new Set
  times9(x => {
    xSet.add(x)
  })
  assert.deepEqual(xSet.size, 9, 'the set has only 9 distinct elements')
  for (let i = 0; i < 9; i++) {
    assert.ok(xSet.has(i), `has ${i}`)
  }
}

export function times9_breaks_the_loop_with_non_undefined_returns() {
  let counter = 0
  const result = times9(x => {
    counter++
    if (x === 4) {
      return 'hello'
    }
  })
  assert.deepEqual(counter, 5, 'The function is called 4 times')
  assert.deepEqual(result, 'hello', 'The result is from the iteration that returned a non-undefined')
}

export function times9_throws_if_any_iteration_throws() {
  function throwWhen5(x) {
    if (x === 5) {
      throw `Reached 5!`
    }
  }
  assert.throws(() => times9(throwWhen5), 'Throws')
}

export function times81_iterates_81_times() {
  const xSet = new Set
  times81(x => {
    xSet.add(x)
  })
  assert.deepEqual(xSet.size, 81, 'the set has only 81 distinct elements')
  for (let i = 0; i < 81; i++) {
    assert.ok(xSet.has(i), `has ${i}`)
  }
}

export function importantCells1D_is_an_array_of_81_arrays() {
  assert.ok(Array.isArray(importantCells1D), 'is an array')
  assert.deepEqual(importantCells1D.length, 81, 'and has 81 elements')
  importantCells1D.forEach((e, i) => {
    assert.ok(Array.isArray(e), `element ${i} is an array`)
  })
}