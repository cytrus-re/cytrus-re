exports.run = async (client, message) => {
  try {
    message.channel.send("Muting channel...");
    
    message.channel.overwritePermissions(message.guild.id, {SEND_MESSAGES: false});
    
    message.channel.send("This channel has been muted. You may not send any messages at this time. Admins, you can run c.unraid to unmute the chat at any time.");
  } catch (err) {
    message.channel.send(client.errors.genericError + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ["raid", "chmute", "cmute", "mutech"],
  guildOnly: true,
  permLevel: "Administrator"
};

exports.help = {
  name: "mutechannel",
  category: "Moderation",
  description: "Mutes the channel you use the command in.",
  usage: "mutechannel"
};
