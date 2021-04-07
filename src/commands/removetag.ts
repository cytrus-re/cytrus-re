exports.run = async (client, message, args) => {
  try {
    let msg = await message.channel.send("Deleting tag...");
    if (!args[0])
      return message.reply("You have to supply the name of the tag!");

    if (!client.tags.has(message.guild.id))
      client.tags.set(message.guild.id, {});
    if (!client.tags.has(message.guild.id, args.join(" ")))
      return message.reply("That's not a valid tag!");

    client.tags.delete(message.guild.id, args.join(" "));

    msg.edit("Tag deleted with the ID of " + message.id + "!");
  } catch (err) {
    message.channel.send(client.errors.genericError + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ["rtag", "rmtag"],
  guildOnly: false,
  permLevel: "Administrator",
};

exports.help = {
  name: "removetag",
  category: "General",
  description: "Removes the specified tag.",
  usage: "removetag <tag>",
};
