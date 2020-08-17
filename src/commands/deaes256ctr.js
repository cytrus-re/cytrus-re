const Cryptr = require("cryptr");

const decrypt = (text, key) => {
  let cryptr = new Cryptr(key);
  return cryptr.decrypt(text);
};

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  try {
    if (!args[0]) return message.channel.send("You need to give a key to decrypt the text with!");
    if (!args[1]) return message.channel.send("You need to give the text to decrypt!");
    
    message.channel.send(decrypt(args.slice(1).join(" "), args[0]));
  } catch (err) {
    message.channel.send(client.errors.genericError + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ["decrypt"],
  guildOnly: false,
  permLevel: "User"
};

exports.help = {
  name: "deaes256ctr",
  category: "General",
  description: "Decrypts text in aes-256-ctr",
  usage: "deaes256ctr <key> <text>"
};
