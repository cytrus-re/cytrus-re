exports.run = async (client, message, args) => {
  try {
    if (!args || args.length < 1)
      return message.channel.send("You must specify what command to load!");

    let response;
    response = client.loadCommand(args[0]);
    if (response) return message.channel.send(response);
    client.logger.info(`Loading command: ${args[0]}`);
    message.channel.send(`The command ${args[0]} has been loaded.`);
  } catch (err) {
    message.channel.send(client.errors.genericError + err).catch();
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["coml", "loadc"],
  permLevel: "Bot Moderator",
};

exports.help = {
  name: "load",
  category: "System",
  description: "Loads a command.",
  usage: "load [command]",
};
