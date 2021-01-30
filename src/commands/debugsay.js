exports.run = async (client, message, args) => {
    try {
      message.delete().catch();
      const mg = args.join(" ");
      if (mg === '@everyone', '@here') {
        message.delete().catch();
        message.channel.send("Function2 read");
        message.channel.send("Nice try!");
        return; 
      };
        message.channel.send(mg);
    } catch (err) {
      message.channel.send(client.errors.genericError + err).catch();
    }
  };
  
  exports.conf = {
    enabled: true, 
    aliases: [],
    guildOnly: true,
    permLevel: "Server Owner",
    archived: false,
    broken: false
  };
  
  exports.help = {
    name: "debugsay",
    category: "Testing",
    description: "Returns the text you provide, but a debug mode",
    usage: "debugsay <text>"
  };
  
