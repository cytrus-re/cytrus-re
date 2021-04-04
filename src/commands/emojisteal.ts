exports.run = async (client, message, args) => {
  try {
    let id = /[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9]/.exec(
      args[1]
    );

    switch (args[0]) {
      case "animated":
        if (!id)
          return message.reply(
            "You didn't input a valid emoji or it is a default Discord emoji!"
          );
        if (!args.slice(2).join(" "))
          return message.reply("You need to give the name of the emoji!");
        message.guild
          .createEmoji(
            "https://cdn.discordapp.com/emojis/" + id + ".gif",
            args.slice(2).join(" ")
          )
          .then((emoji) =>
            message.channel.send("I've created the " + emoji.name + " emoji!")
          )
          .catch((err) =>
            message.reply("I couldn't create the emoji!\n" + err)
          );
        break;
      case "static":
        if (!id)
          return message.reply(
            "You didn't input a valid emoji or it is a default Discord emoji!"
          );
        message.guild
          .createEmoji(
            "https://cdn.discordapp.com/emojis/" + id + ".png",
            args.slice(2).join(" ")
          )
          .then((emoji) =>
            message.channel.send("I've created the " + emoji.name + " emoji.")
          )
          .catch((err) =>
            message.reply("I couldn't create the emoji!\n" + err)
          );
        break;
      default:
        message.reply("You need to supply the type of emoji it is!");
        break;
    }
  } catch (err) {
    message.channel.send(client.errors.genericError + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ["emotesteal", "es", "esteal"],
  guildOnly: false,
  permLevel: "Moderator",
};

exports.help = {
  name: "emojisteal",
  category: "Fun",
  description: "Steals an emoji from the current server.",
  usage: "emojisteal <static/animated> <emoji>",
};
