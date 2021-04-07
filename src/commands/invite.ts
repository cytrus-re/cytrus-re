exports.run = async (client, message) => {
  try {
    if (message.member.hasPermission("CREATE_INSTANT_INVITE")) {
      message.channel
        .createInvite()
        .then((invite) =>
          message.channel.send(
            `I've succesfuly created the invite!\nCode: https://discord.gg/${invite.code}`
          )
        );
    } else message.reply("You don't have the Create Invite permission!");
  } catch (err) {
    message.channel.send(client.errors.genericError + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ["ci", "createinvite", "invmake"],
  guildOnly: true,
  permLevel: "User",
};

exports.help = {
  name: "invite",
  category: "General",
  description:
    "Creates an invite for the channel that the command was executed in.",
  usage: "invite",
};
