const Discord = require("discord.js");

exports.run = async (client, message, args, level) => {
  try {
    let output = "";
    Object.keys(require("../../package.json").dependencies).forEach((pack) => output += pack + "\n");
    
    let embed = new Discord.MessageEmbed()
    .setTitle("Cytrus-RE's" + Object.keys(require("../../package.json").dependencies).length + "dependencies:")
    .setColor("#363942")
    .setThumbnail(client.user.avatarURL)
    .setDescription(output)
    
    message.channel.send(embed);
  } catch (err) {
    message.channel.send(client.errors.genericError + err).catch();
  }
};

exports.conf = {
  enabled: false, // disabled until we know it's okay
  aliases: ["modulelist", "packagelist", "pl", "deplist", "ml"],
  guildOnly: false,
  permLevel: "User"
};

exports.help = {
  name: "dependencylist",
  category: "System",
  description: "Lists the dependencies that Cytrus-RE uses. [currently broken]",
  usage: "dependencylist"
};
