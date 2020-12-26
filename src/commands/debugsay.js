exports.run = async (client, message, args) => {
    try {
      message.delete().catch();
      const mg = args.join(" ");
      if (mg == '@everyone', '@here') {
        message.delete().catch();
        message.channel.send("Function2 read");
        message.channel.send("Nice try!");
        return; 
      }
      else {
        message.channel.send("Function potentially skipped");
        message.channel.send(mg);
      }
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
  