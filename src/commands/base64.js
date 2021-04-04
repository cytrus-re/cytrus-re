exports.run = async (client, message, args) => {
  try {
    message.delete().catch();
    switch (args[0]) {
      case "encode":
        if (!args.slice(1).join(" "))
          return message.reply("You need to provide the string to encode!");
        message.channel.send(
          Buffer.from(args.slice(1).join(" "), "utf8").toString("base64")
        );
        break;
      case "decode":
        if (!args.slice(1).join(" "))
          return message.reply("You need to provide the string to decode!");
        message.channel.send(
          Buffer.from(args.slice(1).join(" "), "base64").toString("utf8")
        );
        break;
      default:
        return message.reply(
          "You need to choose to encode or decode the string!"
        );
    }
  } catch (err) {
    message.channel.send(client.errors.genericError + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ["64", "base"],
  guildOnly: false,
  permLevel: "User",
};

exports.help = {
  name: "base64",
  category: "General",
  description: "Encodes or decodes a base64 string.",
  usage: "base64 <encode/decode> <string>",
};
