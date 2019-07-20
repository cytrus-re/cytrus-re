exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  try {
    if (client.liusers.has(message.author.id)) {
      client.logger.log(message.author.id + ' | ' + args.join(' '), 'user');
      message.channel.send('Message sent to the Cytrus Logs!');
    } else message.reply('You are not logged in! (Use profile login to login)');
  } catch (err) {
    message.channel.send('There was an error!\n' + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ['logsend'],
  guildOnly: false,
  permLevel: 'User'
};

exports.help = {
  name: 'log',
  category: 'General',
  description: 'Sends a message to the CytrusLog',
  usage: 'log'
};
