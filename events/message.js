const kraken = require("./../kraken.js");
const config = kraken.config;

module.exports = async (kraken, message) => {
    const messageDAT = message.content + "";
    if (message.author.bot) {
        return
    };
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if ((message.content + "").replace("!", "").trim() === "<@" + kraken.user.id + ">") {
        message.reply("the prefix is: " + config.prefix);
    }

    if (!messageDAT.startsWith(config.prefix)) {
       return
    }

    let cmd;
    if (kraken.commands.has(command)) {
        cmd = kraken.commands.get(command);
    } else if (kraken.aliases.has(command)) {
        cmd = kraken.commands.get(kraken.aliases.get(command));
    }
    if (!cmd) {
        return
    };
    if (cmd.conf["enabled"] === false) return
    if (cmd) {
        console.log(`[Kraken]\t${message.author.username} used command '${cmd.help["name"]}'`);
    }

    function commandError(err){
        console.log("ERROR RUNNING COMMAND");
        console.log(err);
        message.channel.send("An internal error occoured.");
        kraken.channels.get('674459040721403934').send(`\`\`\`${err.stack}\`\`\``||"error lmao");
    }
    
    cmd.run(kraken, message, args, commandError);
}