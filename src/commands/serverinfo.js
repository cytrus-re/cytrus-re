const Discord = require("discord.js");

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  try {
    let embed = new Discord.MessageEmbed()
    .setTitle(message.guild.name)
    .setDescription(`
ID: ${message.guild.id}
Members: ${message.guild.memberCount}
Region: ${message.guild.region}
Name: ${message.guild.name}
Icon URL: ${message.guild.iconURL}
Created At: ${message.guild.createdAt}
MFA Level: ${message.guild.mfaLevel}
Verification Level: ${message.guild.verificationLevel}
Owner ID: ${message.guild.ownerID}
Name Acronym: ${message.guild.nameAcronym}
`)
    .setThumbnail(message.guild.iconURL)
    .setColor("#eeeeee");
    
    message.channel.send(embed);
  } catch (err) {
    message.channel.send(client.errors.genericError + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ["server", "si"],
  guildOnly: true,
  permLevel: "User"
};

exports.help = {
  name: "serverinfo",
  category: "Utility",
  description: "Returns info about the server",
  usage: "serverinfo"
};
