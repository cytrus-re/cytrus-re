module.exports = (client, message, messageNew) => {
  if (message.author.bot) return; // If the message author is a bot, then don't do this. 
  if (message.pinned && !messageNew.pinned) return; // If the message was pinned, then don't do this.
  if (!message.pinned && messageNew.pinned) return; // If the message was unpinned (? @Rexogamer pls explain), don't do this.
  if (message.content == messageNew.content) return; // If the message was JUST created, don't do this.
  
  let settings = client.getSettings(message.guild.id); // Get settings
  
  if (settings.logMessageUpdates == "true") { //If settings has logMessageUpdates set to true, then we'll do the code below.
    if (message.guild.channels.cache.find(channel => channel.name == settings.modLogChannel)) { // Checking something, I don't know. @Rexogamer please
      message.guild.channels.cache.find(channel => channel.name == settings.modLogChannel).send({ embed: { color: "#eeeeee", title: "Message Edited", fields: [{ name: "**Message edited by**", value: `${message.author.tag}` }, { name: "**Old message**", value: `${message.content}` }, { name: "**New message**", value: `${messageNew.content}` }] } }).catch(client.logger.error); // Sends an embed with what was edited and the old content, and then sends it to the logging channel.
    }
  }
};
