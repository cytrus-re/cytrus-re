exports.run = async (client, message, args, level) => {
  try {
      if (!args[0]) return message.channel.send("You need to give me a message ID!");
    
      let msg = message.channel.messages.get(args[0]);
      if (!msg) message.channel.send("That message does not exist! Make sure to use this command in the same channel as the message.");
      
      msg.pin().catch(() => {
        return message.channel.send(client.errors.genericError);
      });
      message.channel.send("I've unpinned the message!");
  } catch (err) {
    message.channel.send(client.errors.genericError + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ["upin"],
  guildOnly: false,
  permLevel: "Moderator"
};

exports.help = {
  name: "unpin",
  category: "Moderation",
  description: "Unpins the specified message.",
  usage: "unpin <id>"
};
