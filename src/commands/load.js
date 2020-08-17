exports.run = async (client, message, args, level) => {// eslint-disable-line no-unused-vars
  try {
    if (!args || args.length < 1) return message.reply("You must say what command to load!");

    let response;
    response = client.loadCommand(args[0]);
    if (response) return message.reply(`Error loading: ${response}`);

    client.logger.log(`Loading command: ${args[0]}`);
    message.channel.send(`The command ${args[0]} has been loaded.`);
  } catch (err) {
    message.channel.send(client.errors.genericError + err).catch();
  }
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["coml", "loadc"],
  permLevel: "Bot Moderator"
};

exports.help = {
  name: "load",
  category: "System",
  description: "Loads a command.",
  usage: "load [command]"
};
