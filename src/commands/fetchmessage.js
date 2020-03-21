exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  try {
    let fetched = await message.channel.fetchMessage(args[0]);
    let afiles = [];
    
    fetched.attachments.forEach((attachment) => {
      afiles.push({
        name: attachment.filename,
        attachment: attachment.url
      });
    });
    
    let embed = new client.Embed('normal', {
      title: fetched.id,
      url: fetched.url,
      thumbnail: fetched.author.avatarURL,
      footer: "Message created by " + fetched.author.tag,
      description: fetched.content || "No Message",
      files: afiles
    });
    
    message.channel.send(embed);
  } catch (err) {
    message.channel.send('There was an error!\n' + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ['fetm', 'fetchmsg', 'fmsg'],
  guildOnly: false,
  permLevel: 'User'
};

exports.help = {
  name: 'fetchmessage',
  category: 'General',
  description: "Sends the message linked to the specified message ID.",
  usage: 'fetchmessage <id>'
};
