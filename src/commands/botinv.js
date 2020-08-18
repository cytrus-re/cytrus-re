const Discord = require("discord.js");
exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  try {
    let invEmbed = new Discord.MessageEmbed()
    .setTitle("Invite Cytrus-RE to your server!")
    .setDescription("[**Click here!**](https://discordapp.com/api/oauth2/authorize?client_id=596304769333592078&permissions=2113404023&scope=bot)")
    .setColor("#eeeeee")
    message.channel.send(invEmbed);
  } catch (err) {
    message.channel.send(client.errors.genericError + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ["ri,", "botinvite", "bi", "returninvite", "cyinv"],
  guildOnly: true,
  permLevel: "User"
};

exports.help = {
  name: "botinv",
  category: "General",
  description: "Returns the invite link for Cytrus-RE.",
  usage: "botinv"
};
