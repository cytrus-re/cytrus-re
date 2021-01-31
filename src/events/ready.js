module.exports = async client => {
  const statusList = [
    {msg: `Cytrus-RE 1.3.0 | ${client.config.defaultSettings.prefix}help | Check out our ${client.config.defaultSettings.prefix}site!`, type: "PLAYING"},
    {msg: `for commands | ${client.config.defaultSettings.prefix}help | Check out our ${client.config.defaultSettings.prefix}site!`, type: "WATCHING"},
    //{msg: `with async/await errors | ${client.config.defaultSettings.prefix}help | cytrus-re.github.io`, type: 'PLAYING'},
    //{msg: `with unhandled promise rejections | ${client.config.defaultSettings.prefix}help | cytrus-re.github.io`, type: 'PLAYING'},
    //{msg: `with linux permissions | ${client.config.defaultSettings.prefix}help | cytrus-re.github.io`, type: 'PLAYING'},
    //{msg: `Discord be slow | ${client.config.defaultSettings.prefix}help | cytrus-re.github.io`, type: 'WATCHING'},
    {msg: `over ${client.guilds.cache.size} servers | ${client.config.defaultSettings.prefix}help | Check out our ${client.config.defaultSettings.prefix}site!`, type: "WATCHING"},
    {msg: `development progress! | ${client.config.defaultSettings.prefix}help | Check out our ${client.config.defaultSettings.prefix}site!`, type: "WATCHING"},
    //{msg: `with Git and learning at the same time! | ${client.config.defaultSettings.prefix}help | cytrus-re.github.io`, type: 'PLAYING'},
  ];
    // Why did I comment out the rest? 
    // If we're gonna try to be a serious bot, then we need to have serious status messages. 
    // "playing with linux permissions" this comes from a kid who's too scared to use linux but ok
    // "with Git" sorry what - odyssey
  setInterval(async () => {
    let index = Math.floor(Math.random() * statusList.length + 1) - 1;
    await client.user.setActivity(statusList[index].msg, {
      type: statusList[index].type
    });
  }, 5000);
 
 
  client.user.setStatus("online");
  
  let users = client.users.cache.size;
  let servers = client.guilds.cache.size;
  let channels = client.channels.cache.size;

  // logs the status
  client.logger.info(`RAM usage: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB`, "ready");
  client.logger.info(`Users: ${users}`, "ready");
  client.logger.info(`Servers: ${servers}`, "ready");
  client.logger.info(`Channels: ${channels}`, "ready");
  client.logger.info(`Running on Node ${process.version.replace(" ", "")}`, "ready");
  client.logger.info(`...and using Discord.js v${require("discord.js").version.replace(" ", "")}`, "ready");

  client.logger.info("Cytrus-RE V" + require("../../package").version + " | https://github.com/Cytrus-RE/cytrus-re");
  client.startuptime = new Date().getTime() - client.starttime;
  client.logger.info("It took " + client.startuptime + "ms to start Cytrus-RE.");
};