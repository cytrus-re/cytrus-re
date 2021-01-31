exports.run = async (client, message, args, level) => {
  try {
    client.startSendingErrorToLoggingChannel();
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
  enabled: false, // You all know why I did this.
  aliases: ["rep" , "echo"],
  guildOnly: true,
  permLevel: "Server Owner",
  archived: true
};

exports.help = {
  name: "say",
  category: "General",
  description: "Returns the text you provide.",
  usage: "say <text>"
};
