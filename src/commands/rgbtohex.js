exports.run = async (client, message, args, level) => {
  try {
    if (!args[0]) return message.channel.send("You have to give me an rgb code!");
    
    //get the rgb colours by parsing the integers from the 3 first arguments (<r, >, <g, > and <b>)
    let r = parseInt(args[0]);
    let g = parseInt(args[1]);
    let b = parseInt(args[2]);

    //if any number is larger than 0xFF, spit an error
    if ((r > 255 || g > 255 || b > 255) || args.length < 3) {
      return message.channel.send({ embed: { color:"ff3333", title: "Incorrect format!", description: "RGB color codes include **3** numbers from **0** to **255**, separated by commas and spaces", footer: { text: "Example: 114, 137, 218" } } });
    }

    //convert the rgb colours to base 16 strings
    let rHex = r.toString(16);
    let gHex = g.toString(16);
    let bhex = b.toString(16);

    //join the 3 hex values together
    let hexColour = rHex + gHex + bHex;

    //send the hex value as an embed
    message.channel.send({ embed: { color: hexColour, title: `rgb(${r}, ${g}, ${b}) converts to \n hex #${hexColour}`}});

  } catch (err) {
    message.channel.send(client.errors.genericError + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ["rgb2hex"],
  guildOnly: false,
  permLevel: "User"
};

exports.help = {
  name: "rgbtohex",
  category: "General",
  description: "Converts an RGB color value to hex",
  usage: "rgbtohex <r>, <g>, <b>"
};
