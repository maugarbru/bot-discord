const { Client } = require('discord.js')
const config = require('./config')
const { queue, execute, skip, stop } = require('./scripts/music')

const client = new Client()

client.once('ready', () => {
  console.log('Ready!')
})

client.once('reconnecting', () => {
  console.log('Reconnecting!')
})

client.once('disconnect', () => {
  console.log('Disconnect!')
})

client.on('message', async (message) => {
  if (message.author.bot) return
  if (!message.content.startsWith(config.comandos.base)) return

  const serverQueue = queue.get(message.guild.id)

  if (message.content.startsWith(config.comandos.play)) {
    execute(message, serverQueue)
  } else if (message.content.startsWith(config.comandos.skip)) {
    skip(message, serverQueue)
  } else if (message.content.startsWith(config.comandos.stop)) {
    stop(message, serverQueue)
  } else {
    message.channel.send('You need to enter a valid command!')
  }
})

client.login(config.discord_bot)
