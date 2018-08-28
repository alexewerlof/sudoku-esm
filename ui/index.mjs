import Vue from 'https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.17/vue.esm.browser.js'
import Board from '../lib/Board.mjs'

const puzzle = 
  ' 7 4   92' +
  '    8   5' +
  '  3   7  ' +
  '       8 ' +
  '  7 1 5 4' +
  '   237   ' +
  '2 4  5  3' +
  '         ' +
  '8 5   1  '
  
const board = new Board(puzzle)

const app = new Vue({
  el: '#app',
  data: {
  },
  methods: {
    getCellStr(col, row) {
      const val = board.getCell(col - 1, row - 1)
      return val === 0 ? this.getPossibilities(col, row) : String(val)
    },

    isUncertainCell(col, row) {
      return board.getCell(col - 1, row - 1) === 0
    },

    getPossibilities(col, row) {
      return board.getPossibilities(col - 1, row -1) || []
    },

    getStats() {
      return board.getStats()
    }
  }
})