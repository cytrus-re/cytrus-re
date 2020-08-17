exports.run = (client, message, args, level) => {
  try {
    let serverPrefix = client.getSettings(message.guild.id).prefix;
    if (!args[0]) {
      let userCommands = client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level);

      let currentCategory = "";
      let output = `Use ${serverPrefix}help <command/alias/category> for details.\n`;
      let sorted = userCommands.array().sort((p, c) => p.help.category > c.help.category ? 1 :  p.help.name > c.help.name && p.help.category === c.help.category ? 1 : -1 );
      
      sorted.forEach(async c => {
        const cat = c.help.category;
        if (currentCategory !== cat) {
          output += `\n**${serverPrefix}help ${cat.toLowerCase()}**`;
          currentCategory = cat;
        }
      });
      
      let embed = new client.Embed("normal", {
        title: "Cytrus-RE Help",
        thumbnail: client.user.avatarURL,
        description: output,
        footer: `Check out the website (${serverPrefix}site) for a list of commands and more!`
      });
      
      message.channel.send(embed);
    } else {
      // Show individual command/alias/category's help
      let command = args[0];
      if (client.commands.has(command) || client.aliases.has(command)) {
        command = client.commands.get(command) || client.aliases.get(command);

        let embedTiny = new client.Embed("blend", {
          title: command.help.name,
          description: `${command.help.description}`,
          fields: [
            {
              title: "Usage",
              text: `${serverPrefix}${command.help.usage}`,
              inline: true
            },
            {
              title: "Aliases",
              text: `${command.conf.aliases.join(" | ") || "None"}`,
              inline: true
            },
            {
              title: "Permission Level",
              text: `${client.levelCache[command.conf.permLevel]} - ${command.conf.permLevel}`,
              inline: true
            },
            {
              title: "Category",
              text: command.help.category,
              inline: true
            },
            {
              title: "Guild only",
              text: command.conf.guildOnly ? "Yes" : "No",
            },
            {
              title: "Enabled",
              text: command.conf.enabled ? "Yes" : "No",
            }
          ]
        });

        message.channel.send(embedTiny);
      } else {
        let currentCategory = "";
        let output = "";
        let userCommands = client.commands.filter(cmd => client.levelCache[cmd.conf.permLevel] <= level);
        
        let sorted = userCommands.array().sort((p, c) => p.help.category > c.help.category ? 1 :  p.help.name > c.help.name && p.help.category === c.help.category ? 1 : -1 );
        sorted.forEach(c => {
          let cat = c.help.category.toLowerCase();
          if (cat == args[0].toLowerCase()) {
            if (level < client.levelCache[c.conf.permLevel]) return;
            output += "**" + c.help.name + "**, ";
          }
        });
        
        if (!output) return message.channel.send("That's not a command, alias, or category!");
        
        let embed = new client.Embed("blend", {
          title: "Cytrus-RE Help",
          description: output,
          thumbnail: client.user.avatarURL
        });
        
        message.channel.send(embed);
      }
    }
  } catch (err) {
    message.channel.send(client.errors.genericError + err.stack).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ["h"],
  guildOnly: false,
  permLevel: "User"
};

exports.help = {
  name: "help",
  category: "System",
  description: "Displays all the available commands for your permission level.",
  usage: "help [command/alias/category]"
};
