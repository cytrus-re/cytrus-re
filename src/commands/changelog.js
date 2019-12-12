exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  try {
   
   message.channel.send({embed:  
                 { author: { name: client.user.username, icon_url: client.user.avatarURL}, 
                  color: 0x1167b1,
                  title: "**V1.1.1**",
                  fields: [{ name: "Grammar", value: "More grammar fixes."} ,
                           { name: "Minor improvements", value: "Mostly code stuff." }],
                  footer: {text: "By DestroyedEDGE#9573, Rexowogamer#1183, CelestialCrafter#7255, and Midou (notsoonline)#9637"
    } }});
  } catch (err) {
   message.channel.send(client.errors.genericError + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ["changes", "updates"],
  guildOnly: false,
  permLevel: "User"
};

exports.help = {
  name: "changelog",
  category: "Utility",
  description: "Returns the latest changelog for Cytrus-RE.",
  usage: "changelog"
};
