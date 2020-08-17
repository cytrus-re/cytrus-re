const convert = (degree, args, message) => {
  let x;
  if (degree == "C") {
    x = args[1] * 9 / 5 + 32;
    if (isNaN(args[1])) {
      message.reply(args[1] + " is not a number!");
    } else {
      message.channel.send("The temperature in Farenheit is " + Math.round(x) + "°F");
    }
  } else if (degree == "F") {
    x = (args[1] -32) * 5 / 9;
    if (isNaN(args[1])) {
      message.reply(args[1] + " is not a number!");
    } else {
      message.channel.send("The temperature in Celcius is " + Math.round(x) + "°C");
    }
  } else {
    message.reply("You have to choose C or F!");
  }
}

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  try {
    if (args[0] == "C") {
      convert("C", args, message);
    } else if (args[0] == "F") {
      convert("F", args, message);
    } else {
      message.reply("You have to choose C or F!");
    }
  } catch (err) {
    message.channel.send(client.errors.genericError + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ["celfar", ],
  guildOnly: true,
  permLevel: "User"
};

exports.help = {
  name: "convert",
  category: "General",
  description: "Converts Celcius to Farenheit or Farenheit to Celcius.",
  usage: "convert <C/F> <temp>"
};
