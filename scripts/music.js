const config = require('../config')
const { MessageEmbed } = require('discord.js')
const yt = require('youtube-search-without-api-key')
const ytdl = require('ytdl-core')

const queue = new Map()

const formatEmbedMessage = (data) => {
  return new MessageEmbed()
    .setTitle(data.title)
    .setURL(data.video_url)
    .setAuthor('Now playing...')
    .setColor('#555555')
    .setThumbnail(data.author.thumbnails[data.author.thumbnails.length - 1].url)
    .setImage(data.thumbnails[data.thumbnails.length - 1].url)
    .setFooter(data.author.name, data.author.thumbnails[0].url)
    .addFields(
      {
        name: 'Views',
        value: Number(data.viewCount).toLocaleString(),
        inline: true
      },
      {
        name: 'Likes',
        value: Number(data.likes).toLocaleString(),
        inline: true
      },
      {
        name: 'Publish Date',
        value: data.publishDate,
        inline: true
      }
    )
    .setTimestamp(new Date())
}

const searchYoutube = async (text) => {
  const [result] = await yt.search(text)
  return result.url
}

const execute = async (message, serverQueue) => {
  try {
    const args = message.content.split(config.comandos.play + ' ')
    const searchedSong = args[1].includes('.com')
      ? args[1]
      : await searchYoutube(args[1])

    const voiceChannel = message.member.voice.channel
    if (!voiceChannel) {
      return message.channel.send(
        'You need to be in a voice channel to play music!'
      )
    }
    const permissions = voiceChannel.permissionsFor(message.client.user)
    if (!permissions.has('CONNECT') || !permissions.has('SPEAK')) {
      return message.channel.send(
        'I need the permissions to join and speak in your voice channel!'
      )
    }

    const songInfo = await ytdl.getInfo(searchedSong)
    const song = {
      title: songInfo.videoDetails.title,
      url: songInfo.videoDetails.video_url,
      data: songInfo.videoDetails
    }

    if (!serverQueue) {
      const queueContruct = {
        textChannel: message.channel,
        voiceChannel: voiceChannel,
        connection: null,
        songs: [],
        volume: 5,
        playing: true
      }

      queue.set(message.guild.id, queueContruct)

      queueContruct.songs.push(song)

      try {
        const connection = await voiceChannel.join()
        queueContruct.connection = connection
        play(message.guild, queueContruct.songs[0])
      } catch (err) {
        console.log(err)
        queue.delete(message.guild.id)
        return message.channel.send(err.message)
      }
    } else {
      serverQueue.songs.push(song)
      return message.channel.send(`**${song.title}** has been added to the queue!`)
    }
  } catch (error) {
    console.log(error.message)
    return message.channel.send(
      'Oops! We have encountered an error, try again!'
    )
  }
}

const skip = (message, serverQueue) => {
  if (!message.member.voice.channel) {
    return message.channel.send(
      'You have to be in a voice channel to stop the music!'
    )
  }
  if (!serverQueue) { return message.channel.send('There is no song that I could skip!') }
  serverQueue.connection.dispatcher.end()
}

const stop = (message, serverQueue) => {
  if (!message.member.voice.channel) {
    return message.channel.send(
      'You have to be in a voice channel to stop the music!'
    )
  }

  if (!serverQueue) { return message.channel.send('There is no song that I could stop!') }

  serverQueue.songs = []
  serverQueue.connection.dispatcher.end()
}

const play = (guild, song) => {
  const serverQueue = queue.get(guild.id)
  if (!song) {
    serverQueue.voiceChannel.leave()
    queue.delete(guild.id)
    return
  }

  const dispatcher = serverQueue.connection
    .play(ytdl(song.url))
    .on('finish', () => {
      serverQueue.songs.shift()
      play(guild, serverQueue.songs[0])
    })
    .on('error', (error) => console.error(error))
  dispatcher.setVolumeLogarithmic(serverQueue.volume / 5)
  serverQueue.textChannel.send(formatEmbedMessage(song.data))
}

module.exports = {
  queue,
  execute,
  stop,
  skip
}
