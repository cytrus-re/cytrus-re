const Discord = require("discord.js");
const types = ["Psychopath", "Depressed", "Cheerful", "Bright", "Dark", "God", "Deceiver", "Funny", "Fishy", "Cool", "Insecure", "Lonely", "Optimistic", "Brave", "Brilliant", "Dreamer", "Nurturer", "Peaceful", "Hot", "Sexy", "Perfect", "Overthinker", "Idealist"];
const social = ["Loser", "The nice guy", "The cute girl", "Dank memer", "Nerd", "Kinky"];
const relationship = ["Single", "Married", "Taken", "Forever alone"];
const hobbies = ["Art", "Drawing", "Painting", "Singing", "Writing", "Anime", "Memes", "Minecraft", "Coding"];
// Are ya coding son?
const genres = ["Nightcore", "Heavy Metal", "Alternative", "Electronic", "Classical", "Dubstep", "Jazz", "Pop", "Rap", "Country"];

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  try {
    let user = message.mentions.members.first() || message.author;

    let embed = new Discord.RichEmbed()
    .setTitle("Personality")
    .setThumbnail(user.avatarURL)
    .setAuthor(user.username + "'s personality")
    .addField("Type", types.random())
    .addField("Social Status", social.random())
    .addField("Relationship Status", relationship.random())
    .addField("Hobby", hobbies.random())
    .addField("Music Genre", genres.random())
    .setColor("#37dbde");

    message.channel.send(embed);
  } catch (err) {
    message.channel.send(client.errors.genericError + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ["pers"],
  guildOnly: false,
  permLevel: "User"
};

exports.help = {
  name: "personality",
  category: "General",
  description: "Returns your personality.",
  usage: "personality"
};
