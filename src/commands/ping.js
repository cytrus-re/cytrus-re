const Discord = require("discord.js");

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  try {
    let msgPing = Math.floor(Date.now() - message.createdTimestamp);

    message.channel.send(`[🛰️] Kato Ping: ${msgPing}ms\n[📨] Message Ping: ${Math.round(client.ws.ping)}ms`);
    
    let embed = new Discord.MessageEmbed()
    .setTitle(user.user.username)
    .setDescription(`**ID**: ${user.id}
Name: ${user.user.username}
Icon URL: ${user.user.avatarURL}
Account Created At: ${user.user.createdAt}
Game: ${user.user.presence.game || "none"}
Status: ${user.user.presence.status.toUpperCase()}
Full Name: ${user.user.tag}`)
    .setThumbnail(user.user.avatarURL)
    .setColor("#eeeeee");
    
    message.channel.send(embed);
  } catch (err) {
    message.channel.send(client.errors.genericError + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ["lag"],
  guildOnly: false,
  permLevel: "User"
};

exports.help = {
  name: "ping",
  category: "General",
  description: "Returns Cytrus-RE's ping.",
  usage: "ping"
};
