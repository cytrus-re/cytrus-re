exports.run = async (client, message) => {
  try {
    let res = await client.awaitReply(
      message,
      "Are you sure you want to destroy the client?"
    );

    if (res == "yes") {
      message.channel.send("Destroying client...");
      client.destroy();
    } else message.channel.send("Aborted.");
  } catch (err) {
    message.channel.send(client.errors.genericError + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ["botdest", "clidest"],
  guildOnly: true,
  permLevel: "Bot Admin",
};

exports.help = {
  name: "destroy",
  category: "System",
  description: "Destroys the client and logs out of Discord.",
  usage: "destroy",
};
