const Minesweeper = require("discord.js-minesweeper");

exports.run = async (client, message, args, level) => { 
  try {
    let minesweeper;
    switch (args[0]) {
      case "1":
        minesweeper = new Minesweeper({
          rows: 5,
          columns: 5,
          mines: 4,
        });
        break;
      case "2":
        minesweeper = new Minesweeper({
          rows: 7,
          columns: 7,
          mines: 6,
          emote: "tada",
        });
        break;
      case "3":
        minesweeper = new Minesweeper({
          rows: 10,
          columns: 10,
          mines: 8,
        });
        break;
      case "4":
        minesweeper = new Minesweeper({
          rows: 14,
          columns: 14,
          mines: 9,
        });
        break;
      case "5":
        minesweeper = new Minesweeper({
          rows: 16,
          columns: 16,
          mines: 13,
        });
        break;
      case "6":
        minesweeper = new Minesweeper({
          rows: 19,
          columns: 19,
          mines: 17,
        });
        break;
      case "7":
        minesweeper = new Minesweeper({
          rows: 24,
          columns: 24,
          mines: 18,
        });
        break;
      case "8":
        minesweeper = new Minesweeper({
          rows: 27,
          columns: 27,
          mines: 23,
        });
        break;
      case "9":
        minesweeper = new Minesweeper({
          rows: 30,
          columns: 30,
          mines: 26,
        });
        break;
      case "10":
        minesweeper = new Minesweeper({
          rows: 35,
          columns: 35,
          mines: 28,
        });
        break;
      default:
        minesweeper = new Minesweeper();
        break;
    }
    
    message.channel.send(minesweeper.start());
  } catch (err) {
    message.channel.send(client.errors.wiiError + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ["sweeper", "sweep"],
  guildOnly: false,
  permLevel: "User"
};

exports.help = {
  name: "minesweeper",
  category: "Game",
  description: "Returns a Minesweeper game. NOTE: Please disable auto-reveal for spoilers before playing.",
  usage: "minesweeper <difficulty>"
};
