const Discord = require("discord.js");

exports.run = async (client, message, args, level) => { 
  try {
    let embed = new Discord.MessageEmbed()
    .setTitle(message.guild.name)
    .setDescription(`
ID: ${message.guild.id}
Members: ${message.guild.memberCount}
Region: ${message.guild.region}
Name: ${message.guild.name}
Icon URL: ${message.guild.iconURL("jpeg", true, 256)}
Created At: ${message.guild.createdAt}
MFA Level: ${message.guild.mfaLevel}
Verification Level: ${message.guild.verificationLevel.toProperCase()}
Owner ID: ${message.guild.ownerID}
Name Acronym: ${message.guild.nameAcronym}
`)    
    .setThumbnail(message.guild.iconURL("jpeg", false, 256))
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
  description: "Returns info about the server you're in.",
  usage: "serverinfo"
};
