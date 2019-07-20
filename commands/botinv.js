exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  try {
    client.generateInvite(['ADMINISTRATOR']).then(link => message.channel.send('Bot Invite: ' + link));
  } catch (err) {
    message.channel.send('There was an error!\n' + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ['ri', 'botinvite', 'bi', 'returninvite','cyinv'],
  guildOnly: true,
  permLevel: 'User'
};

exports.help = {
  name: 'botinv',
  category: 'General',
  description: 'Gives the invite link for Cytrus.',
  usage: 'botinv'
};
