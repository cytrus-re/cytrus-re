const exec = require("child_process").exec;
exports.run = async (client, message, args) => {
  try {
    const execute = (command) => {
      message.channel.send("Command executed in shell!");
      exec(command, (err, stdout, stderr) => {
        message.author.send(stdout).catch("The output was too big!");
        if (stderr) {
          message.author.send("```" + stderr + "```");

          message.channel.send("Shell error!");
        }
      });
    };

    execute(args.join(" "));
  } catch (err) {
    message.channel.send(client.errors.genericError + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ["exec"],
  guildOnly: false,
  permLevel: "Bot Manager",
};

exports.help = {
  name: "execute",
  category: "System",
  description: "Executes a command in the shell.",
  usage: "execute <shell-command>",
};
