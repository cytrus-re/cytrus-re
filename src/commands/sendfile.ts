const Discord = require("discord.js");
const fs = require("fs");

exports.run = async (client, message, args) => { 
  try {
    if (!args[0]) return message.channel.send("You have to tell me which file to send!");
    
    message.author.send(new Discord.MessageAttachment(fs.createReadStream(args.join(" ")))).catch((err) => {
      return message.channel.send(client.errors.sendfileError + err);
    });

    
    message.channel.send("The file has been sent to your DMs!");
  } catch (err) {
    message.channel.send(client.errors.genericError + err).catch();
  }
};

exports.conf = {
  enabled: false, // broken, also you can usually just check Github
  aliases: ["sfl", "sfile"],
  guildOnly: false,
  permLevel: "Bot Manager"
};

exports.help = {
  name: "sendfile",
  category: "System",
  description: "Returns the specified file",
  usage: "sendfile <path>"
};
