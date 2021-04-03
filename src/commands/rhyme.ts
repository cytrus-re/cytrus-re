const rhyme = require("rhyme");
// todo: rewrite with rhymes library instead of rhyme
exports.run = async (client, message, args, level) => { 
  try {
    if (!args[0]) return message.reply("You need to input the word to rhyme!");
    
    let msg = await message.reply("Finding rhymes...");
    
    rhyme(async (rl) => {
      
      let rhymes = "";

      let words = rl.rhyme(args.join(" "));
      
      words.forEach(word => {
        rhymes += word.toProperCase() + ", ";
      });

      rhymes = rhymes.slice(0, -2);

      let embed = new client.Embed("blend", {
        title: "Rhyme",
        description: `**Rhyming Words**\n${rhymes || "None Found."}`
      });

      msg.edit(embed);
    });
  } catch (err) {
    message.channel.send(client.errors.genericError + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: [],
  guildOnly: false,
  permLevel: "User"
};

exports.help = {
  name: "rhyme",
  category: "Fun",
  description: "Returns all the words that rhyme with the specified word",
  usage: "rhyme <word>"
};