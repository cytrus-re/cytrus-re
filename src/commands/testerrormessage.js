exports.run = async (client, message, args, level) => { 
    try {
      let errorarg = [args[0]];
      message.channel.send(client.errors.${errorarg});
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
