const Discord = require("discord.js");

exports.run = async (client, message, args) => { 
  try {
    if (!args.join(" ")) return message.channel.send("You need to give me a question!");
    
    let pollEmbed = new Discord.MessageEmbed()
    .setTitle(args.join(" "))
    .setDescription("Poll created by " + message.author.tag)
    .setColor("#eeeeee");

    let msg = await message.channel.send(pollEmbed);
    
    await msg.react("👍");
    await msg.react("👎");
    await msg.react("🤷");
  } catch (err) {
    message.channel.send(client.errors.genericError + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ["vote", "ask"],
  guildOnly: false,
  permLevel: "User"
};

exports.help = {
  name: "poll",
  category: "General",
  description: "Starts a poll.",
  usage: "poll <question>"
};
