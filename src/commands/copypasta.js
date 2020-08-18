exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    try {
        // This code is GARBAGE. We could make it much better if we just read the copypastas from a file and caching it
        if (args[0] == "interjection")
            message.channel.send("I'd just like to interject for a moment. \n What you're referring to as \'Linux', is in fact, GNU/Linux, or as I've recently taken to calling it, GNU + Linux. \n Linux is not an operating system unto itself, but rather another free component of a fully functioning GNU system made useful by the GNU corelibs, shell utilities and vital system components compromising a full OS as defined by POSIX. \n Many computer users run a modified version of the GNU system every day, without realizing it. Through a peculiar turn of events, the version of GNU which is widely used today is often called");
        if (args[0] == "testing")
            message.channel.send("Yes, hello, we can hear you.");
    } catch (err) {
      message.channel.send(client.errors.genericError + err).catch();
    }
  };
  
  //permissions and aliases
  
  exports.conf = {
    enabled: true,
    aliases: ["cpasta"],
    guildOnly: false,
    permLevel: "User"
  };
  
  
  //what the command does
  
  exports.help = {
    name: "copypasta",
    category: "Fun",
    description: "Send pre-defined totally 100% funny copypastas that will make everyone like you",
    usage: "copypasta (copypastaname)"
  };
