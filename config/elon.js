const comando = "$bot "
config = {
    users: ["44196397"],
    comandos: {
        base: comando,
        start: comando + "start",
        test: comando + "test",
    },
    mensajes: {
        init: "ElonBOT despierto. Esperando mensajes :)",
        start: "Saludos, discípulo. Esperando tweets del todopoderoso Elon...",
        already: "Ya estoy encendido. Sigo esperando tweets del todopoderoso Elon... ",
        test: "Testing...",
        unknown: "No reconozco el comando, discípulo de Elon"
    },
    images: { // List of images for the bot for use
        start: "https://media.giphy.com/media/5eFRL3jPLgbNj6iwPx/giphy.gif",
        already: "https://media.giphy.com/media/duKV1YBPhDtd9efnrR/giphy.gif",
        test: "https://media.giphy.com/media/ThpMkGy7mFr12th14M/giphy.gif",
        unknown: "https://media.giphy.com/media/Ip5D1pwQ4pKs8/giphy.gif"
    }
}

module.exports = config;