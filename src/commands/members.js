exports.run = async (client, message, args, level) => { 
  try {
    message.reply("This server has " + message.guild.memberCount + " members!");
  } catch (err) {
    message.channel.send(client.errors.genericError + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ["memcount", "ucount"],
  guildOnly: true,
  permLevel: "User"
};

exports.help = {
  name: "members",
  category: "General",
  description: "Returns the amount of members the server has.",
  usage: "members"
};
