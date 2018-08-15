import assert from 'assert'
import { Board } from './board'

const cells = '956124378' +
  '123578469' +
  '478369125' +
  '214635897' +
  '769841253' +
  '385792614' +
  '531287946' +
  '847916532' +
  '692453781'

export function can_construct() {
  const b = new Board
  assert(b instanceof Board)
}

export function can_construct_from_a_string() {
  const b = new Board(cells)
  assert.deepEqual(b.cells, cells, 'The same cells are stored correctly')
}

export function can_construct_from_another_board() {
  const a = new Board(cells)
  const b = new Board(cells)
  assert.deepEqual(a.cells, b.cells, 'The cells come from the other board')
}

export function fails_to_construct_from_invalid_strings() {
  assert.throws(() => new Board(''), Error, 'empty string')
  assert.throws(() => new Board('k'), Error, 'a string with an invalid character')
  assert.throws(() => new Board(cells.substr(10)), Error, 'a string with an invalid number of character')
}

export function fails_to_construct_from_a_string_that_represents_an_invalid_board() {
  const invalidCells = '856124378' +
    '123578469' +
    '478369125' +
    '214635897' +
    '769841253' +
    '385792614' +
    '531287946' +
    '847916532' +
    '692453781'
  assert.throws(() => new Board(invalidCells), Error, 'a string representing an invalid board')
}

export function isInvalid_returns_false_for_a_valid_board() {
  const validBoard = new Board('1'.padEnd(81, ' '))
  assert.deepEqual(validBoard.isInvalid(), false, 'false for a valid board')
}

export function isInvalid_returns_true_for_a_board_with_errors() {
  const invalidBoard = new Board()
  invalidBoard.cells = '11'.padEnd(81, ' ')
  assert.deepEqual(invalidBoard.isInvalid(), true, 'returns true for an invalid board')
}