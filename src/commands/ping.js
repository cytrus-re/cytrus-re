const Discord = require("discord.js");

exports.run = async (client, message, args, Discord, level) => { // eslint-disable-line no-unused-vars
  try {
    const pingEmbed = new client.Embed()
      .setColor('#0099ff')
      .setTitle('PING')
      .setFooter('PING')
      .addField(`${message.author.id}`, 'Hello world!')

    const msg = await message.channel.send(pingEmbed)

    const embed = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle('PONG')
      .setFooter('PONG',
        'https://cdn.discordapp.com/avatars/492871769485475840/6164d0068b8e76e497af9b0e1746f671.png?size=2048')

      .addField('Message Trip',
      `${msg.createdTimestamp - message.createdTimestamp}ms`)
      .addField('WebSocket\nHeartbeat',
      `${Math.floor(client.pings[0])}ms`, true)
      .addField('Average WebSocket\nHeartbeat',
      `${Math.floor(client.pings.average())}ms`, true)

    msg.edit(embed)
  } catch (err) {
    message.channel.send('There was an error!\n' + err).catch()
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
  description: "Returns Kato-Bot's ping.",
  usage: "ping"
};
