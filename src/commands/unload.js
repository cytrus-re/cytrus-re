exports.run = async (client, message, args, level) => {// eslint-disable-line no-unused-vars
  try {
    if (!args || args.length < 1) return message.reply("You must provide a command to unload!");

    let response = await client.unloadCommand(args[0]);
    if (response) return message.reply(`Error unloading: ${response}`);

    client.logger.log(`Unloading Command: ${args[0]}`);
    message.reply(`The command \`${args[0]}\` has been unloaded`);
  } catch (err) {
    message.channel.send("There was an error!\n" + err).catch();
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["uload"],
  permLevel: "Bot Moderator"
};

exports.help = {
  name: "unload",
  category: "System",
  description: "Unloads a command",
  usage: "unload [command]"
};
