const Discord = require("discord.js");
const cooled = new Discord.Collection();

module.exports = async (client, message) => {
  if (message.author.bot) return;
  if (client.config.denylisted.includes(message.author.id)) return;

  let settings;

  if (message.guild) settings = client.getSettings(message.guild.id);
  else settings = client.config.defaultSettings;

  // checks if message mentions the bot, if so responds with prefix
  const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
  if (message.content.match(prefixMention)) {
    return message.channel.send(
      `My prefix on this guild is \`${settings.prefix}\`!`
    );
  }

  if (message.guild) {
    if (client.tags.has(message.guild.id)) {
      Object.keys(client.tags.get(message.guild.id)).forEach((tagid) => {
        let tag = client.tags.get(message.guild.id)[tagid];

        if (message.content.toLowerCase() == tag.name.toLowerCase())
          message.channel.send(
            tag.text.replace("@user", "<@" + message.author.id + ">")
          );
      });
    }
  }

  if (
    !message.content
      .toLowerCase()
      .startsWith(
        settings.prefix.toLowerCase() ||
          client.config.defaultSettings.prefix.toLowerCase()
      )
  )
    return;

  let args = message.content.slice(settings.prefix.length).trim().split(/ +/g);
  let command = args.shift().toLowerCase();

  let level = client.permlevel(message);

  let cmd = client.commands.get(command) || client.aliases.get(command);

  if (!client.commands.has(command) && !client.aliases.has(command)) return;

  // cooldown stuff
  if (cooled.get(message.author.id)) return message.react("⏳");
  if (client.permlevel(message) < 6) {
    cooled.set(message.author.id, true);
    setTimeout(async () => {
      cooled.delete(message.author.id);
    }, 3000); // three seconds
  }

  if (!message.guild && cmd.conf.guildOnly)
    return message.channel.send(
      "You need to be in a guild to use this command."
    );
  if (message.guild && !message.channel.nsfw && cmd.conf.nsfwOnly)
    return message.channel.send(client.errors.nsfwOnly);

  if (level < client.levelCache[cmd.conf.permLevel]) {
    if (settings.noPermissionNotice === "true") {
      let permsEmbed = {
        color: "#80002a",
        title: "You can't use this command...",
        fields: [
          {
            name: "Your perm levels",
            value: `${level} (${
              client.config.permLevels.find((l) => l.level === level).name
            })`,
          },
          {
            name: "Required perms for this command",
            value: `${client.levelCache[cmd.conf.permLevel]} (${
              cmd.conf.permLevel
            })`,
          },
        ],
        footer: {
          text:
            "Does this seem wrong? Join our support server (c.info) and ask a dev for help.",
        },
      };
      return message.channel.send({ embed: permsEmbed });
    }
  }

  message.author.permLevel = level;

  message.flags = [];
  while (args[0] && args[0][0] === "-") {
    message.flags.push(args.shift().slice(1));
  }

  if (!cmd.conf.enabled && level < 8)
    return message.channel.send("This command is disabled for non-devs."); //this command is disabled for non-devs

  try {
    cmd.run(client, message, args, level);
    client.uses.ensure(cmd.help.name, 1);
    client.uses.inc(cmd.help.name); // for metrics
    client.logger.info(`Command used: ${command}`);
  } catch (err) {
    message.channel.send(client.errors.genericError + err).catch();
  }
};
