exports.run = async (client, message) => {
  try {
    await message.channel.send("Unmuting Channel...");

    message.channel.overwritePermissions(message.guild.id, {
      SEND_MESSAGES: null,
    });

    message.channel.send(
      "This channel has been unmuted. You may now send messages. Admins, you can run c.raid at any time should you need to again."
    );
  } catch (err) {
    message.channel.send(client.errors.genericError + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ["uc", "unraid"],
  guildOnly: true,
  permLevel: "Administrator",
};

exports.help = {
  name: "unmutechannel",
  category: "Moderation",
  description: "Unmutes the channel",
  usage: "unmutechannel",
};
