const Cryptr = require("cryptr");

const encrypt = (text, key) => {
  let cryptr = new Cryptr(key);
  return cryptr.encrypt(text);
};

const decrypt = (text, key) => {
  let cryptr = new Cryptr(key);
  return cryptr.decrypt(text);
};

exports.run = async (client, message, args, level) => {
  // eslint-disable-line no-unused-vars
  try {
    if (args[0] != "encrypt" && args[0] != "decrypt")
      return message.channel.send({
        embed: {
          color: "#ff3333",
          title: "Invalid option",
          description: "You must choose between `encrypt` or `decrypt`.",
        },
      });

    if (!args[1])
      return message.channel.send(
        "You need to give a key to encrypt/decrypt the text with!"
      );
    if (!args[2])
      return message.channel.send(
        "You need to give the text to encrypt/decrypt!"
      );

    //take all arguments after <verb> and <key> up until the last one and join them with spaces.
    let text = args.slice(2, args.length).join(" ");
    let msg = "";
    //if <verb> is encrypt, take text and encrypt it with <key>
    if (args[0] == "encrypt") msg = encrypt(text, args[1]);
    //if <verb> is decrypt, take text and decrypt it with <key>
    else if (args[0] == "decrypt") msg = decrypt(text, args[1]);

    message.channel.send(msg);
  } catch (err) {
    message.channel.send(client.errors.genericError + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ["cryptr", "ctr"],
  guildOnly: false,
  permLevel: "User",
};

exports.help = {
  name: "aes256",
  category: "Utility",
  description:
    "Encrypts and decrypts a message using a key into an aes256 string.",
  usage:
    'aes256 <verb> <key> <text>\n<verb> can either be "encrypt" or "decrypt".',
};
