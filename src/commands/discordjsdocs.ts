const fetcher = require("node-fetch");

exports.run = async (client, message, args, level) => {
  try {
    if (!args[0]) return message.channel.send(client.errors.noQueryGiven);
    let url = `https://djsdocs.sorta.moe/v2/embed?src=stable&q=${encodeURIComponent(
      args.join(" ")
    )}`;
    fetcher(url)
      .then((res) => res.json())
      .then((embed) => {
        if (embed && !embed.error) {
          message.channel.send({ embed });
        } else {
          message.channel.send(
            `I couldn't find anything in the Discord.JS docs for "${args.join(
              " "
            )}"...`
          );
        }
      });
  } catch (err) {
    message.channel.send(client.errors.genericError + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ["djs", "djsdocs", "discordjs"],
  guildOnly: false,
  permLevel: "User",
};

exports.help = {
  name: "discordjsdocs",
  category: "Search",
  description: "Searches the Discord.js docs for your query.",
  usage: "discordjsdocs <query>",
};
