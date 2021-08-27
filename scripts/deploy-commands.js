const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const config = require('../config');

const commands = [
  new SlashCommandBuilder().setName('play').setDescription('Plays a song!'),
  new SlashCommandBuilder().setName('skip').setDescription('Skips to the next song!'),
  new SlashCommandBuilder().setName('stop').setDescription('Stops the queue!'),
]
  .map((command) => command.toJSON());

const rest = new REST({ version: '9' }).setToken(config.discord_token);

(async () => {
  try {
    await rest.put(
      Routes.applicationGuildCommands(config.discord_client, config.discord_guild),
      { body: commands },
    );

    console.log('Successfully registered application commands.');
  } catch (error) {
    console.error(error);
  }
})();
