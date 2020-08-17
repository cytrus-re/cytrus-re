const Discord = require("discord.js");

module.exports = (client, message, messageNew) => {
  if (message.author.bot) return;
  if (message.pinned && !messageNew.pinned) return;
  if (!message.pinned && messageNew.pinned) return;
  if (message.content == messageNew.content) return;
  
  let settings = client.getSettings(message.guild.id);
  
  if (settings.logMessageUpdates == "true") {
    let embed = new Discord.MessageEmbed()
    .setTitle("Message Edit")
    .setTimestamp(new Date())
    .setDescription("**Message edited by**\n" + message.author.tag + "\n\n**Old Message**\n" + message.content + "\n\n**New Message**\n" + messageNew.content)
    .setColor("#eeeeee");

    if (message.guild.channels.cache.find(channel => channel.name == settings.modLogChannel)) {
      message.guild.channels.cache.find(channel => channel.name == settings.modLogChannel).send(embed).catch(client.logger.error);
    }
  }
};
