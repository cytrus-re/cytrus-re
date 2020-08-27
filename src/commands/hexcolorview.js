exports.run = async (client, message, args, level) => {
  try {
    if (!args[0]) return message.channel.send("You have to input the HEX code!");
      
    const hexcolor = "\"" + args[0] + "\""

    message.channel.send({ embed: { color: `${hexcolor}`, title: `${hexcolor}` }});
  } catch (err) {
    message.channel.send(client.errors.genericError + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ["hexview"],
  guildOnly: false,
  permLevel: "User"
};

exports.help = {
  name: "hexcolorview",
  category: "General",
  description: "Sends an embed with the color of the hex value you specified",
  usage: "hexcolorview <value>"
};