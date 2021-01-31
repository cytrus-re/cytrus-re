exports.run = async (client, message, args) => {
  try {
    if (!args || args.length < 1) return message.channel.send("You must provide a command to reload!");

    let response = await client.unloadCommand(args[0]);
    if (response) return message.channel.send(`Error unloading: ${response}`);

    response = client.loadCommand(args[0]);
    if (response) return message.channel.send(`Error loading: ${response}`);

    client.logger.info(`Reloading command: ${args[0]}`);
    message.channel(`The command \`${args[0]}\` has been reloaded`);
  } catch (err) {
    message.channel.send(client.errors.genericError + err).catch();
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["refresh"],
  permLevel: "Bot Moderator"
};

exports.help = {
  name: "reload",
  category: "System",
  description: "Reloads a command.",
  usage: "reload [command]"
};
