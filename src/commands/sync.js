const exec = require('child_process').exec;
exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  try {
    const execute = (command) => {

      message.channel.send('Syncing');
      exec(command, (err, stdout, stderr) => {
        message.author.send(stdout).catch('The output was too big!');
        if (stderr) {
          message.author.send('```'+stderr+'```');
          message.channel.send('Error.');
        }
      });
    }

    execute('sync-glitch');
  } catch (err) {
    message.channel.send('There was an error!\n' + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ['glsync', 'upgli'],
  guildOnly: false,
  permLevel: 'Bot Moderator'
};

exports.help = {
  name: 'sync',
  category: 'System',
  description: 'Syncs the Github repo with Cytrus\'s Glitch instance.',
  usage: 'sync'
};