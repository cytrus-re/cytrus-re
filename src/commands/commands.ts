exports.run = async (client, message, args, level) => {
  try {
    message.channel.send(
      "Cytrus-RE has " + client.commands.size + " commands."
    );
  } catch (err) {
    message.channel.send(client.errors.genericError + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ["cmds"],
  guildOnly: false,
  permLevel: "User",
};

exports.help = {
  name: "commands",
  category: "General",
  description: "Returns the ammount of commands Cytrus-RE has.",
  usage: "commands",
};
