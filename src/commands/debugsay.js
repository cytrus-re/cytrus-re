exports.run = async (client, message, args, level) => {
    try {
      message.delete().catch();
      const mg = args.join(" ");
      if (message.mentions.everyone) {
        message.channel.send("Function read");
        message.channel.send(client.errors.cannotPingEveryone); 
        message.delete().catch();
        return; //send error and return early if the message includes mentions.
      }
      message.channel.send("Function potentially skipped");
      message.channel.send(mg);
    } catch (err) {
      message.channel.send(client.errors.genericError + err).catch();
    }
  };
  
  exports.conf = {
    enabled: true, 
    aliases: ["rep"],
    guildOnly: true,
    permLevel: "Server Owner",
    archived: false,
    broken: false
  };
  
  exports.help = {
    name: "debugsay",
    category: "testing",
    description: "Returns the text you provide, but a debug mode",
    usage: "debugsay <text>"
  };
  