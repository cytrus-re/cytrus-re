exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    try {
        // This code is GARBAGE. We could make it much better if we just read the copypastas from a file and caching it
        if (args[0] == "genericError")
            message.channel.send(client.errors.genericError);
        if (args[0] == "wiiError")
            message.channel.send(client.errors.wiiError);
        if (args[0] == "userNotInGuild")
            message.channel.send(client.errors.userNotInGuild);
        if (args[0] == "cannotBanSelf")
            message.channel.send(client.errors.cannotBanSelf);
        if (args[0] == "noResults")
            message.channel.send(client.errors.noResults);
        if (args[0] == "noArticleDescription")
            message.channel.send(client.errors.noArticleDescription);
    } catch (err) {
      message.channel.send("Ok, something wrong actually happened with this command.\n" + err).catch();
    }
  };
  
  //permissions and aliases
  
  exports.conf = {
    enabled: true,
    aliases: ["testerrmsg"],
    guildOnly: false,
    permLevel: "Bot Dev"
  };
  
  
  //what the command does
  
  exports.help = {
    name: "testerrormessage",
    category: "System",
    description: "Test out error messages if they look good or things",
    usage: "testerrormessage (errorname)"
  };
