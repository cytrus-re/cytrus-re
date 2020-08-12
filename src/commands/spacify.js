exports.run = async (client, message, args, level) => {
  try {
    if (!args[0]) message.reply('You need to input the message to spacify!');
    message.channel.send(args.join(' ').split('').join(' '));
  } catch (err) {
    message.channel.send('There was an error!\n' + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ["aestheticify"],
  guildOnly: false,
  permLevel: 'User'
};

exports.help = {
  name: 'spacify',
  category: 'Fun',
  description: 'Spacifies your message',
  usage: 'spacify <message>'
};
