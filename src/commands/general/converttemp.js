const convert = (degree, args, message) => {
  let x;
  if (degree == "C") {
    x = args[1] * 9 / 5 + 32;
    if (isNaN(args[1])) {
      message.channel.send(args[1] + " is not a number!");
    } else {
      message.channel.send(`The temperature in Farenheit is ${Math.round(x)}°F.`);
    }
  } else if (degree == "F") {
    x = (args[1] -32) * 5 / 9;
    if (isNaN(args[1])) {
      message.channel.send(args[1] + " is not a number!");
    } else {
      message.channel.send(`The temperature in Celcius is ${Math.round(x)}°C.`);
    }
  } else {
    message.channel.send("You have to choose C or F!");
  }
};

exports.run = async (client, message, args) => { 
  try {
    convert(args[0], args, message);
  } catch (err) {
    message.channel.send(client.errors.genericError + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ["celfar", "farcel"],
  guildOnly: true,
  permLevel: "User"
};

exports.help = {
  name: "convert",
  category: "General",
  description: "Converts Celcius to Farenheit or Farenheit to Celcius.",
  usage: "convert <C/F> <temp>"
};
