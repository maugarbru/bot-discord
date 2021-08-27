require('dotenv').config();

const comando = '$';

const config = {
  discord_token: process.env.TOKEN,
  discord_client: process.env.CLIENT,
  discord_guild: process.env.SERVER,
  comandos: {
    base: comando,
    play: 'play',
    skip: 'skip',
    stop: 'stop',
  },
  mensajes: {
    init: 'BOT initialized. Waiting for messages :)',
    play: 'Now playing... ',
    skip: 'Song skipped.',
    stop: 'Queue stopped.',
    unknown: 'Unknown command. ¯_(ツ)_/¯',
  },
  images: {
    // List of images for the bot for use
    start: 'https://media.giphy.com/media/Q3pp9Y6LxBvoI/giphy.gif',
    already: 'https://media.giphy.com/media/a2fVCj2CudIiY/giphy.gif',
    test: 'https://media.giphy.com/media/l46CwEYnbFtFfjZNS/giphy.gif',
    unknown: 'https://media.giphy.com/media/kaq6GnxDlJaBq/giphy.gif',
  },
};

module.exports = config;
