exports.run = async (client, message, args, level) => {
  try {
    if (!args[0]) return message.channel.send("You need to give me the text to reverse!");
    
    const str = args.join(' ');
    message.channel.send(str.split('').reverse().join(''));
  } catch (err) {
    message.channel.send(client.errors.genericError + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: [],
  guildOnly: false,
  permLevel: "User"
};

exports.help = {
  name: "reverse",
  category: "Fun",
  description: "Reverses any text.",
  usage: "reverse <text>"
};
