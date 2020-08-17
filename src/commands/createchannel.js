exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  try {
    if (!args[0]) return message.reply("You need to give me the channel name!");
    if (!args[1]) return message.reply("You need to give me the channel type!");
    
    message.channel.send("Channel created.").then(() => {
      message.guild.createChannel(args[1], args[0], []).catch((err) => {
        message.channel.send(client.errors.genericError)
      });
    });
  } catch (err) {
    message.channel.send(client.errors.genericError + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ["crc", "chanmake"],
  guildOnly: true,
  permLevel: "Administrator"
};

exports.help = {
  name: "createchannel",
  category: "Moderation",
  description: "Creates a channel in the server.",
  usage: "createchannel <voice/text> <name>"
};
