exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  try {
    let msgPing = Math.floor(Date.now() - message.createdTimestamp);

    message.channel.send(`[🛰️] Kato Ping: ${msgPing}ms`);
	
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
