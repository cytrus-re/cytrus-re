exports.run = async (client, message, args, level) => {
  try {
    const wUser = message.mentions.users.first();
    const settings = client.getSettings(message.guild.id);
    const modLogChannel = settings.modLogChannel;

    if (wUser) {
      const member = message.guild.member(wUser);
      if (member) {
        if (!client.warns.get(message.guild.id)) client.warns.set(message.guild.id, {});
        if (!client.warns.get(message.guild.id)[member.id]) client.warns.get(message.guild.id)[member.id] = 0;

        client.warns.get(message.guild.id)[member.id] += 1;
        message.channel.send(`Successfully warned ${wUser.tag}!`);

        
        if (modLogChannel && message.guild.channels.find(c => c.name === settings.modLogChannel)) {
          let embed = new client.Embed("normal", {
            color: 0xeeeeee,
            title: "User Warned",
            description: `Name: ${wUser.username}\nID: ${wUser.id}\nModerator: ${message.author.username}`,
            footer: { text: `${client.config.botName}` },
          });
          message.guild.channels.find(c => c.name === settings.modLogChannel).send(embed);
          
          wUser.send(`You have been warned in ${message.guild.name}.`);
        }

        if (client.warns.get(message.guild.id)[member.id] == 3) {
          member.ban(args.slice(1).join(" ")).then(() => {
            message.channel.send(`Successfully banned ${wUser.tag}!`);

            client.warns.get(message.guild.id)[member.id] = 0;
          }).catch(err => {
            message.channel.send(`I was unable to ban ${wUser.tag} for exceeding ${client.config.maxWarns} warns!`);
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
  permLevel: "Moderator"
};

exports.help = {
  name: "warn",
  category: "Moderation",
  description: "Warns a member.",
  usage: "warn <user> [reason]"
};
