exports.run = async (client, message, args, level) => {
  try {
    message.delete().catch();
    const mg = args.join(" ");
    if (message.mentions.everyone) {
      message.channel.send(client.errors.cannotPingEveryone); 
      message.delete().catch();
      return; //send error and return early if the message includes mentions.
    }
    message.channel.send(mg);
  } catch (err) {
    message.channel.send(client.errors.genericError + err).catch();
  }
};

exports.conf = {
  enabled: true, // You all know why I did this.
  aliases: ["rep", "echo"],
  guildOnly: true,
  permLevel: "Server Owner",
};

exports.help = {
  name: "say",
  category: "General",
  description: "Returns the text you provide.",
  usage: "say <text>"
};
