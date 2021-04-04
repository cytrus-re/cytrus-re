const Discord = require("discord.js");

exports.run = async (client, message, args, level) => {
  try {
    require("request")(
      {
        url: "http://www.splashbase.co/api/v1/images/random?images_only=true",
        json: true,
      },
      (req, res, json) => {
        let embed = new Discord.MessageEmbed()
          .setTitle("Random Picture")
          .setColor("#363942")
          .setImage(json.url);

        message.channel.send(embed);
        console.log(`Image sent: ${json.url}`);
      }
    );
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
