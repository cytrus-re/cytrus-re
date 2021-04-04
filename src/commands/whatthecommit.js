const request = require("request");

exports.run = async (client, message, args, level) => {
  try {
    request("http://whatthecommit.com/index.txt", (req, res, txt) =>
      message.channel.send("Commit Message: " + txt)
    );
  } catch (err) {
    message.channel.send(client.errors.genericError + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ["wtc"],
  guildOnly: false,
  permLevel: "User",
};

exports.help = {
  name: "whatthecommit",
  category: "Fun",
  description: "Returns a random commit message",
  usage: "whatthecommit",
};
