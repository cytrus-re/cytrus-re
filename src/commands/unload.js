exports.run = async (client, message, args) => {
  try {
    if (!args || args.length < 1)
      return message.channel.send("You must provide a command to unload!");

    let response = await client.unloadCommand(args[0]);
    if (response) return message.channel.send(`Error unloading: ${response}`);

    client.logger.info(`Unloading command: ${args[0]}`);
    message.channel.send(`The command \`${args[0]}\` has been unloaded.`);
  } catch (err) {
    message.channel.send(client.errors.genericError + err).catch();
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["uload"],
  permLevel: "Bot Moderator",
};

exports.help = {
  name: "unload",
  category: "System",
  description: "Unloads a command",
  usage: "unload [command]",
};
