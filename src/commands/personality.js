const Discord = require("discord.js");
const types = ["Psychopath", "Depressed", "Cheerful", "Bright", "Dark", "God", "Deceiver", "Funny", "Suspicious", "Cool", "Insecure", "Lonely", "Optimistic", "Brave", "Brilliant", "Dreamer", "Nurturer", "Peaceful", "Hot", "Sexy", "Perfect", "Overthinker", "Idealist"];
const social = ["Loser", "The nice guy", "The cute girl", "Dank memer", "Nerd", "Kinky", "Redditor", "Introvert"];
const relationship = ["Single", "Married", "Taken", "Forever alone"];
const hobbies = ["Art", "Drawing", "Painting", "Singing", "Writing", "Anime", "Memes", "Minecraft", "Coding"];
// Are ya coding son?
const genres = ["Nightcore", "Heavy Metal", "Alternative", "Electronic", "Classical", "Dubstep", "Jazz", "Pop", "Rap", "Country", "Vaporwave"];
exports.run = async (client, message, args, level) => { 
  try {
    let embed = new Discord.MessageEmbed()
    .setTitle("Personality")
    .setThumbnail(user.avatarURL)
    .setAuthor(`<@${message.author.id}>` + "'s personality")
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
