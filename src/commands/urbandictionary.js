const ud = require('urban-dictionary');
const Discord = require('discord.js');

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  try {
    if (!message.channel.nsfw) return message.reply('You need to be in a channel marked as NSFW to use this command!');
    
    ud.term(args.join(' ')).then(async (result) => {
      if (!args[0]) return message.channel.send('You need to provide a search term!');
      let output = '';
      let entries = result.entries;
      let i = 1;
      
      if (entries == []) return message.channel.send("I didn't find any results for " + args.join(' ') + ".");
      
      Object.keys(entries).forEach(async (pageID) => {
        output += '\n' + i + '. ' + entries[pageID].word;
        i++;
      });
      
      let page = await client.awaitReply(message, 'Please choose the page you want:\n${output}');
      
      if (isNaN(page)) return message.reply(page + ' is not a number!');
      
      let embed = new Discord.RichEmbed()
      .setTitle(entries[page - 1].word)
      .setDescription('Definition:\n' + entries[page - 1].definition + '\n\nExample:\n' + entries[page - 1].example)
      .setFooter('Requested by ' + message.author.tag)
      .setColor('#eeeeee');

      message.channel.send(embed).catch(err => message.channel.send('The definition was too big or there was another error!\n\n' + err));
    });
  } catch (err) {
    message.channel.send('There was an error!\n' + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ['urban', 'ud'],
  guildOnly: false,
  permLevel: 'User'
};

exports.help = {
  name: 'urbandictionary',
  category: 'General',
  description: 'Searches the Urban Dictionary for you.',
  usage: 'urbandictionary <term>'
};
