const math = require("mathjs");

exports.run = async (client, message, args, level) => {
  try {
    if (!args[0]) return message.channel.send("You need to give me an equation!");
    
    message.channel.send("Output: " + math.evaluate(args.join(" ")));
  } catch (err) {
    message.channel.send(client.errors.mathError + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ["calc"],
  guildOnly: false,
  permLevel: "User"
};

exports.help = {
  name: "math",
  category: "Utility",
  description: "Does math for you.",
  usage: "math"
};
