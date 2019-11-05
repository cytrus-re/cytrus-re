const Discord = require('discord.js');

exports.run = async (client, message, args, level) => {
  try {
    const settings = client.getSettings(message.guild.id);
    const user = message.mentions.users.first();
    
    if (!message.guild.roles.find(r => r.name == args.slice(1).join(' '))) return message.reply('That\'s not a role!');
    if (user) {
      if (message.guild.members.get(message.author.id).highestRole.name == '@everyone') message.reply('The role you are trying to add is above your highest role\'s position!');
      else {
        if (Number(message.member.highestRole.position) >= Number(message.guild.roles.find(r => r.name == args.slice(1).join(' ')).position)) {
          if (message.member.hasPermission('MANAGE_ROLES')) {
              const member = message.guild.member(user);
              if (member) {
                if (message.guild.roles.find(r => r.name == args.slice(1).join(' '))) {
                  member.addRole(message.guild.roles.find(r => r.name == args.slice(1).join(' '))).then(() => {
                    message.reply(`Successfully added Role to ${user.tag}`);

                    const modLogChannel = settings.modLogChannel;
                    if (modLogChannel && message.guild.channels.find(c => c.name === settings.modLogChannel)) {
                      let embed = new Discord.RichEmbed()
                      .setTitle('Add Role')
                      .setColor('#eeeeee')
                      .setDescription(`Name: ${user.username}\nID: ${user.id}\nModerator: ${message.author.username}`);

                      message.guild.channels.find(c => c.name === settings.modLogChannel).send(embed);
                    }
                  }).catch('There was an error!');
                } else message.reply('I can\'t find that role!');
              } else message.reply('That user isn\'t in this guild!');
          } else message.reply('You don\'t have the Manage Roles permission!');
        } else message.reply('The role you are trying to add is above your highest role\'s position!');
      }
    } else message.reply('You didn\'t mention the user to add the role to!');
  } catch (err) {
    message.channel.send(client.errors.genericError + err.stack).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ['arole', 'radd'],
  guildOnly: true,
  permLevel: 'Administrator'
};

exports.help = {
  name: 'addrole',
  category: 'Moderation',
  description: 'Adds the specified role to the specified user.',
  usage: 'addrole <user> <role name/id>'
};
