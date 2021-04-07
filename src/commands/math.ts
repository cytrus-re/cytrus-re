const math = require("mathjs");

exports.run = async (client, message, args) => {
  try {
    if (!args[0])
      return message.channel.send("You need to give me an equation!");

    message.channel.send({
      embed: {
        color: "#ff3333",
        title: "Output",
        description: `That equation resolves to \`${math.evaluate(
          args.join(" ")
        )}\`.`,
      },
    });
  } catch (err) {
    message.channel.send(client.errors.mathError + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ["calc"],
  guildOnly: false,
  permLevel: "User",
};

exports.help = {
  name: "math",
  category: "Utility",
  description: "Does math for you.",
  usage: "math",
};
