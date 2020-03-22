const Discord = require('discord.js');
const moment = require('moment');
const cpu = require('pidusage');
const { version } = require('discord.js');
require('moment-duration-format');

exports.run = (client, message, args, level) => { // eslint-disable-line no-unused-vars
  try {
    cpu(process.pid, async (err, stats) => {
      const duration = moment.duration(client.uptime).format(' D [days], H [hrs], m [mins], s [secs]');
      const embed = new Discord.MessageEmbed()
      .setTitle('Cytrus Status')
      .setDescription(`
RAM Usage: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB
Uptime: ${duration}
Users: ${client.users.size}
Servers: ${client.guilds.size.toLocaleString()}
Channels: ${client.channels.size.toLocaleString()}
Status: ${client.user.presence.status}
Game: ${client.user.presence.game}
Discord.js: v${version}
CPU Usage: ${Math.round(stats.cpu)}%
Node.js: ${process.version}
Dependencies: ${Object.keys(require('../package').dependencies).length}
Startup Time: ${client.startuptime}ms
Voice Connections: ${client.voiceConnections.size}`)
      .setColor('#eeeeee');

      message.channel.send(embed);
    });
  } catch (err) {
    message.channel.send('There was an error!\n' + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ['stats'],
  guildOnly: false,
  permLevel: 'User'
};

exports.help = {
  name: 'status',
  category: 'System',
  description: 'Reuturns the bot\'s status',
  usage: 'status'
};
