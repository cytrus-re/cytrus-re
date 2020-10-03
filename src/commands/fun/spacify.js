exports.run = async (client, message, args, level) => { 
  try {
    if (!args[0]) message.channel.send("You need to provide a message to spacify!");
    message.channel.send(args.join(" ").split("").join(" "));
  } catch (err) {
    message.channel.send(client.errors.genericError + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ["aestheticify", "vaporwaveify"],
  guildOnly: false,
  permLevel: "User"
};

exports.help = {
  name: "spacify",
  category: "Fun",
  description: "Spacifies your message",
  usage: "spacify <message>"
};
