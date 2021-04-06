exports.run = async (client, message) => { 
    try {
      const facts = ["77% of Cytrus-RE's code is just commands.", "Cytrus-RE was started in 2019.", "Odyssey346 is 2nd place on the Contributor page on our GitHub."]
      message.channel.send(facts[Math.floor(Math.random() * facts.length)]); 
    } catch (err) {
      // This tells a user if something broke with the command, and prompts them to send the error log to a developer.
      message.channel.send(client.errors.genericError + err).catch();
    }
  };
  
  // permissions and aliases
  
  exports.conf = {
    enabled: true, // If your command is broken, set it to 'false' to disable it. Set it to 'true' if it works and doesn't need any more polish. Note that bot devs and above can still use disabled commands.
    aliases: ["randomcyrefact", "cyrefact", "cytrusrefact", "randombotfact"], // Alternate name for the command. For example, c.copypasta's alias is "cpasta".
    guildOnly: false, // If the command only applies to guilds and not DMs (eg kicking or muting), set this to true. In most cases this can just be left as false.
    permLevel: "User" // If the command is only for a moderator, then you'd set it as for moderator. You can check https://github.com/Cytrus-RE/cytrus-re/blob/master/src/cnf.js for information about permission levels!
  };
  
  
  // command help page
  
  exports.help = {
    name: "fact", // Name of the command
    category: "Fun", // What category this command goes to. If the category doesn't exist, Cytrus-RE will make a new category. Make sure the category name is TitleCase and properly spaced.
    description: "Returns a random CyRE-related fact.",
    usage: "c.fact" // How you use the command. For example, c.copypasta would be used as "c.copypasta <name of the copypasta>.
  };
  
