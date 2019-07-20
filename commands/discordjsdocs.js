const request = require('request');

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  try {
    if (!args[0]) return message.reply('You need to give something to search!');
    
    request({url: 'https://djsdocs.sorta.moe/main/stable/embed?q=' + encodeURIComponent(args.join(' ')), json: true}, (req, res, json) => {
      message.channel.send({embed: json});
    });
  } catch (err) {
    message.channel.send('There was an error!\n' + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ['djs', 'djsdocs'],
  guildOnly: false,
  permLevel: 'User'
};

exports.help = {
  name: 'discordjsdocs',
  category: 'General',
  description: 'Searches the Discord.js docs for your search term.',
  usage: 'discordjsdocs <query>'
};
