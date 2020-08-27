exports.run = async (client, message, args, level) => {
  if (message.mentions.everyone) return message.send(client.errors.cannotSayEveryone); //return early if the message includes mentions.
  try {
    message.delete().catch();
    const mg = args.join(" ");
    message.channel.send(mg);
  } catch (err) {
    message.channel.send(client.errors.genericError + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ["rep"],
  guildOnly: true,
  permLevel: "Bot Helper"
};

exports.help = {
  name: "say",
  category: "General",
  description: "Returns the text you provide.",
  usage: "say <text>"
};
