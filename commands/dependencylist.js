const Discord = require('discord.js');

exports.run = async (client, message, args, level) => {
  try {
    let output = '';
    Object.keys(require('../package').dependencies).forEach((pack) => output += pack + '\n');
    
    let embed = new Discord.RichEmbed()
    .setColor('#363942')
    .setThumbnail(client.user.avatarURL)
    .setDescription(output)
    
    message.channel.send(embed);
  } catch (err) {
    message.channel.send('There was an error!\n' + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ['modulelist', 'packagelist', 'pl', 'dl', 'ml'],
  guildOnly: false,
  permLevel: 'User'
};

exports.help = {
  name: 'dependencylist',
  category: 'System',
  description: 'Returns a list of dependencies that Cytrus uses.',
  usage: 'dependencylist'
};
