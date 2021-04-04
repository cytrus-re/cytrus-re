exports.run = async (client, message, args, level) => {
  try {
    let number = Math.floor(Math.random() * 10000000000001);

    message.channel.send("Random number: " + number);
  } catch (err) {
    message.channel.send(client.errors.genericError + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ["num", "number", "rnum"],
  guildOnly: false,
  permLevel: "User",
};

exports.help = {
  name: "randomnumber",
  category: "Utility",
  description: "Returns a random number from 0 to 10000000000000.",
  usage: "randomnumber",
};
