exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  try {
   let log =  { color: 0xFFFFFF, title: "**V1.1.1**", fields: [{ name: "Grammar", value: "More grammar fixes." }, { name: "Minor improvements", value: "Mostly code stuff." }, {name: "Bug fixes", value: "Fixed a few crashes."}] }
   message.channel.send(log);
  } catch (err) {
   message.channel.send('There was an error!\n' + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ['changes', 'updates'],
  guildOnly: false,
  permLevel: 'User'
};

exports.help = {
  name: 'changelog',
  category: 'Utility',
  description: 'Returns the latest changelog for Cytrus.',
  usage: 'changelog'
};
