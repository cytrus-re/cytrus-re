const ud = require("urban-dictionary");
const Discord = require("discord.js");

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  try {
    if (!message.channel.nsfw) return message.channel.send("You need to be in an NSFW channel use this command!");
    
    ud.term(args.join(" ")).then(async (result) => {
      if (!args[0]) return message.channel.send("You need to give me a word!");
      let output = "";
      let entries = result.entries;
      let i = 1;
      
      if (entries == []) return message.channel.send(`I couldn't find any results for ${args.join(" ")}!`);
      
      Object.keys(entries).forEach(async (pageID) => {
        output += "\n" + i + ". " + entries[pageID].word;
        i++;
      });
      
      let page = await client.awaitReply(message, `Please choose the page you want:\n${output}`);
      
      if (isNaN(page)) return message.channel.send(`${page} is not a number!`);
      
      let embed = new Discord.MessageEmbed()
      .setTitle(entries[page - 1].word)
      .setDescription("Definition:\n" + entries[page - 1].definition + "\n\nExample:\n" + entries[page - 1].example)
      .setFooter("Requested by " + message.author.tag)
      .setColor("#eeeeee");

      message.channel.send(embed).catch(err => message.channel.send("The definition was too big or there was another error!\n\n" + err));
    });
  } catch (err) {
    message.channel.send(client.errors.genericError + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ["urban", "ud"],
  guildOnly: false,
  permLevel: "User"
};

exports.help = {
  name: "urbandictionary",
  category: "Search",
  description: "Searches the Urban Dictionary for your query.",
  usage: "urbandictionary <word/phrase>"
};
