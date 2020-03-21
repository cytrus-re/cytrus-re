exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  try {
    let msg = await message.channel.send("Editing tag...");
    
    if (!args.join(' ').split('|')[0]) return message.reply("You have to name the tag!");
    if (!args.join(' ').split('|')[1]) return message.reply("You have to supply the text for the tag!");
    
    if (!client.tags.has(message.guild.id)) client.tags.set(message.guild.id, {});
    if (!client.tags.has(message.guild.id, args.join(' ').split('|')[0])) return message.reply("That's not a tag!");
    client.tags.set(message.guild.id, {
      name: args.join(' ').split('|')[0],
      text: args.join(' ').split('|')[1]
    }, args.join(' ').split('|')[0]);
    
    msg.edit("Tag edited with the ID of " + message.id + "!");
  } catch (err) {
    message.channel.send("There was an error!\n" + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ['etag'],
  guildOnly: false,
  permLevel: 'Administrator'
};

exports.help = {
  name: 'edittag',
  category: 'General',
  description: "Edits a tag.",
  usage: 'edittag trigger|text'
};
