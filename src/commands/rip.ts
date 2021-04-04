exports.run = async (client, message) => {
  try {
    message.channel.send({
      files: ["https://cdn.discordapp.com/emojis/230989718471442432.png"],
    });
  } catch (err) {
    message.channel.send(client.errors.genericError + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: [],
  guildOnly: false,
  permLevel: "User",
};

exports.help = {
  name: "rip",
  category: "Fun",
  description: "Returns a RIP Image",
  usage: "rip",
};
