const ud = require("urban-dictionary");

exports.run = async (client, message, args) => {
  try {
    if (!args[0])
      return message.channel.send("You need to give me a word or phrase!");
    ud.term(args.join(" ")).then(async (result) => {
      let output = "";
      let entries = result.entries;
      let i = 1;

      if (entries == [])
        return message.channel.send(
          `I couldn't find any results for ${args.join(" ")}!`
        );

      Object.keys(entries).forEach(async (pageID) => {
        output += "\n" + i + ". " + entries[pageID].word;
        i++;
      });

      let page = await client.awaitReply(
        message,
        `Please choose the page you want, or respond with "abort" to quit:\n${output}`
      );

      if (page.toLowerCase() === "abort")
        return message.channel.send("Aborted.");
      if (isNaN(page)) return message.channel.send(`${page} is not a number!`);

      let urbanEmbed = {
        color: "0xEEEEEE",
        title: entries[page - 1].word,
        fields: [
          {
            name: "Definition",
            value: entries[page - 1].definition,
          },
          {
            name: "Example",
            value: entries[page - 1].example,
          },
        ],
        footer: {
          text: `Requested by ${message.author.tag}`,
        },
      };

      message.channel
        .send({ embed: urbanEmbed })
        .catch((err) =>
          message.channel.send(
            "The definition was too big or there was another error!\n\n" + err
          )
        );
    });
  } catch (err) {
    message.channel.send(client.errors.genericError + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ["urban", "ud"],
  guildOnly: false,
  nsfwOnly: true,
  permLevel: "User",
};

exports.help = {
  name: "urbandictionary",
  category: "Search",
  description: "Searches the Urban Dictionary for your query.",
  usage: "urbandictionary <word/phrase>",
};
