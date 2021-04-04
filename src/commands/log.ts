exports.run = async (client, message, args) => {
  try {
    if (client.liusers.has(message.author.id)) {
      client.logger.info(message.author.id + " | " + args.join(" "), "user");
      message.channel.send("Your message has been sent to Cytrus-RE's logs!");
    } else
      message.channel.send(
        "You are not logged in! (Use profile login to login)"
      );
  } catch (err) {
    message.channel.send(client.errors.genericError + err).catch();
  }
};

exports.conf = {
  enabled: false, // right now this relies on the removed profile system
  aliases: ["logsend"],
  guildOnly: false,
  permLevel: "User",
};

exports.help = {
  name: "log",
  category: "General",
  description: "Sends a message to the Cytrus-RE Log",
  usage: "log",
};
