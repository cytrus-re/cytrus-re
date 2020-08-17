const Discord = require("discord.js");

exports.run = async (client, message, args, level) => {
  try {
    const user = message.mentions.users.first();
    const settings = client.getSettings(message.guild.id);

    if (user) {
      const member = message.guild.member(user);
      if (member) {
        if (!message.guild.roles.find(r => r.name == settings.muteRole)) {
          message.guild.createRole({
            name: settings.muteRole || "CytrusMute",
            color: "#eeeeee",
            permissions: ["READ_MESSAGES"]
          }).catch();
        }
        
        
        member.addRole(message.guild.roles.find(r => r.name == settings.muteRole)).then(async () => {
          message.reply(`**Successfully muted ${user.tag}**`);

          const modLogChannel = settings.modLogChannel;
          if (modLogChannel && message.guild.channels.find(c => c.name === settings.modLogChannel)) {
            let embed = new Discord.RichEmbed()
            .setTitle("User Mute")
            .setColor("#eeeeee")
            .setDescription(`Name: ${user.username}\nID: ${user.id}\nModerator: ${message.author.username}`);

            message.guild.channels.find(c => c.name === settings.modLogChannel).send(embed).catch(console.error);
          }
        }).catch(err => {
          message.reply("I wasn't to mute this user.\n" + err);
        });
      } else {
        message.reply("That user isn't in this guild!");
      }
    } else {
      message.reply("You didn't mention the user to mute!");
    }
  } catch (err) {
    message.channel.send("There was an error!\n" + err.stack).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ["m"],
  guildOnly: true,
  permLevel: "Moderator"
};

exports.help = {
  name: "mute",
  category: "Moderation",
  description: "Mutes the specified user.",
  usage: "mute @<user>"
};
