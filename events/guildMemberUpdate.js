const Discord = require('discord.js');

module.exports = (client, user, userNew) => {
  let embed;
  let settings = client.getSettings(user.guild.id);
  
  if (!settings.logMemberUpdates == true) return;
  if (!settings.modLogChannel) return;
  if (!user.guild.channels.find(c => c.name == settings.modLogChannel)) return;
  
  let modLogChannel = user.guild.channels.cache.find(c => c.name == settings.modLogChannel);
  
  if (user.nickname !== userNew.nickname) {
    embed = new Discord.RichEmbed()
    .setTitle('User Nickname Update')
    .setColor('#eeeeee')
    .setFooter(`Full name: ${userNew.user.tag} | ID: ${userNew.id}`)
    .setDescription(`Old User:
•Nickname: ${user.nickname}
New User:
•Nickname: ${userNew.nickname}`);
    
    modLogChannel.send(embed).catch();
  }
  
  if (user.user.tag !== userNew.user.tag) {
     embed = new Discord.RichEmbed()
    .setTitle('User Full Name Update')
    .setColor('#eeeeee')
    .setFooter(`Full name: ${userNew.user.tag} | ID: ${userNew.id}`)
    .setDescription(`Old User:
•Full name ${user.user.tag}
New User:
•Full name: ${userNew.user.tag}`);
    
    modLogChannel.send(embed).catch();
  }

  if (user.roles !== userNew.roles) {
    let output = '';
    let outputNew = '';
    
    user.roles.forEach(role => {
      output += '\n' + role.name;
    });
    
    userNew.roles.forEach(role => {
      outputNew += '\n' + role.name;
    });
    
    if (output == outputNew) return;
    
    embed = new Discord.RichEmbed()
    .setTitle('User Roles Update')
    .setFooter(`Full name: ${userNew.user.tag} | ID: ${userNew.id}`)
    .setDescription(`
Old Roles${output}

New Roles${outputNew}`)
    .setColor('#eeeeee');
    
    modLogChannel.send(embed).catch();
  }
  
  if (user.user.avatarURL !== userNew.user.avatarURL) {
    embed = new Discord.RichEmbed()
    .setTitle('User Avatar Update')
    .setFooter(`Full name: ${userNew.user.tag} | ID: ${userNew.id}`)
    .setDescription(`
Old Avatar URL: ${user.user.avatarURL}

New Avatar URL: ${userNew.user.avatarURL}`)
    .setColor('#eeeeee');
    
    modLogChannel.send(embed).catch();
    modLogChannel.send(new Discord.Attachment(user.user.avatarURL, 'old.png')).catch();
    modLogChannel.send(new Discord.Attachment(userNew.user.avatarURL, 'new.png')).catch();
  }
};
