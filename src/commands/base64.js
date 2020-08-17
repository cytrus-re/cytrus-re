const { base64encode, base64decode } = require("nodejs-base64");

exports.run = async (client, message, args, level) => {
  try {
    message.delete().catch();
    switch(args[0]) {
      case "encode":
        if (!args.slice(1).join(" ")) return message.reply("You need to provide the string to encode!");
        message.channel.send(base64encode(args.slice(1).join(" ")));
        break;
      case "decode":
        if (!args.slice(1).join(" ")) return message.reply("You need to provide the string to decode!");
        message.channel.send(base64decode(args.slice(1).join(" ")));
        break;
      default:
        return message.reply("You need to choose to encode or decode the string!");
        break;
    }
  } catch (err) {
    message.channel.send(client.errors.genericError + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ["64", "base"],
  guildOnly: false,
  permLevel: "User"
};

exports.help = {
  name: "base64",
  category: "General",
  description: "Encodes or decodes a base64 string.",
  usage: "base64 <encode/decode> <string>"
};
