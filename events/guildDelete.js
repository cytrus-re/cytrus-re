module.exports = (client, guild) => {
  client.logger.log(`[GUILD LEAVE] ${guild.name} (${guild.id}). Owner: ${guild.owner.user.tag} (${guild.owner.user.id}).`);

  if (client.settings.has(guild.id)) {
    client.settings.delete(guild.id);
  }
  
  require('../modules/botlist')(client);
};
