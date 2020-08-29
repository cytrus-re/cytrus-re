// Oxygemo/Rexogamer 2020
// I don't have any rights reserved, but the MIT License is still in place. - Oxygemo (although Rexo says the same)
const os = require("os"); // Node.JS core module, required for getting the OS
exports.run = async (client, message, args, level) => {   
    try {
        var rawPlat = os.platform();
        var cleanPlat = client.friendlyOS(rawPlat);
        var ver = os.version();
        message.channel.send(`This instance of Cytrus-RE is running on ${process.env.HOSTNAME ? `**${process.env.HOSTNAME}** : `**${cleanPlat}** v**${ver}**`}.`);
    } catch (err) {
        message.channel.send(client.errors.genericError);
    }
};

exports.conf = {
    enabled: true,
    aliases: ["botos", "clientos"],
    guildOnly: false,
    permLevel: "Bot Dev"
  };
  
  exports.help = {
    name: "currentos",
    category: "System",
    description: "Returns the current operating system Cytrus-RE is running on.",
    usage: "currentos"
  };
