const Discord = require('discord.js');
const wikipedia = require('wikipediajs');

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  try {
    wikipedia.search(args.join(' ')).then(async (res) => {
      let output = '';
      let i = 1;
      
      let firstEmbed = new Discord.MessageEmbed()
      .setTitle("Results")
      .setDescription("Please choose the page you want.")
      .setColor("#eeeeee")
      
      Object.keys(res.query.pages).forEach(async (page) => {
        await firstEmbed.addField(res.query.pages[page].title, `Respond with ${i} for this article`); 
        i++;
      });
      let page = await client.awaitReply(message, firstEmbed);
      
      if (isNaN(page)) return message.channel.send(page + ' is not a number!');
      let info = res.query.pages[Object.keys(res.query.pages)[page - 1]]
      let pageEmbed = new Discord.MessageEmbed()
      .setTitle("Wikipedia")
      .setDescription('['+info.title+']('+info.fullurl.replace('(', '\\(').replace(')', '\\)').replace('`', '\\`')+')')
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
  category: "General",
  description: "Searches Wikipedia for your search term",
  usage: "wikipedia <search term>"
};
