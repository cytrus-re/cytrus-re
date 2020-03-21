//https://cdn.discordapp.com/emojis/id.png
const { Attachment } = require('discord.js');

exports.run = async (client, message, args, level) => {
  try {
    let id = /[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]/.exec(args[1]);
    
    if (!id) return message.reply("You didn't input a valid emoji or it is a default Discord emote!");
    switch (args[0]) {
      case 'animated':
        message.channel.send(new Attachment('https://cdn.discordapp.com/emojis/' + id + '.gif'));
        break;
      case 'static':
        message.channel.send(new Attachment('https://cdn.discordapp.com/emojis/' + id + '.png'));
        break;
      default:
        message.reply("You need to say what type of emoji it is!");
        break;
    }
  } catch (err) {
    message.channel.send(client.errors.genericError + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ['emoteimage', 'ei', 'eimage', 'emojii', 'emotei'],
  guildOnly: false,
  permLevel: 'User'
};

exports.help = {
  name: 'emojiimage',
  category: 'Fun',
  description: "Returns the image of the specified emoji",
  usage: 'emojiimage <static/animated> <emoji>'
};
