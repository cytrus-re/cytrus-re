exports.run = async (client, message, args, level) => {
  try {
      if (!args[0]) return message.reply('You need to give the message ID!');
    
      let msg = messages.get(args[0]);
      if (!message.channel.fetchMessage(args[0])) message.reply('That message does not exist!');
      
      msg.pin().catch(() => {
        return message.reply('There was an error!');
      });
      message.channel.send('I\'ve unpinned the message!');
  } catch (err) {
    message.channel.send('There was an error!\n' + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ['upin'],
  guildOnly: false,
  permLevel: 'Moderator'
};

exports.help = {
  name: 'unpin',
  category: 'Moderation',
  description: 'Unpins the specified message.',
  usage: 'unpin <id>'
};
