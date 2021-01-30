exports.run = async (client, message, args, level) => { 
    try {
        const embed = new Discord.MessageEmbed()
        .setColor("#eeeeee")
        .setTitle("Cytrus-RE Support Discord")
        .setFooter("Join us here to talk about things!")
        .setDescription(client.config.supportServer);
    } catch (err) {
      message.channel.send(client.errors.genericError + err).catch();
    }
  };
  
  exports.conf = {
    enabled: true,
    aliases: ["rtag", "rmtag"],
    guildOnly: false,
    permLevel: "Administrator"
  };
  
  exports.help = {
    name: "removetag",
    category: "General",
    description: "Removes the specified tag.",
    usage: "removetag <tag>"
  };
  