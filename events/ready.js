const request = require('request');

module.exports = async client => {
  const statusList = [
    {msg: `for commands | ${client.config.defaultSettings.prefix}help`, type: 'WATCHING'},
    {msg: `with async/await errors | ${client.config.defaultSettings.prefix}help`, type: 'PLAYING'},
    {msg: `with unhandled promise rejections | ${client.config.defaultSettings.prefix}help`, type: 'PLAYING'},
    {msg: `with linux permissions | ${client.config.defaultSettings.prefix}help`, type: 'PLAYING'},
    {msg: `Discord be slow | ${client.config.defaultSettings.prefix}help`, type: 'WATCHING'},
    {msg: `over ${client.guilds.size} servers | ${client.config.defaultSettings.prefix}help`, type: 'WATCHING'},
    {msg: `EDGE rambling | ${client.config.defaultSettings.prefix}help`, type: 'LISTENING'},
    {msg: `development progress! | ${client.config.defaultSettings.prefix}help`, type: 'WATCHING'},
    {msg: `Need help? Support server: ${client.config.links.supportServer} | Find the source code on Github: ${client.config.links.github}`, type: "CUSTOM-STATUS"}
  ];

  setInterval(async () => {
    let index = Math.floor(Math.random() * statusList.length + 1) - 1;
    await client.user.setActivity(statusList[index].msg, {
      type: statusList[index].type
    });
  }, 5000);
  
 setInterval(async () => {
    request('https://web.cytrus.ga', (err, res, html) => {
      if (err) client.logger.error(err);
    });
}, 28000);


  client.user.setStatus('online');

  //Logs the Status
  client.logger.log(`Ram Usage: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB`, 'ready');
  client.logger.log(`Users: ${client.users.size.toLocaleString().replace(/ /g, '')}`, 'ready');
  client.logger.log(`Servers: ${client.guilds.size.toLocaleString().replace(/ /g, '')}`, 'ready');
  client.logger.log(`Channels: ${client.channels.size.toLocaleString().replace(/ /g, '')}`, 'ready');
  client.logger.log(`Discord.js: v${require('discord.js').version.replace(/ /g, '')}`, 'ready');
  client.logger.log(`Node.js: ${process.version.replace(/ /g, '')}`, 'ready');

  //Starts the web server/API
  require('../modules/web')(client);

  client.logger.log('Cytrus V' + require('../package').version + ' | https://github.com/Rexogamer/cytrus-re');
  client.startuptime = new Date().getTime() - client.starttime;
  client.logger.log('It took ' + client.startuptime + 'ms to start Cytrus');
};

