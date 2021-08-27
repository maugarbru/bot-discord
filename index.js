const { Client, Intents } = require('discord.js');
const config = require('./config');
const {
  queue, execute, skip, stop,
} = require('./scripts/music');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once('ready', () => {
  console.log('Ready!');
});

client.once('reconnecting', () => {
  console.log('Reconnecting!');
});

client.once('disconnect', () => {
  console.log('Disconnect!');
});

client.on('interactionCreate', async (interaction) => {
  console.log(interaction);
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;
  console.log(commandName);
  const serverQueue = queue.get(interaction.guild.id);

  if (commandName === (config.comandos.play)) {
    execute(interaction, serverQueue);
  } else if (commandName === (config.comandos.skip)) {
    skip(interaction, serverQueue);
  } else if (commandName === (config.comandos.stop)) {
    stop(interaction, serverQueue);
  } else {
    interaction.reply('You need to enter a valid command!');
  }
});

client.login(config.discord_token);
