//load the file that contains all the copypastas
const copypastas = require("../data/copypastas.json")

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
    try {
        if (copypastas.pastaslist.includes(args[0])) {
            message.channel.send(`${copypastas.${args[0]}\nTriggered by ${message.author}`);
        } else {
            message.channel.send({ embed: { color: "#ff3333", title: "What's that?", description: "I don't know that copypasta. Maybe try `interjection` or `testing` instead?" } });
        }
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
