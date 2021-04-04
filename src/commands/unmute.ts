const Discord = require("discord.js");

exports.run = async (client, message, args, level) => {
  try {
    const user = message.mentions.users.first();
    const settings = client.getSettings(message.guild.id);

    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member.roles
          .remove(
            message.guild.roles.cache.find((r) => r.name == settings.muteRole)
          )
          .then(() => {
            message.channel.send(`**Successfully unmuted ${user.tag},**`);

            const modLogChannel = settings.modLogChannel;
            if (
              modLogChannel &&
              message.guild.channels.find(
                (c) => c.name === settings.modLogChannel
              )
            ) {
              let embed = new Discord.MessageEmbed()
                .setTitle("User Unmute")
                .setColor("#eeeeee")
                .setDescription(
                  `Name: ${user.username}\nID: ${user.id}\nModerator: ${message.author.username}`
                );

              message.guild.channels
                .find((c) => c.name === settings.modLogChannel)
                .send(embed)
                .catch(console.error);
            }
          })
          .catch((err) => {
            message.reply("I was unable to unmute the member");
          });
      } else {
        message.reply("That user isn't in this guild!");
      }
    } else {
      message.reply("You didn't mention the user to unmute!");
    }
  } catch (err) {
    message.channel.send(client.errors.genericError + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ["um"],
  guildOnly: true,
  permLevel: "Moderator",
};

exports.help = {
  name: "unmute",
  category: "Moderation",
  description: "Unmutes a member.",
  usage: "unmute @<user>",
};
