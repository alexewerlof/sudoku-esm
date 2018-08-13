import assert from 'assert'
import { Board } from './board'

function canConstruct() {
  const b = new Board
  assert(b instanceof Board)
}

function trueIsFalse() {
  assert(true === false, 'boolean lie')
}

export default [ canConstruct, trueIsFalse ]