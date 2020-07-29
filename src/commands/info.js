const Discord = require('discord.js');

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  try {
    var opsys = os.platform();
    const embed = new Discord.RichEmbed()
    .setColor("#eeeeee")
    .setTitle("Cytrus-RE")
    .setFooter("Originally made by CelestialCrafter#6830 and EnderGirlGamer#5370. Rewritten by EDGE#9573, Rexowogamer#1183, and Midou#9637.")
    .setDescription(`Github: [Repo](https://github.com/Rexogamer/cytrus-re)
Website: None
API: None
Support Server: [Server](https://discord.gg/BfpMgXs)
Issues: [Github](https://github.com/Rexogamer/cytrus-re/issues)
Version: V1.3`);
Currently running on ${opsys}

    message.channel.send(embed);
  } catch (err) {
    message.channel.send('There was an error!\n' + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ["i"],
  guildOnly: false,
  permLevel: "User"
};

exports.help = {
  name: "info",
  category: "General",
  description: "Returns info about Cytrus-RE.",
  usage: "info"
};
