const Discord = require("discord.js");

exports.run = async (client, message, args, level) => {
  try {
    const user = args[0];
    const settings = client.getSettings(message.guild.id);

    if (user) {
        message.guild.members.unban(args.slice(1).join(" ")).then(() => {
          message.channel.send(`Successfully unbanned ${user.tag}!`);

          const modLogChannel = settings.modLogChannel;
          if (modLogChannel && message.guild.channels.find(c => c.name === settings.modLogChannel)) {
            let embed = new Discord.MessageEmbed()
            .setTitle("User Unbanned")
            .setColor("#eeeeee")
            .setDescription(`Reason: ${args.slice(1).join(" ")}\nModerator: ${message.author.username}`);

            message.guild.channels.find(c => c.name === settings.modLogChannel).send(embed);
          }
        }).catch(err => {
         message.reply("I was unable to unban the member!");
        });
    } else {
      message.reply("You didn't specify the user to unban!");
    }
  } catch (err) {
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
  name: "unban",
  category: "Moderation",
  description: "Unbans a member.",
  usage: "unban <userid> [reason]"
};
