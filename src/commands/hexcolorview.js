exports.run = async (client, message, args, level) => {
  try {
    if (!args[0]) return message.channel.send("You have to give me a hex code!");

    let hexcolor = args[0].replace("#", "");

    message.channel.send({ embed: { color: `${hexcolor}`, title: `#${hexcolor}` }});
  } catch (err) {
    message.channel.send(client.errors.genericError + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ["hexview", "colorview", "colourview"],
  guildOnly: false,
  permLevel: "User"
};

exports.help = {
  name: "hexcolorview",
  category: "General",
  description: "Returns an embed with the colour of the hex value you specified.",
  usage: "hexcolorview <value>"
};
