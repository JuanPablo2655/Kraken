const Discord = require("discord.js");

module.exports.run = async (kraken, message, args, cb) => {
    try {
        const sayMessage = args.join(" ");
        message.delete().catch(O_o=>{});
        message.channel.send(sayMessage);
    } catch (e) {
        cb(e)
    }
}

exports.conf = {
    enabled: true,
    aliases: []
}

exports.help = {
    name: "say",
    description: "Let the bot say stuff",
    usage: "say [message]"
}