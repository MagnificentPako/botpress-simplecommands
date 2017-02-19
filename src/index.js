import createConfig from './config'

var config = null
var commands = {}

const incomingMiddleware = (event, next) => {
  if (config.listenFor.get().indexOf(event.type) === -1 && config.listenFor.get().indexOf('universal') === -1) {
    return next()
  }

  const rawmsg = event.text
  if (!rawmsg.startsWith(config.prefix.get())) {
    return next()
  }
  const msg = rawmsg.slice(config.prefix.get().length)
  const platform = (config.listenFor.get().indexOf('universal') === -1) ? event.platform : 'universal'
  const cmd = msg.split(' ')[0]
  const args = msg.split(' ').slice(1)
  if (!commands[cmd]) {
    return next()
  }

  if (!commands[cmd].handlers[platform]) {
    return next()
  }

  commands[cmd].handlers[platform](event, next, args)
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
    bp.addCommand = (name, platform, handler) => {
      if (!commands[name]) {
        commands[name] = {
          handlers: {
            [platform]: handler
          }
        }
      } else {
        commands[name].handlers[platform] = handler
      }
    }
  },

  ready: function (bp) {
    config = createConfig(bp)
  }
}
