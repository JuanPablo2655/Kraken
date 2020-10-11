const Discord = require("discord.js");

module.exports.run = async (kraken, message, args, cb) => {
    try {
        let [numOfDice, numOfSides, additional] = args;
        parseInt(numOfDice)
        var total = 0
        for (i = 0; i < numOfDice; i++) {
            const randomRoll = Math.random() * numOfSides + 1
            total += Number(Math.floor(randomRoll))
        }
        if (!additional) return message.channel.send(`${numOfDice}D${numOfSides} = ${total}`)
        else message.channel.send(`${numOfDice}D${numOfSides}+${additional} = ${total + Number(additional)}`)
    } catch (e) {
        cb(e)
    }
}

exports.conf = {
    enabled: true,
    aliases: []
}

exports.help = {
    name: "roll",
    description: "roll a die",
    usage: "roll # # #"
}