const Discord = require('discord.js');

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  try {
    const embed = new Discord.RichEmbed()
    .setColor('#eeeeee')
    .setTitle('Cytrus Rewrite Github')
    .setFooter('Made by CelestialCrafter#6830 and EnderGirlGamer#5370, Rewritten by EDGE#9573, Rexowogamer#1183, and Midou#9637')
    .setDescription(`Github: [Production Github](https://github.com/Rexogamer/cytrus)
Website: [Website](https://cytrus.ga)
API: [API](https://api.cytrus.ga/api)
Support Server: [Server](https://discord.gg/4WgsA2q)
Issues: [Github](https://github.com/Rexogamer/cytrus/issues)
Version: RexoV1.0`);

    message.channel.send(embed);
  } catch (err) {
    message.channel.send('There was an error!\n' + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ['i'],
  guildOnly: false,
  permLevel: 'User'
};

exports.help = {
  name: 'info',
  category: 'General',
  description: 'Returns info about Cytrus.',
  usage: 'info'
};
