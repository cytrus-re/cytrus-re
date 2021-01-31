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
    aliases: ["supportserver"],
    guildOnly: false,
    permLevel: "User"
  };
  
  exports.help = {
    name: "support",
    category: "General",
    description: "Gives you a link to our Discord.",
    usage: "support"
  };
};
