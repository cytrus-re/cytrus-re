const request = require("request");

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  try {
    if (!args[0]) return message.channel.send(client.errors.noQueryGiven);
    
    request({url: "https://djsdocs.sorta.moe/main/stable/embed?q=" + encodeURIComponent(args.join(" ")), json: true}, (req, res, json) => {
      message.channel.send({embed: json});
    });
  } catch (err) {
    message.channel.send(client.errors.genericError + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ["djs", "djsdocs"],
  guildOnly: false,
  permLevel: "User"
};

exports.help = {
  name: "discordjsdocs",
  category: "Search",
  description: "Searches the Discord.js docs for your query.",
  usage: "discordjsdocs <query>"
};
