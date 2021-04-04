const Discord = require("discord.js");
const picfetch = require("node-fetch");

exports.run = async (client, message) => {
  try {
    const response = await picfetch(
      "http://www.splashbase.co/api/v1/images/random?images_only=true"
    );
    const data = await response.json();
    let embed = new Discord.MessageEmbed()
      .setTitle("Random Picture")
      .setColor("#363942")
      .setImage(`${data.url}`);
    message.channel.send(embed);
    console.log(`Image sent: ${data.url}`);
  } catch (err) {
    message.channel.send(client.errors.genericError + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ["randomimage", "randompic", "randomimg", "ranpic"],
  guildOnly: false,
  permLevel: "User",
};

exports.help = {
  name: "randompicture",
  category: "Fun",
  description: "Returns a random picture.",
  usage: "randompicture",
};
