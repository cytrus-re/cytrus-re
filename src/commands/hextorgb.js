exports.run = async (client, message, args, level) => {
  try {
    if (!args[0]) return message.channel.send("You have to give me a hex code!");
    
    //get the hex code and remove the hash, if any
    let hexColour = args[0].replace("#", "");

    //get the 3 values for red, green and blue by parsing hexadecimal integers from the hex array's digits...

    //0 and 1 for red (the second argument of substring(start, end) is non-inclusive)
    let r = parseInt(hexColour.substring(0, 2), 16);
    //2 and 3 for green
    let g = parseInt(hexColour.substring(2, 4), 16);
    //and 4 and 5 for blue
    let b = parseInt(hexColour.substring(4, 6), 16);

    //array that includes all valid hex digits
    const hexDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"]

    //test each digit of the given number, if it is not 6 digits long or includes a digit that is not in the hexDigits array return early and error out.
    for (i = 0; i < hexColour.length; i++) {
      if (hexColour.length != 6 || !hexDigits.includes(hexColour[i])) {
        return message.channel.send({ embed: { color:"ff3333", title: "Incorrect format!", description: "Hex colour codes include **6** of the following characters:\n1, 2, 3, 4, 5, 6, 7, 8, 9, 0, a, b, c, d, e and f", footer: { text: "Example: #7289da" } } });
      }
    }

    //send the rgb values as an embed
    message.channel.send({ embed: { color: hexColour, title: "Hex to RGB", description : `#${hexColour} converts to RGB(${r}, ${g}, ${b})`}});

  } catch (err) {
    message.channel.send(client.errors.genericError + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ["hex2rgb"],
  guildOnly: false,
  permLevel: "User"
};

exports.help = {
  name: "hextorgb",
  category: "Utility",
  description: "Converts a hex colour value to RGB.",
  usage: "hextorgb <value>"
};
