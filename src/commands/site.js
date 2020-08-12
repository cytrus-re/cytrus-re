exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  try {
    message.channel.send("Check it out here: **https://cytrus-re.github.io**");
  } catch (err) {
    message.channel.send(client.errors.genericError + err).catch();
  }
};

//permissions and aliases

exports.conf = {
  enabled: true,
  aliases: ["cytrusresite", "webpage", "page"],
  guildOnly: false,
  permLevel: 'User'
};


//what the command does

exports.help = {
  name: 'Site',
  category: 'system',
  description: 'Send a message to this channel with a link to our (totally good) website hosted on GitHub Pages!',
  usage: 'cyre.site'
};
