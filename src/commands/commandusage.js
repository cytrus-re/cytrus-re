exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  try {
    let output = '';
    client.uses.forEach((cmd) => output += cmd + '\n');
    message.channel.send(output)
  } catch (err) {
    message.channel.send(client.errors.genericError + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ["cmdu"],
  guildOnly: false,
  permLevel: "Bot Manager"
};

exports.help = {
  name: "commandusage",
  category: "System",
  description: "Shows how much commands are being used.",
  usage: "commandusage"
};
