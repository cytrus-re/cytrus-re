const sen = require("txtgen").sentence;

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  try {
    message.channel.send(sen());
  } catch (err) {
    message.channel.send(client.errors.genericError + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ["sentence", "rsent"],
  guildOnly: false,
  permLevel: "User"
};

exports.help = {
  name: "randomsentence",
  category: "General",
  description: "Returns a random sentence.",
  usage: "randomsentence"
};
