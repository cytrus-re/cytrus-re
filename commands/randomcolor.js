const Discord = require('discord.js');

exports.run = async (client, message, args, level) => {
  try {
    let hex = Math.random().toString(16).slice(2, 8).toUpperCase().slice(-6);
    
    let embed = new Discord.RichEmbed()
    .setColor(hex)
    .setDescription('Random HEX Code: #' + hex)
    .setTitle('#' + hex);
    
    message.channel.send(embed);
  } catch (err) {
    message.channel.send('Their was an error!\n' + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ['color'],
  guildOnly: false,
  permLevel: 'User'
};

exports.help = {
  name: 'randomcolor',
  category: 'Fun',
  description: 'Returns a random HEX code',
  usage: 'randomcolor'
};
