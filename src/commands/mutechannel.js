exports.run = async (client, message, args, level) => {
  try {
    await message.channel.send("Muting channel...");
    
    message.channel.overwritePermissions(message.guild.id, {SEND_MESSAGES: false});
  } catch (err) {
    message.channel.send(client.errors.genericError + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ["raid", "chmute", "cmute", "mutech"],
  guildOnly: true,
  permLevel: 'Administrator'
};

exports.help = {
  name: "mutechannel",
  category: "Moderation",
  description: 'Mutes the channel you use the command in.",
  usage: "mutechannel"
};
