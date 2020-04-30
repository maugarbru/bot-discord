const Discord = require("discord.js");
const client = new Discord.Client();
var Twit = require('twit')
var config = require('./config')
var moment = require('moment');
moment.locale("es")

var T = new Twit(config.twitter_config)
var initiate = false

client.on("ready", () => {
    console.log("Bot despierto. Esperando mensajes :)");
});

client.on("message", (message) => {
    if (message.content.startsWith("$bot")) {
        if (message.content.startsWith("$bot start")) {
            if (!initiate) {
                message.channel.send("Iniciando... Ready para los tweets!", { files: [config.images.start] });
                stream = T.stream('statuses/filter', { follow: config.twitter_user })
                initiate = true
                stream.on('tweet', function (tweet) {
                    var id_user = tweet.user.id_str;
                    var id = tweet.id_str;
                    console.log(config.twitter_user.includes(id_user) + " // TweetID: " + config.twitter_tweet_url + id);

                    if (config.twitter_user.includes(id_user)) {
                        var nombre = tweet.user.name
                        var dia = moment(new Date(tweet.created_at)).format("LLLL")
                        message.channel.send(`Nuevo tweet de **${nombre}** el ${dia}. >${config.twitter_tweet_url}${id}`);
                        console.log(`Tweet: ${nombre} - ${tweet.text}`);
                    }
                })
            } else {
                message.channel.send("Ya estoy encendido... :rage:", { files: [config.images.already] });
            }
        } else if (message.content.startsWith("$bot test")) {
            message.channel.send("Test de imagenes... :rage:", { files: [config.images.test] });
        } else {
            message.channel.send("Comando desconocido.");
        }
    }

});

client.login(config.discord_bot);