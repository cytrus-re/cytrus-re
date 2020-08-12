const request = require('request');

module.exports = async client => {
  const statusList = [
    {msg: `Cytrus-RE 1.3.0 | ${client.config.defaultSettings.prefix}help  | Check out our ${client.config.defaultSettings.prefix}site!`, type: 'PLAYING'},
    {msg: `for commands | ${client.config.defaultSettings.prefix}help | Check out our ${client.config.defaultSettings.prefix}site!`, type: 'WATCHING'},
    //{msg: `with async/await errors | ${client.config.defaultSettings.prefix}help | cytrus-re.github.io`, type: 'PLAYING'},
    //{msg: `with unhandled promise rejections | ${client.config.defaultSettings.prefix}help | cytrus-re.github.io`, type: 'PLAYING'},
    //{msg: `with linux permissions | ${client.config.defaultSettings.prefix}help | cytrus-re.github.io`, type: 'PLAYING'},
    //{msg: `Discord be slow | ${client.config.defaultSettings.prefix}help | cytrus-re.github.io`, type: 'WATCHING'},
    //{msg: `over ${client.guilds.size} servers | ${client.config.defaultSettings.prefix}help | cytrus-re.github.io`, type: 'WATCHING'},
    //{msg: `to EDGE rambling | ${client.config.defaultSettings.prefix}help | cytrus-re.github.io`, type: 'LISTENING'},
    {msg: `development progress! | ${client.config.defaultSettings.prefix}help | Check out our ${client.config.defaultSettings.prefix}site!`, type: 'WATCHING'},
    //{msg: `with Git and learning at the same time! | ${client.config.defaultSettings.prefix}help | cytrus-re.github.io`, type: 'PLAYING'},
  ];
    // Why did I comment out the rest? 
    // If we're gonna try to be a serious bot, then we need to have serious status messages. 
    // "playing with linux permissions" this comes from a kid who's too scared to use linux but ok
    // "to EDGE rambling" if I was a normal random user I wouldn't know who EDGE was
    // "with Git" sorry what
  setInterval(async () => {
    let index = Math.floor(Math.random() * statusList.length + 1) - 1;
    await client.user.setActivity(statusList[index].msg, {
      type: statusList[index].type
    });
  }, 5000);
 
 
  setInterval(async () => {
    request("https://cytrus-re.herokuapp.com/", (err, res, html) => {
      if (err) client.logger.error(err);
    });
  }, 28000);


  client.user.setStatus('online');

  //Logs the Status
  client.logger.log(`RAM usage: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB`, 'ready');
  client.logger.log(`Users: ${client.users.size.toLocaleString().replace(/ /g, '')}`, 'ready');
  client.logger.log(`Servers: ${client.guilds.size.toLocaleString().replace(/ /g, '')}`, 'ready');
  client.logger.log(`Channels: ${client.channels.size.toLocaleString().replace(/ /g, '')}`, 'ready');
  client.logger.log(`Running on Node ${process.version.replace(/ /g, '')}`, 'ready');
  client.logger.log(`and using Discord.js ${require('discord.js').version.replace(/ /g, '')}`, 'ready');

  // Starts the web server/API
  require('../modules/web')(client);

  client.logger.log("Cytrus-RE V" + require("../package").version + " | https://github.com/Cytrus-RE/cytrus-re");
  client.startuptime = new Date().getTime() - client.starttime;
  client.logger.log("It took " + client.startuptime + "ms to start Cytrus-RE.");
};

