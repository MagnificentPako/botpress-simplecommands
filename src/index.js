import createConfig from './config'

let config = null

module.exports = {
  init: function (bp) {
  },
  ready: function (bp) {
    config = createConfig(bp)
    bp.addCommand = (name, handler) => {

    }
  }
}
