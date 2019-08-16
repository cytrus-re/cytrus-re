exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  try {
   let log = 'RexoV1.0:\n' + 'Removed a bunch of unused/garbage commands.\n' + 'More grammar fixes (thanks Rexo and EDGE!)\n' + 'Coming soon: ???';
   require('../modules/changelog').forEach((change) => log += '\n- ' + change);
  
   message.channel.send(log);
  } catch (err) {
   message.channel.send('There was an error!\n' + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ['changes', 'updates'],
  guildOnly: false,
  permLevel: 'User'
};

exports.help = {
  name: 'changelog',
  category: 'Utility',
  description: 'Returns the latest changelog for Cytrus.',
  usage: 'changelog'
};
