const Discord = require('discord.js');

exports.run = async (client, message, args, level) => {
  try {
    message.channel.send(new Discord.Attachment('https://cdn.discordapp.com/emojis/230989718471442432.png'));
  } catch (err) {
    message.channel.send('There was an error!\n' + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: [],
  guildOnly: false,
  permLevel: 'User'
};

exports.help = {
  name: 'rip',
  category: 'Fun',
  description: 'Returns a RIP Image',
  usage: 'rip'
};
