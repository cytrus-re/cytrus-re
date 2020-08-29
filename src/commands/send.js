const Discord = require("discord.js");

exports.run = async (client, message, args, level) => { 
  try {
    const hook = new Discord.WebhookClient(process.env.LOG_WEBHOOK_ID, process.env.LOG_WEBHOOK_TOKEN);
    hook.send(args.join(" "));
    message.channel.send("Message sent to the Cytrus Log Channel!");
  } catch (err) {
    message.channel.send("Their was an error!\n" + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: [],
  guildOnly: false,
  permLevel: "Bot Moderator"
};

exports.help = {
  name: "send",
  category: "General",
  description: "Sends a message to the CytrusLog",
  usage: "send"
};
