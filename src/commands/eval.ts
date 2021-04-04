exports.run = async (client, message, args, level) => {
  try {
    let code = args.join(" ");
    code = code.replace("process.env.BOT_TOKEN", client.config.token);
    code = code.replace("client.token", client.config.token);

    let evaled = eval(code);
    let clean = await client.clean(client, evaled);
    message.author.send(`\`\`\`js\n${clean}\n\`\`\``);
  } catch (err) {
    message.author.send(
      `\`ERROR\` \`\`\`xl\n${await client.clean(client, err)}\n\`\`\``
    );
  }
};

exports.conf = {
  enabled: true,
  aliases: [],
  guildOnly: false,
  permLevel: "Bot Dev",
};

exports.help = {
  name: "eval",
  category: "System",
  description: "Evaluates arbitrary JS code.",
  usage: "eval [code]",
};
