const Discord = require('discord.js'); // Not sure if we really need this, since D.JS  is included in the client, but better safe than sorry.

exports.run = async (client, message, args, level) => {
  try {
    const user = message.mentions.users.first();
    const settings = client.getSettings(message.guild.id); // Gets the guild's CyRE settings to check if the modlog feature is enabled (and if it is, what channel to send them to.)
    
    if (user === message.author) message.channel.send("You can't ban yourself!");
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member.ban(args.slice(1).join(' ')).then(() => {
          message.channel.send("Successfully banned ${user.tag}!");

          const modLogChannel = settings.modLogChannel;
          if (modLogChannel && message.guild.channels.find(c => c.name === settings.modLogChannel)) { // Checks if the modlog is enabled and the channel specified for it exists.
            let embed = new Discord.RichEmbed()
            .setTitle("User Banned")
            .setColor("#eeeeee")
            .setDescription(`Name: ${user.username}\nID: ${user.id}\nReason: ${args.slice(1).join(" ")}\nModerator: ${message.author.username}`);

            message.guild.channels.find(c => c.name === settings.modLogChannel).send(embed);
          }
        }).catch(err => { // if banning failed for whatever reason, then:
         message.channel.send("I was unable to ban the user!");
        });
      } else { // if the user isn't in the guild, then:
        message.channel.send("That user isn't in this guild!");
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
  permLevel: "Moderator"
};

exports.help = {
  name: "ban",
  category: "Moderation",
  description: "Bans the specified user.",
  usage: "ban @<user> [reason]"
};
