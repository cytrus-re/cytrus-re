const Discord = require('discord.js');
const wikipedia = require('@cytrus-re/wikipediajs');

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  try {
    wikipedia.search(args.join(' ')).then(async (res) => {
      let output = '';
      let i = 1;
      
      let firstEmbed = new Discord.MessageEmbed()
      .setTitle("Results")
      .setDescription("Please choose the page you want.")
      .setColor("#eeeeee")
      
      if (!res.query.pages) message.channel.send(client.errors.noResults);
      if (res.query.results.length > 5) res.query.results.length = 5;
      Object.keys(res.query.pages).forEach((page) => {
        await firstEmbed.addField(res.query.pages[page].title, `Respond with ${i} for this article`); 
        i++;
      });
      let page = await client.awaitReply(message, firstEmbed);
      
      if (isNaN(page)) return message.channel.send(`${page} is not a number!`);
      let info = res.query.pages[Object.keys(res.query.pages)[page - 1]]
      let infDesc = wikipedia.search(info.title, "en", { prop: "description" });
      let pageEmbed = new Discord.MessageEmbed()
      .setTitle(`${info.title} on Wikipedia`)
      .setDescription(`${infDesc.description ? infDesc.description : "This article doesn't have a description or something went wrong" }`)
      .addField("Article link", `[Right here!](${info.fullurl.replace('(', '\\(').replace(')', '\\)').replace('`', '\\`')})`)
      .setColor("#eeeeee");

      message.channel.send(pageEmbed);
    });
  } catch (err) {
    message.channel.send(client.errors.genericError + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ["wiki"],
  guildOnly: false,
  permLevel: "User"
};

exports.help = {
  name: "wikipedia",
  category: "Search",
  description: "Searches Wikipedia for your query.",
  usage: "wikipedia <search term>"
};
