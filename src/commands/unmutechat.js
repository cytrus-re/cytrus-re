exports.run = async (client, message, args, level) => {
  try {
    await message.channel.send("Unmuting Channel...");
    
    message.channel.overwritePermissions(message.guild.id, {
      SEND_MESSAGES: null
    });
  } catch (err) {
    message.channel.send("Their was an error!\n" + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ["uc", "unraid"],
  guildOnly: true,
  permLevel: "Administrator"
};

exports.help = {
  name: "unmutechannel",
  category: "Moderation",
  description: "Unmutes the channel",
  usage: "unmutechannel"
};
