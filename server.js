const Discord = require("discord.js");
var Twit = require('twit')
var config_base = require('./config/base')
var config = require(config_base.mode)
var moment = require('moment-timezone')
moment.locale("es")

// Inicio de conexiones y configuración
var T = new Twit(config_base.twitter)
const client = new Discord.Client();
var initiate = false

/**
 * Cuando se conecta correctamente
 */
client.on("ready", () => {
    console.log(config.mensajes.init);
});

/**
 * Cuando hay un mensaje nuevo en Discord
 */
client.on("message", (message) => {
    // Comando base para identificar el bot
    if (message.content.startsWith(config.comandos.base)) {

        // Comando de inicio
        if (message.content.startsWith(config.comandos.start)) {
            if (!initiate) {
                message.channel.send(config.mensajes.start, { files: [config.images.start] });
                stream = T.stream('statuses/filter', { follow: config.users })
                initiate = true
                stream.on('tweet', function (tweet) {
                    var id_user = tweet.user.id_str;
                    var id = tweet.id_str;
                    if (config.users.includes(id_user)) {
                        console.log(config.users.includes(id_user) + " // Tweet: " + config_base.twitter_url + id);
                        var nombre = tweet.user.name
                        var dia = moment.tz(new Date(tweet.created_at), "America/Bogota").format("LLLL")
                        message.channel.send(`Nuevo tweet de **${nombre}** el ${dia}. >${config_base.twitter_url}${id}`);
                    }
                })
            } else {
                message.channel.send(config.mensajes.already, { files: [config.images.already] });
            }
        // Comando de test
        } else if (message.content.startsWith(config.comandos.test)) {
            message.channel.send(config.mensajes.test, { files: [config.images.test] });
        } else {
            // Comando desconocido
            message.channel.send(config.mensajes.unknown, { files: [config.images.unknown] });
        }
    }

});

/**
 * Conexión al bot de discord
 */
client.login(config_base.discord_bot);