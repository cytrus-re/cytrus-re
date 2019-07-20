exports.run = async (client, message, args, level) => {
  try {
    if (!args[0]) return message.reply('You need to say something to Cytrus!');
    
    let msg = await message.reply('Processing message... (This may take a while!)');
    client.cleverbot.create(async (err, session) => {
      client.cleverbot.ask(args.join(' '), async (err, response) => {
        if (err) {
          message.channel.send('There was an error!').catch();
          return msg.delete();
        }
        msg.edit(response);
      });
    });
  } catch (err) {
    message.channel.send('There was an error!\n' + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ['ai', 'aichat'],
  guildOnly: false,
  permLevel: 'User'
};

exports.help = {
  name: 'chat',
  category: 'Fun',
  description: 'Uses AI to chat with you.',
  usage: 'chat <message>'
};
