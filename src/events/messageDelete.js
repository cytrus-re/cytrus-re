const Discord = require("discord.js");

module.exports = (client, message) => {
  if (message.author.bot || !message.guild) return;
  
  let settings = client.getSettings(message.guild.id);
  if (settings.logMessageUpdates == "true") {
    let embed = new Discord.MessageEmbed()
    .setTitle("Message Delete")
    .setTimestamp(new Date())
    .addField("**Message created by**", `${message.author.tag}`)
    .addField("**Message**", `${message.content}`)
    .setColor("#eeeeee");

    if (message.guild.channels.cache.find(channel => channel.name == settings.modLogChannel)) {
      message.guild.channels.cache.find(channel => channel.name == settings.modLogChannel).send(embed).catch();
    }
  }
};
