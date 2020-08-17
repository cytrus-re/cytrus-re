exports.run = async (client, message, args, level) => {
  try {
    if (!args[0]) return message.reply("You need to give the channel name!");
    if (!args[1]) return message.reply("You need to give the text to say!");
    
    message.delete();
    const str = args.slice(1).join(" ");
    if (!message.guild.channels.find(c => c.name == args[0])) return message.reply("I can't find that channel!");
    message.guild.channels.find(c => c.name == args[0]).send(str);
  } catch (err) {
    message.channel.send("There was an error!\n" + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ["tcs", "tcsay"],
  guildOnly: true,
  permLevel: "Bot Developer"
};

exports.help = {
  name: "tochannelsay",
  category: "General",
  description: "Says the string you give in the specified channel.",
  usage: "tochannelsay <channel name> <text>"
};
