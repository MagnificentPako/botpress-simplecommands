import createConfig from './config'

var config = null
var commands = {}

const incomingMiddleware = (event, next) => {
  if (event.type !== 'message' && event.type !== 'text') {
    console.log('wai')
    return next()
  }

  const rawmsg = event.text
  if (!rawmsg.startsWith(config.prefix.get())) {
    return next()
  }
  const msg = rawmsg.slice(config.prefix.get().length)
  const cmd = msg.split(' ')[0]
  const args = msg.split(' ').slice(1)
  if (commands[cmd] === null) {
    return next()
  }
  commands[cmd](event, next, args)
}

module.exports = {
  init: function (bp) {
    bp.middlewares.register({
      name: 'commands.handle',
      type: 'incoming',
      order: 100,
      handler: incomingMiddleware,
      module: 'botpress-simplecommands',
      description: 'Parses commands and stuff.'
    })
    bp.addCommand = (name, handler) => {
      commands[name] = handler
    }
  },

  ready: function (bp) {
    config = createConfig(bp)
  }
}
