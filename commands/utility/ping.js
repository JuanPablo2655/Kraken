const Discord = require("discord.js");

module.exports.run = async (kraken, message, args, cb) => {
    try {
        message.channel.send('Pong').catch(e => cb(e));
    } catch (e) {
        cb(e)
    }
}

exports.conf = {
    enabled: true,
    aliases: []
}

exports.help = {
    name: "ping",
    description: "ping pong",
    usage: "ping"
}