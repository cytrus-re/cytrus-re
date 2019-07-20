exports.run = async (client, message, args, level) => {
  try {
    message.channel.send('Cytrus runs on ' + Object.keys(require('../package').dependencies).length + ' dependencies!');
  } catch (err) {
    message.channel.send('There was an error!\n' + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ['modules'],
  guildOnly: false,
  permLevel: 'User'
};

exports.help = {
  name: 'dependencies',
  category: 'System',
  description: 'Returns the amount of dependencies Cytrus uses.',
  usage: 'dependencies'
};
