exports.run = async (client, message) => { 
    try {
      const facts = require("../data/facts.json")
      message.channel.send(facts[Math.floor(Math.random() * facts.length)]); 
    } catch (err) {
      // This tells a user if something broke with the command, and prompts them to send the error log to a developer.
      message.channel.send(client.errors.genericError + err).catch();
    }
  };
  
  // permissions and aliases
  
  exports.conf = {
    enabled: true, 
    aliases: ["randomcyrefact", "cyrefact", "cytrusrefact", "randombotfact", "yfact", "cyfact"], 
    guildOnly: false, 
    permLevel: "User" 
  };
  
  
  // command help page
  
  exports.help = {
    name: "fact", 
    category: "Fun", 
    description: "Returns a random CyRE-related fact.",
    usage: "c.fact" 
  };
  
