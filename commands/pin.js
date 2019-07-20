exports.run = async (client, message, args, level) => {
  try {
    message.channel.fetchMessages({limit: 2}).then(async messages => {
      if (!Array.from(messages.keys())[1]) return message.reply('You have to send a message.');
      let msg = messages.get(Array.from(messages.keys())[1]);
      msg.pin().catch(() => {
        return message.reply('There was an error!');
      });
      message.channel.send('I\'ve pinned the message!');
    });
  } catch (err) {
    message.channel.send('There was an error!\n' + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: [],
  guildOnly: false,
  permLevel: 'Moderator'
};

exports.help = {
  name: 'pin',
  category: 'Moderation',
  description: 'Pins the last message sent in the channel.',
  usage: 'pin'
};
