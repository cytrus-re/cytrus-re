const ms = require("ms");

exports.run = async (client, message, args, level) => {
  try {
    message.channel.send(ms(args.join(" ")));
  } catch (err) {
    message.channel.send(client.errors.genericError + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ["timems"],
  guildOnly: false,
  permLevel: "User"
};

exports.help = {
  name: "toms",
  category: "General",
  description: "Returns the time specified in millisecconds.",
  usage: "toms <time (NOT IN MS)>"
};
