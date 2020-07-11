// Oxygemo 2020
// I don't have any rights reserved. But the MIT License is still in place.
const Discord = require("discord.js");
const exec = require("child_process").exec; // This will allow us to do commands in the user shell/command prompt, which is neccesary for this to work.
exports.run = async (client, message, args, level) => {
    //Let's declare some variables!
    var OSCheck = exec("uname -a");

    try {
        await exec("uname -a");
        message.reply("This instance of Cytrus-RE is running on a UNIX-Like OS or kernel (Linux/OSX).");    
    } catch (err) {
        message.channel.send("This instance of Cytrus-RE is running on Windows.");
    }
    
}

exports.conf = {
    enabled: true,
    aliases: ["botos", "clientos"],
    guildOnly: true,
    permLevel: "Bot Admin"
  };
  
  exports.help = {
    name: "currentos",
    category: "System",
    description: "Checks the current operating system Cytrus-RE is running on.",
    usage: "currentos"
  };