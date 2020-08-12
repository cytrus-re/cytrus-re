exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  try {
    if (!args[0]) message.reply('You need to input the message to spacify!');
    message.channel.send(args.join(' ').split('').join(' '));
  } catch (err) {
    message.channel.send(client.errors.genericError + err).catch();
  }
};

exports.conf = {
  enabled: false,
  aliases: ["aestheticify"],
  guildOnly: false,
  permLevel: 'User'
};

// Mr Ed can you pls patch this?

exports.help = {
  name: 'spacify',
  category: 'Fun',
  description: 'Spacifies your message',
  usage: 'spacify <message>'
};
