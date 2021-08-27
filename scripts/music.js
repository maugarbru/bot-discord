const { search } = require('youtube-search-without-api-key');
const ytdl = require('ytdl-core');
const config = require('../config');

const queue = new Map();

const searchYoutube = async (interaction, text) => {
  const [results] = await search(text);

  const embed = {
    color: 0x0099ff,
    title: results.title,
    url: results.url,
    author: {
      name: 'Some name',
      icon_url: 'https://i.imgur.com/AfFp7pu.png',
      url: 'https://discord.js.org',
    },
    description: results.description,
    thumbnail: {
      url: results.snippet.thumbnails.url,
    },
    fields: [
      {
        name: 'Inline field title',
        value: 'Some value here',
        inline: true,
      },
      {
        name: 'Inline field title',
        value: 'Some value here',
        inline: true,
      },
      {
        name: 'Inline field title',
        value: 'Some value here',
        inline: true,
      },
    ],
    image: {
      url: results.snippet.thumbnails.url,
    },
    timestamp: new Date(),
    footer: {
      text: 'Some footer text here',
      icon_url: 'https://i.imgur.com/AfFp7pu.png',
    },
  };
  interaction.reply({ embed });

  return results.url;
};

const play = (guild, song) => {
  const serverQueue = queue.get(guild.id);
  if (!song) {
    serverQueue.voiceChannel.leave();
    queue.delete(guild.id);
    return;
  }

  const dispatcher = serverQueue.connection
    .play(ytdl(song.url))
    .on('finish', () => {
      serverQueue.songs.shift();
      play(guild, serverQueue.songs[0]);
    })
    .on('error', (error) => console.error(error));
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
  serverQueue.textChannel.send(`Start playing: **${song.title}**`);
};

const execute = async (interaction, serverQueue) => {
  try {
    const args = interaction.commandName.split(`${config.comandos.play} `);
    const searchedSong = args[1].includes('.com')
      ? args[1]
      : await searchYoutube(interaction, args[1]);

    const voiceChannel = interaction.member.voice.channel;
    if (!voiceChannel) {
      return interaction.reply(
        'You need to be in a voice channel to play music!',
      );
    }
    const permissions = voiceChannel.permissionsFor(interaction.client.user);
    if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
      return interaction.reply(
        'I need the permissions to join and speak in your voice channel!',
      );
    }

    const songInfo = await ytdl.getInfo(searchedSong);
    const song = {
      title: songInfo.videoDetails.title,
      url: songInfo.videoDetails.video_url,
    };

    if (!serverQueue) {
      const queueContruct = {
        textChannel: interaction.channel,
        voiceChannel,
        connection: null,
        songs: [],
        volume: 5,
        playing: true,
      };

      queue.set(interaction.guild.id, queueContruct);

      queueContruct.songs.push(song);

      try {
        const connection = await voiceChannel.join();
        queueContruct.connection = connection;
        play(interaction.guild, queueContruct.songs[0]);
      } catch (err) {
        console.log(err);
        queue.delete(interaction.guild.id);
        return interaction.reply(err);
      }
    } else {
      serverQueue.songs.push(song);
      return interaction.reply(`${song.title} has been added to the queue!`);
    }
  } catch (error) {
    console.log(error.message);
    return interaction.reply('Oops! We have encountered an error, try again!');
  }
  return 'OK';
};

const skip = (interaction, serverQueue) => {
  if (!interaction.member.voice.channel) {
    return interaction.reply(
      'You have to be in a voice channel to stop the music!',
    );
  }
  if (!serverQueue) return interaction.reply('There is no song that I could skip!');
  serverQueue.connection.dispatcher.end();

  return 'OK';
};

const stop = (interaction, serverQueue) => {
  if (!interaction.member.voice.channel) {
    return interaction.reply(
      'You have to be in a voice channel to stop the music!',
    );
  }

  if (!serverQueue) return interaction.reply('There is no song that I could stop!');

  // eslint-disable-next-line no-param-reassign
  serverQueue.song = [];
  serverQueue.connection.dispatcher.end();

  return 'OK';
};

module.exports = {
  queue,
  execute,
  skip,
  stop,
};
