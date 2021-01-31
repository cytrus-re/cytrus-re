const Discord = require("discord.js");
exports.run = async (client, message) => { 
  try {
      const embed = new Discord.MessageEmbed()
      .setColor("#eeeeee")
      .setTitle("Cytrus-RE's Support Discord")
      .setFooter("Join our server to get help, report bugs, sugge at features and more!")
      .setDescription("[**Join here!**](client.config.supportServer)");
      message.channel.send(embed);
  } catch (err) {
    message.channel.send(client.errors.genericError + err).catch();
  }
};
  
exports.conf = {
  enabled: true,
  aliases: ["supportserver"],
  guildOnly: false,
  permLevel: "User"
};
  
exports.help = {
  name: "support",
  category: "System",
  description: "Gives you a link to our Discord server.",
  usage: "support"
};
