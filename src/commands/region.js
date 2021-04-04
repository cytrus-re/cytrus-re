exports.run = async (client, message, args, level) => {
  try {
    if (!args[0]) {
      return message.reply("You need to specify a region!");
    } else {
      message.guild
        .setRegion(args[0])
        .catch((err) => message.channel.send(client.errors.genericError + err));
      message.channel.send("Region set!");
    }
  } catch (err) {
    message.channel.send(client.errors.genericError + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ["sr"],
  guildOnly: false,
  permLevel: "Administrator",
};

exports.help = {
  name: "region",
  category: "Moderation",
  description: "Changes the server's region.",
  usage: "region <region>",
};
