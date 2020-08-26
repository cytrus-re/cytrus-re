const Discord = require("discord.js");

module.exports = (client, message, messageNew) => {
  if (message.author.bot) return;
  if (message.pinned && !messageNew.pinned) return;
  if (!message.pinned && messageNew.pinned) return;
  if (message.content == messageNew.content) return;
  
  let settings = client.getSettings(message.guild.id);
  
  if (settings.logMessageUpdates == "true") {
    if (message.guild.channels.cache.find(channel => channel.name == settings.modLogChannel)) {
      message.guild.channels.cache.find(channel => channel.name == settings.modLogChannel).send({ embed: { color: "#eeeeee", title: "Message Edited", fields: [{ name: "**Message edited by**", value: `${message.author.tag}` }, { name: "**Old message**", value: `${message.content}` }, { name: "**New message**", value: `${messageNew.content}` }] } }).catch(client.logger.error);
    }
  }
};
