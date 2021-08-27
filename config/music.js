const comando = "$bot "
config = {
    discord_bot: process.env.TOKEN,
    comandos: {
        base: comando,
        play: comando + "start",
        skip: comando + "skip",
        stop: comando + "stop",
    },
    mensajes: {
        init: "BOT initialized. Waiting for messages :)",
        play: "Now playing... ",
        skip: "Song skipped.",
        stop: "Queue stopped.",
        unknown: "Unknown command. ¯\_(ツ)_/¯"
    },
    images: { // List of images for the bot for use
        start: "https://media.giphy.com/media/Q3pp9Y6LxBvoI/giphy.gif",
        already: "https://media.giphy.com/media/a2fVCj2CudIiY/giphy.gif",
        test: "https://media.giphy.com/media/l46CwEYnbFtFfjZNS/giphy.gif",
        unknown: "https://media.giphy.com/media/kaq6GnxDlJaBq/giphy.gif"
    }
}

module.exports = config;