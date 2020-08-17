const Discord = require("discord.js");
const request = require("request");

exports.run = async (client, message, args, level) => {
  try {
    let i = 1;
    let output = "";
    
    request({
      url: "https://api.tenor.com/v1/search?q=" + encodeURIComponent(args.join(" ")) + "&key=" + process.env.TENOR_API_KEY + "&limit=5",
      json: true
    }, async (req, res, json) => {
    json.results.forEach(l => {
      output += "\n" + i + ". " + l.url.replace("https://", "");
      i++;
    });
    
    let resp = await client.awaitReply(message, `Please choose the result you want${output}`);
    if (isNaN(resp)) return message.reply("That not a number!");
    
    let img = json.results[resp - 1];
    if (!img) return message.reply("That was not a valid choice!");
      let embed = new Discord.RichEmbed()
      .setTitle("Tenor")
      .setImage(img.media[0].gif.url)
      .setColor("#eeeeee");
      
      message.channel.send(embed);
    });
  } catch (err) {
    message.channel.send(client.errors.genericError + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ["tenor"],
  guildOnly: false,
  permLevel: "User"
};

exports.help = {
  name: "tenorsearch",
  category: "General",
  description: "Searches Tenor for your search term",
  usage: "tenorsearch"
};
