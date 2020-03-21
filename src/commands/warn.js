const Discord = require('discord.js');

exports.run = async (client, message, args, level) => {
  try {
    const user = message.mentions.users.first();
    const settings = client.getSettings(message.guild.id);

    if (user) {
      const member = message.guild.member(user);
      if (member) {
        if (!client.warns.get(message.guild.id)) client.warns.set(message.guild.id, {});
        if (!client.warns.get(message.guild.id)[member.id]) client.warns.get(message.guild.id)[member.id] = 0;

        client.warns.get(message.guild.id)[member.id] += 1;
        message.reply(`Successfully warned ${user.tag}`);

        const modLogChannel = settings.modLogChannel;
        if (modLogChannel && message.guild.channels.find(c => c.name === settings.modLogChannel)) {
          let embed = {
            color: 0xeeeeee,
            title: "User Warned",
            description: `Name: ${user.username}\nID: ${user.id}\nModerator: ${message.author.username}`,
            footer: { text: `${client.config.botName}` },
          };
          message.guild.channels.find(c => c.name === settings.modLogChannel).send(embed);
        }

        if (client.warns.get(message.guild.id)[member.id] == 3) {
          member.ban(args.slice(1).join(' ')).then(() => {
            message.channel.send(`Successfully banned ${user.tag}!`);

            client.warns.get(message.guild.id)[member.id] = 0;
          }).catch(err => {
            message.send(`I was unable to ban ${user.tag} for exceeding {client.config.maxWarns} warns!`);
          });
        }
      } else {
        message.reply(client.errors.userNotInGuild);
      }
    } else {
      message.reply("You didn't mention the user to warn!");
    }
  } catch (err) {
    message.channel.send(client.errors.genericError + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: [],
  guildOnly: true,
  permLevel: 'Moderator'
};

exports.help = {
  name: 'warn',
  category: 'Moderation',
  description: 'Warns a member.',
  usage: 'warn <user> [reason]'
};
