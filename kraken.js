const Discord = require("discord.js");
const kraken = new Discord.Client();
const fs = require("fs");
const path = require("path");

const config = require("./config.json")
kraken.config = config;
const secrets = require("./secrets.json");

kraken.commands = new Discord.Collection();
kraken.aliases = new Discord.Collection();
const categories = fs.readdirSync('./commands/').filter(file => fs.statSync(path.join('./commands/', file)).isDirectory());

categories.forEach(c => {
    fs.readdir(`./commands/${c}/`, async (err, files) => {
        if (err) throw err;
        console.log(`[Commands]\tLoaded ${files.length} commands of category ${c}`);
        await files.forEach(f => {
            const props = require(`./commands/${c}/${f}`);
            kraken.commands.set(props.help.name, props);
            props.conf.aliases.forEach(alias => {
                kraken.aliases.set(alias, props.help.name);
            });
        });
    });
});

fs.readdir('./events/', async (err, files) => {
    if (err) return console.error;
    console.log(`[Events]\tLoaded a total amount ${files.length} Events`)
    await files.forEach(file => {
        if (!file.endsWith('.js')) return;
        const evt = require(`./events/${file}`);
        let evtName = file.split('.')[0];
        kraken.on(evtName, evt.bind(null, kraken));
    });
});

kraken.advancedHelp = function (command) {
    if (!command) return "That command doesn't exist.";
    let helpMenu = new Discord.RichEmbed()
        .setTitle('Help Menu')
        .setColor('RANDOM')
        .addField('Description', command.help["description"])
        .addField("Usage", command.help["usage"])
        .addField("Aliases", command.conf["aliases"].join(", ") || "No Aliases");
    return helpMenu;
}

kraken.login(secrets.token);

exports.config = config;
exports.kraken = kraken;