module.exports = (client, guild) => {
  client.logger.log(`[GUILD JOIN]: ${guild.name} (${guild.id}). Owner: ${guild.owner.user.tag} (${guild.owner.user.id})`);
  
  
};
