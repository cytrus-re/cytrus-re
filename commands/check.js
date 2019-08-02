const Discord = require('discord.js');

exports.run = async (client, message, args, level) => {
  try {
    let members = [];
    const settings = client.getSettings(message.guild.id);
    
    let msg = await message.channel.send('Checking members...');
    message.guild.members.forEach(async (member) => {
      if (client.config.globalBan.includes(member.id)) members.push(member.id);
    });
    
    if (!members[0]) msg.edit('The server is all clean!');
    else {
      let toban = await client.awaitReply(message, 'I found ' + members.length + ' members on the Global Ban List. Do you want to ban them? (Reply with yes or no)');
      
      if (['y', 'yes', 'true', 'mhm', ‘yep’].includes(toban)) {
        let banmsg = await message.channel.send('Banning members...');
        members.forEach(async (id) => {
          message.guild.members.find(member => member.id == id).ban('Detected by Cytrus Global Ban List').then(() => {
            const modLogChannel = settings.modLogChannel;
            if (modLogChannel && message.guild.channels.find(c => c.name === settings.modLogChannel)) {
              let embed = new Discord.RichEmbed()
              .setTitle('User Ban')
              .setColor('#eeeeee')
              .setDescription(`ID: ${id}\nReason: Detected by the Cytrus Global Ban List\nModerator: ${message.author.username}`);

              message.guild.channels.find(c => c.name === settings.modLogChannel).send(embed);
            }
          }).catch(err => {
            message.reply('Unable to ban a user with the ID of ' + id);
          });
        });
        
        banmsg.edit("I've banned all the users on the Global Ban List!");
      } else message.reply('OK! Aborting...');
    }
  } catch (err) {
    message.channel.send('There was an error!\n' + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: [],
  guildOnly: true,
  permLevel: 'Administrator'
};

exports.help = {
  name: 'check',
  category: 'Moderation',
  description: 'Checks if anyone in your server is on the Cytrus Global Ban List.',
  usage: 'check [ban]'
};
