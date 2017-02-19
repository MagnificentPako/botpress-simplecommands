# Installation
```
botpress install simplecommands
```

# Usage
```
bp.addCommand("help", "discord", (event, next, args) => {
  bp.discord.sendText(event.channel.id, "There's no help available right now.")
})

bp.addCommand("help", "irc", (event, next, args) => {
  bp.irc.sendMessage(event.channel, "There's no help available right now.")
})
```
