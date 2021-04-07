const exec = require("child_process").exec;
const os = require("os");

exports.run = async (client, message) => {
  try {
    const execute = (command) => {
      message.channel.send("The files have been sent to your DMs!");
      exec(command, (err, stdout, stderr) => {
        message.author.send(`**${stdout}**\n`);
        if (err || stderr) {
          if (err) {
            message.author.send("```" + err + "```");
          }

          if (stderr) {
            message.author.send("```" + stderr + "```");
          }

          message.channel.send("Shell Error.");
        }
      });
    };
    if (os.platform == "win32") {
      execute("dir"); // are we windows? run this
    } else {
      execute("ls -a "); // ok, we're not windows, run this
    }
  } catch (err) {
    message.channel.send(client.errors.genericError + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ["fls", "ls", "fl"],
  guildOnly: false,
  permLevel: "Bot Support",
};

exports.help = {
  name: "files",
  category: "System",
  description: "Returns all the files for Cytrus.",
  usage: "files",
};
