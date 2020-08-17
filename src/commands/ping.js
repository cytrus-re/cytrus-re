exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  try {
    let msg = await message.channel.send("<@"+message.author.id+">");

    let embed = new client.Embed("normal", {
      title: "Ping",
      description: `Message Trip: ${msg.createdTimestamp - message.createdTimestamp}ms
Websocket Heartbeat: ${Math.floor(client.pings[0])}ms
Average Websocket Heartbeat: ${Math.floor(client.pings.average())}ms`
    });

    msg.edit(embed);
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
