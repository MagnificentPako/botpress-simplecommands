# Installation
```
botpress install simplecommands
```

# Usage
```js
bp.addCommand("help", "discord", (event, next, args) => {
  var msg = ""
  if(args.length === 0) {
    msg = "There's no help available right now."
  }else{
    msg = "You don't need help with " + args[0] + "."
  }
  bp.discord.sendText(event.channel.id, msg)
})

bp.addCommand("help", "irc", (event, next, args) => {
  bp.irc.sendMessage(event.channel, "There's no help available right now.")
})
```
