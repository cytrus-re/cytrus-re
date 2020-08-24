const Discord = require("discord.js");
const wikipedia = require("@cytrus-re/wikipediajs");

exports.run = async (client, message, args) => {
  try {
    wikipedia.search(args.join(" ")).then(async (res) => {
      let i = 1;
      
      let firstEmbed = new Discord.MessageEmbed()
      .setTitle("Results")
      .setDescription("Please choose the page you want.")
      .setColor("#eeeeee")
      
      if (!res.query.pages) message.channel.send(client.errors.noResults);
      Object.keys(res.query.pages).forEach((page) => {
        firstEmbed.addField(res.query.pages[page].title, `Respond with ${i} for this article`); 
        i++;
      });
      let page = await client.awaitReply(message, firstEmbed);
      
      if (isNaN(page)) return message.channel.send(`${page} is not a number!`);
      let info = res.query.pages[Object.keys(res.query.pages)[page - 1]]
<<<<<<< HEAD
      let infDesc = wikipedia.search(info.title, "en", { prop: "description" });
=======
      let infDesc = wikipedia.search(info.title, "en", { prop: "description });
>>>>>>> parent of 32b6af4f... rexo you idiot you didn't put a quotation mark
      let pageEmbed = new Discord.MessageEmbed()
      .setTitle(`${info.title} on Wikipedia`)
<<<<<<< HEAD
<<<<<<< HEAD
      .setDescription(`${infDesc.description ? infDesc.description : client.errors.noArticleDescription}`)
=======
      .setDescription(`${infDesc.description ? infDesc.description : client.error.404ArticleDescription }`)
>>>>>>> parent of 331df204... Small brain
=======
      .setDescription(`${infDesc.description ? infDesc.description : "This article doesn't have a description or something went wrong" }`)
>>>>>>> parent of 58bc8e4b... Update wikipedia.js
      .addField("Article link", `[Right here!](${info.fullurl.replace("(", "\\(").replace(")", "\\)").replace("`", "\\`")})`)
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
