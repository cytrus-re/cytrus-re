const Discord = require("discord.js");
exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  try {
  //command code
  
let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));    
if (!rUser) return message.channel.send("I couldn't find the specified user!");
console.log("user exists!") 
let rreason = args.join(" ").slice(22);


let reportEmbed = new Discord.RichEmbed()
 .setAuthor("Cytrus-RE User Report")
 .setColor("#eeeeee")
 .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
 .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
 .addField("Reported in", message.channel)
 .addField("Reported at", message.createdAt)
 .addField("Reason for report", rreason);

 let reportschannel = client.channels.get("691142562253242409");
 if(!reportschannel) return message.channel.send("I couldn't find the reports channel!");
 console.log("channel exists!") 

 message.delete();
 console.log("message deleted!") 
 reportschannel.send(reportEmbed);
 console.log("report message sent!")
 message.channel.send("Report successfully sent!")

//error log
  
  } catch (err) {
    message.channel.send(client.errors.genericError + err).catch();
  }
};

//permissions and aliases

exports.conf = {
<<<<<<< HEAD
<<<<<<< HEAD
    enabled: true,
=======
    enabled: false, // This needs some polish 
>>>>>>> parent of d7fbf796... Update report.js
=======
    enabled: true,
>>>>>>> parent of 9ee68b08... Update report.js
    aliases: ["gbr", "gbreport"],
    guildOnly: false,
    permLevel: "User"
  };
  
  exports.help = {
    name: "report",
    category: "Moderation",
    description: "Reports a user to be put on the Cytrus-RE Global Ban List.",
    usage: "report <user> <reason>"
};
