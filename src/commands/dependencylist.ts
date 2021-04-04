const Discord = require("discord.js");

exports.run = async (client, message, args, level) => {
  try {
    let output = "";
    Object.keys(require("../../package.json").dependencies).forEach(
      (pack) => (output += pack + "\n")
    );
    let length = Object.keys(require("../../package.json").dependencies).length;

    let embed = new Discord.MessageEmbed()
      .setTitle(`Cytrus-RE's ${length} dependencies:`)
      .setColor("#eeeeee")
      .setThumbnail(client.user.avatarURL)
      .setDescription(output);

    message.channel.send(embed);
  } catch (err) {
    message.channel.send(client.errors.genericError + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ["modulelist", "packagelist", "pl", "deplist", "ml"],
  guildOnly: false,
  permLevel: "User",
};

exports.help = {
  name: "dependencylist",
  category: "System",
  description: "Lists the dependencies that Cytrus-RE uses.",
  usage: "dependencylist",
};
