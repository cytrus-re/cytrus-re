module.exports = (client, guild) => {
  client.logger.info(`[GUILD JOIN]: ${guild.name} (${guild.id}). Owner: ${guild.owner.user.tag} (${guild.owner.user.id})`);
};
