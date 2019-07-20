exports.run = async (client, message, args, level) => {
  try {
    let number = Math.floor(Math.random() * 10000000000001);
    
    message.channel.send('Random Number: ' + number);
  } catch (err) {
    message.channel.send('Their was an error!\n' + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ['num', 'number'],
  guildOnly: false,
  permLevel: 'User'
};

exports.help = {
  name: 'randomnumber',
  category: 'Fun',
  description: 'Returns a random number from 0 to 10000000000000',
  usage: 'randomnumber'
};
