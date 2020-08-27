exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  try {
    const botPing = Math.floor(this.client.ws.ping);
    const msgPing = Math.floor(Date.now() - message.createdTimestamp);

    message.channel.send(`[🛰️] Kato Ping: ${botPing}ms\n[📨] Messages Ping: ${msgPing}ms`);
	
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
