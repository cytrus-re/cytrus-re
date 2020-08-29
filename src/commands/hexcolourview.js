exports.run = async (client, message, args, level) => {
  try {
    if (!args[0]) return message.channel.send("You have to give me a hex code!");
    
    //convert the input to lower case and remove the hash, if any. Then, save the input to the hexColour variable
    let hexColour = args[0].toLowerCase().replace("#", "");

    //array that includes all valid hex digits
    const hexDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];

    //test each digit of the given number, if it is not 6 digits long or includes a digit that is not in the hexDigits array return early and error out.
    for (i = 0; i < hexColour.length; i++) {
      if (hexColour.length != 6 || !hexDigits.includes(hexColour[i])) {
        return message.channel.send({ embed: { color:"ff3333", title: "Incorrect format!", description: "Hex color codes include **6** of the following characters:\n1, 2, 3, 4, 5, 6, 7, 8, 9, 0, a, b, c, d, e and f", footer: { text: "Example: #7289da" } } });
      }
    }
    //if all is good, send an embed with the input colour
    message.channel.send({ embed: { color: hexColour, title: `#${hexColour}` }}); //send an embed with the colour
  } catch (err) {
    message.channel.send(client.errors.genericError + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ["hexview", "hexcolor", "hexcolour"],
  guildOnly: false,
  permLevel: "User"
};

exports.help = {
  name: "hexcolorview",
  category: "Utility",
  description: "Returns an embed with the colour of the hex value you specified",
  usage: "hexcolorview <value>"
};