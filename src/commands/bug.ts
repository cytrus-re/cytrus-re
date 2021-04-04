exports.run = async (client, message, args, level) => {
  try {
    let msg;

    switch (args[0]) {
      case "add":
        msg = await message.channel.send("Creating report...");

        await client.bugs.set(message.author.id + message.id, {
          txt: args.slice(1).join(" "),
          id: message.author.id + message.id,
          author: message.author.id,
        });
        msg.edit(
          "Bug report created with the ID of " + message.author.id + message.id
        );
        break;
      case "remove":
        if (client.bugs.has(args[1])) {
          if (level < 6)
            return message.reply(`You do not have permission to use this command.
Your permission level is ${level} (${
              client.config.permLevels.find((l) => l.level === level).name
            })
This command requires level 6 (Bot Support)`);
          msg = await message.channel.send("Deleting bug report...");

          await client.bugs.delete(args[1]);
          msg.edit("Bug report deleted with the ID of " + args[1]);
        } else message.reply("That isn't a valid report ID!");
        break;
      case "clear":
        if (level < 6)
          return message.reply(`You do not have permission to use this command.
Your permission level is ${level} (${
            client.config.permLevels.find((l) => l.level === level).name
          })
This command requires level 6 (Bot Support)`);
        await client.bugs.forEach((report) => {
          client.bugs.delete(report.id);
        });

        message.channel.send("Cleared all bug reports.");
        break;
      default:
        let output = "";

        await client.bugs.forEach((report) => {
          output += "•" + "*" + report.id + "*\n" + report.txt + "\n\n";
        });

        if (output == "") message.reply("There are no bug reports!");
        else message.channel.send(output);
        break;
    }
  } catch (err) {
    message.channel.send(client.errors.genericError + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ["bugrep", "brep", "bugreport"],
  guildOnly: false,
  permLevel: "Bot Support",
};

exports.help = {
  name: "bug",
  category: "System",
  description: "Makes a bug report for you.",
  usage: "bug [add [text]/remove [id]]",
};
