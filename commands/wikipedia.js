const Discord = require('discord.js');
const wikipedia = require('wikipediajs');

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  try {
    wikipedia.search(args.join(' ')).then(async (res) => {
      let output = '';
      let i = 1;
      
      Object.keys(res.query.pages).forEach(async (page) => {
        output += '\n' + i + '. ' + res.query.pages[page].title;
        i++;
      });
      
      let page = await client.awaitReply(message, `Please choose the page you want.\n${output}`);
      
      if (isNaN(page)) return message.reply(page + ' is not a number!');
      let info = res.query.pages[Object.keys(res.query.pages)[page - 1]]
      let embed = new Discord.RichEmbed()
      .setTitle('Wikipedia')
      .setDescription('['+info.title+']('+info.fullurl.replace('(', '\\(').replace(')', '\\)').replace('`', '\`')+')')
      .setColor('#eeeeee');

      message.channel.send(embed);
    });
  } catch (err) {
    message.channel.send('There was an error!\n' + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ['wiki'],
  guildOnly: false,
  permLevel: 'User'
};

exports.help = {
  name: 'wikipedia',
  category: 'General',
  description: 'Searches Wikipedia for your search term',
  usage: 'wikipedia <search term>'
};
