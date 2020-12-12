exports.run = async (client, message, args, level) => { 
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
      message.channel.send("Okay, something actually went wrong with this command.\n" + err).catch();
    }
  };
  
  //permissions and aliases
  
  exports.conf = {
    enabled: true,
    aliases: ["testerrmsg", "terr"],
    guildOnly: false,
    permLevel: "Bot Dev"
  };
  
  
  //what the command does
  
  exports.help = {
    name: "testerrormessage",
    category: "Testing",
    description: "Test out error messages to see if they look good and stuff",
    usage: "testerrormessage (errorname)"
  };
