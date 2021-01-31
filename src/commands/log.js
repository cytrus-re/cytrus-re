exports.run = async (client, message, args, level) => { 
  try {
    if (client.liusers.has(message.author.id)) {
      client.logger.log(message.author.id + " | " + args.join(" "), "user");
      message.channel.send("Message sent to the Cytrus-RE Logs!");
    } else message.reply("You are not logged in! (Use profile login to login)");
  } catch (err) {
    message.channel.send(client.errors.genericError + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ["logsend"],
  guildOnly: false,
  permLevel: "User"
};

exports.help = {
  name: "log",
  category: "General",
  description: "Sends a message to the Cytrus-RE Log",
  usage: "log"
};
