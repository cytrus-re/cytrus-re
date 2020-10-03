//load the file that contains all the copypastas
const copypastas = require("../../data/copypastas.json");

exports.run = async (client, message, args, level) => { 
    try {
        // test if the requested pasta is in the list of available pastas
        if (copypastas.pastalist.includes(args[0])) {
            let pasta = copypastas[args[0]]; //if so, attach it to the pasta variable. i.e. copypastas[testing]
            message.channel.send(`${pasta}\nTriggered by ${message.author}`); //send a message with the pasta and who triggered it.
        } else {
            message.channel.send({ embed: { color: "#ff3333", title: "What's that?", description: `I don't know that copypasta. Maybe try one of the following instead:\n${copypastas.pastalist.join()}` } });
            //send error if pasta is nonexistent.        
        }
        message.delete(); //delete the command usage.
    } catch (err) {
      message.channel.send(client.errors.genericError + err).catch();
    }
};
  
exports.conf = {
  enabled: true,
  aliases: ["cpasta"],
  guildOnly: false,
  permLevel: "User"
};
  
exports.help = {
  name: "copypasta",
  category: "Fun",
  description: "Sends totally 100% funny copypastas that will make everyone like you.",
  usage: "copypasta <copypastaname>"
};
