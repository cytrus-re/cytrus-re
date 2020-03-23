const exec = require("child_process");
exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  try {
    await exec("git pull");
    message.reply("Executed Git pull! Restart the bot.")
  } catch (err) {
    message.channel.send(client.errors.genericError + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ["git", "update"],
  guildOnly: false,
  permLevel: "Bot Moderator"

exports.help = {
  name: "pull",
  category: "System",
  description: "Pulls changes from the Github repo.",
  usage: "pull"
};
