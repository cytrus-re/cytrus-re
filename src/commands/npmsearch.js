const request = require('request');

exports.run = async (client, message, args, level) => {
  try {
    let output = '';
    let i = 1;
    if (!args[0]) return message.reply('You need to give me something to search!');
    
    request({url: 'https://api.npms.io/v2/search?q=' + encodeURIComponent(args.join(' ')), json: true}, async (req, res, json) => {
      if (json.results.length > 5) json.results.length = 5;
      
      json.results.forEach((module) => {
        output += '\n' + i + '. ' + module.package.name;
        i++;
      });
      
      let module = await client.awaitReply(message, "Please choose the module you want: ${output}");
      if (isNaN(module)) return message.reply("That's not a number!");
      
      let mnum = Number(module) - 1;
      let package = json.results[mnum].package;
      
      let embed = new client.Embed('blend', {
        title: package.name,
        description: package.description,
        url: package.links.npm,
        author: {
          name: package.publisher.username || 'None Specified'
        },
        fields: [
          {
            title: 'Version',
            text: package.version
          },
          {
            title: 'Keywords',
            text: package.keywords ? package.keywords.join(', ') : 'None'
          }
        ]
      });
      
      message.channel.send(embed);
    });
  } catch (err) {
    message.channel.send('There was an error!\n' + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ['npm'],
  guildOnly: false,
  permLevel: 'User'
};

exports.help = {
  name: 'npmsearch',
  category: 'General',
  description: 'Searches the Node Package Manager for you.',
  usage: 'npmsearch <query>'
};
