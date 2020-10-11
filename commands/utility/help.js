const Discord = require("discord.js");
const fs = require("fs");
const path = require('path');

module.exports.run = async (kraken, message, args, cb) => {
    try {
        const categories = fs.readdirSync('./commands/').filter(file => fs.statSync(path.join('./commands/', file)).isDirectory());
        let helpEmbed = new Discord.RichEmbed();
        helpEmbed.setTimestamp()
        helpEmbed.setAuthor('Kraken Gaming', message.guild.iconURL)
        helpEmbed.setColor('RANDOM')

        if (args.length === 0) {
            helpEmbed.setDescription("Please select one of the following categories");
            categories.forEach(category => {
                if (category === 'dev') return;
                helpEmbed.addField(category, `\`k!help ${category}\``, true);
            });
            message.channel.send(helpEmbed);
        } else {
            let dir = args[0];
            if (!categories.includes(dir) && !(kraken.commands.get(dir))) {
                return message.channel.send("Invalid category or command");
            }

            if (categories.includes(dir)) {
                fs.readdir(`./commands/${args[0]}/`, (err, files) => {
                    helpEmbed.setDescription("Showing help for category " + dir);
                    if (err) throw err;
                    files.forEach(f => {
                        const props = require(`../${args[0]}/${f}`)
                        helpEmbed.addField(props.help.name, props.help.description)
                    })
                    message.channel.send(helpEmbed)
                })
            } else {
                const props = kraken.commands.get(dir);
                helpEmbed.setDescription("Showing help for command " + dir);
                helpEmbed.addField("Usage", props.help.usage, true);
                helpEmbed.addField("Description", props.help.description, true);
                helpEmbed.addField("aliases", props.conf.aliases.join(", ") || "No Aliases");
                message.channel.send(helpEmbed)
            }
        }
    } catch (e) {
        cb(e)
    }
}

exports.conf = {
    enabled: true,
    aliases: ['h', 'command', 'cmd', 'commands']
}

exports.help = {
    name: "help",
    description: "Let the bot say stuff",
    usage: "help [category|command]"
}