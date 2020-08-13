const Discord = require('discord.js');

module.exports = (client, member) => {
  if (member.guild.id == '379818272230473729') {
    if (member.user.createdTimestamp < 2592000003) member.kick('Account under 1 month old.');
  }
  
  let settings = client.getSettings(member.guild.id);

  if (settings.welcomeEnabled !== 'true') return;

  let welcomeMessage = settings.welcomeMessage.replace('{{user}}', member.user.tag).replace('{{ping}}', '<@' + member.user.id + '>');
  
  if (settings.welcomeMessage && member.guild.channels.cache.find(c => c.name == settings.welcomeChannel)) {
    member.guild.channels.find(c => c.name == settings.welcomeChannel).send(welcomeMessage).catch();
  }

  if (client.config.globalBan.includes(member.id)) {
    member.ban('Detected by the Cytrus-RE global ban system').then(async () => {
      let modLogChannel = settings.modLogChannel;
        
      if (modLogChannel) {
        let embed = new Discord.RichEmbed()
        .setTitle('User Ban')
        .setColor('#eeeeee')
        .setDescription(`Name: ${member.username}\nID: ${member.id}\nReason: Detected by Cytrus GlobalBanSystem`);

        await member.guild.channels.find(c => c.name === settings.modLogChannel).send(embed).catch();
      }
    }).catch();
  }
};
