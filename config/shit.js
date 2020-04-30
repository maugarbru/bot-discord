config = {
    discord_bot: "...", // Bot Discord TOKEN
    users: ["1026491831398354946", "1034055823272685568", "1162134936578600960", "746754538284134400", "1055207007995813898"], // List of twitter users IDs,
    comandos: {
        base: "$bot ",
        start: base + "start",
        test: base + "test",
    },
    mensajes: {
        init: "ShitBOT despierto. Esperando mensajes :)",
        start: "Iniciando... Ready para los tweets!",
        test: "Test de imagenes... :nerd:",
        already: "Ya estoy encendido... :rage:",
        unknown: "Comando desconocido."
    },
    images: { // List of images for the bot for use
        start: "https://media.giphy.com/media/Q3pp9Y6LxBvoI/giphy.gif",
        already: "https://media.giphy.com/media/a2fVCj2CudIiY/giphy.gif",
        test: "https://media.giphy.com/media/l46CwEYnbFtFfjZNS/giphy.gif",
        unknown: "https://media.giphy.com/media/kaq6GnxDlJaBq/giphy.gif"
    }
}

module.exports = config;