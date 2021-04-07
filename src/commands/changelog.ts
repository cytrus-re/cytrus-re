exports.run = async (client, message) => {
  try {
    message.channel.send({
      embed: {
        author: { name: client.user.username, icon_url: client.user.avatarURL },
        color: 0x1167b1,
        title: "**V1.4.1**",
        description:
          "A **lot** has changed in 1.4, and the team has almost entirely changed, so this isn't an exhaustive list.",
        fields: [
          {
            name: "1.4.1 changes",
            value:
              "- Added the `fact` command! Use this command to find out some fun facts about Cytrus-RE.\n- Added embeds to `c.math` and `c.colourutil` (when you haven't specified an action).\n- Fixed a few bugs (specifically, the version number was outdated in a few places + some code fixes).",
          },
          {
            name: "Major changes",
            value:
              "- The prefix has changed from `cyre.` to `c.`, making it a lot easier to type.\n- The bot has been HEAVILY cleaned up, with a switch to Typescript and extensive code rewrites.\nFinally, the team has changed. Rexo is still leading the project, Devnol has mostly retired and Odyssey has left. Don't worry, - nothing major will change.",
          },
          {
            name: "New and updated commands!",
            value:
              "We didn't necessarily focus on *new* commands in 1.4, but we did combine a couple. The `aes256` commands are now arguments for `aes256`, while the hex and RGB commands are under `colourutil`. Run `c.help` for more info about these two.",
          },
          {
            name: "More grammatical fixes!",
            value:
              "At this point, there should be basically no grammatical errors. Sorry about our mess!",
          },
          {
            name: "Minor improvements",
            value:
              "- We've switched a lot of messages to embeds, making them look a lot nicer with more info.\n- We've also polished our development process and the bot, meaning releases will be more frequent and of better quality + the bot will be much more stable.\n- Finally: since 1.3, we've found consistent hosting! Unfortunately, the host clears server config upon the bot restarting. However, the bot's uptime is basically 100%.",
          },
          {
            name: "Bug fixes",
            value:
              "With the amount of bug fixes since 1.3, I couldn't even begin to list them all here but suffice to say almost all commands should be free of major bugs. (We're still working on fixing a few commands, so stay tuned!)",
          },
          {
            name: "Closing notes",
            value: `I feel like I can only really say one thing: sorry. I truly apologise for the wait between 1.3 and this, the general instability and the mess that was TTS. However, I have hope for the future. With a refreshed server, team and code, things are looking up for Cy-RE. If you have any suggestions, bug reports or general comments for us, please [join our Discord server](${client.config.supportServer}). From the bottom of my heart, thank you so much for your support. - Rexo`,
          },
        ],
        footer: {
          text:
            "Cytrus-RE 1.4.0 & 1.4.1 was made possible by Rexowogamer#1183, Odyssey346#9848, Devnol#9366 and outside contributors. Thank you!",
        },
      },
    });
  } catch (err) {
    message.channel.send(client.errors.genericError + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ["changes", "updates"],
  guildOnly: false,
  permLevel: "User",
};

exports.help = {
  name: "changelog",
  category: "Utility",
  description: "Returns the latest changelog for Cytrus-RE.",
  usage: "changelog",
};
