exports.run = async (client, message, args) => {
  try {
    const user = message.mentions.users.first();
    const settings = client.getSettings(message.guild.id); // Gets the guild's CyRE settings to check if the modlog feature is enabled (and if it is, what channel to send them to.)
    
    if (user === message.author) return message.channel.send(client.errors.cannotBanSelf);
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member.ban(args.slice(1).join(" ")).then(() => {
          message.channel.send(`Successfully banned ${user.tag}!`);

          const modLogChannel = settings.modLogChannel;
          if (modLogChannel && message.guild.channels.find(c => c.name === settings.modLogChannel)) { // Checks if the modlog is enabled and the channel specified for it exists.
            message.guild.channels.find(c => c.name === settings.modLogChannel).send({ embed: { color: "#eeeeee", title: "User Banned", description: `Name: ${user.username}\nID: ${user.id}\nReason: ${args.slice(1).join(" ")}\nModerator: ${message.author.username}` } });
          }
        }).catch(err => { // if banning failed for whatever reason, then:
          message.channel.send("I was unable to ban the user!");
          console.log(err);
        });
      } else { // if the user isn't in the guild, then:
        message.channel.send(client.errors.userNotInGuild);
      }
    } else { // if they didn't specify a user/did it incorrectly, then:
      message.channel.send("You didn't mention the user you want to ban!");
    }
  } catch (err) { // if something else broke, then:
    message.channel.send(client.errors.genericError + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ["b"],
  guildOnly: true,
  permLevel: "Administrator"
};

exports.help = {
  name: "ban",
  category: "Moderation",
  description: "Bans the specified user.",
  usage: "ban @<user> [reason]"
};
