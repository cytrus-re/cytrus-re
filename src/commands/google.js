const google = require('google');

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  try { 
    if (!args[0]) return message.channel.send("You need to give me something to search for!");
    google.resultsPerPage = 5;

    google(args.join(' '), async (err, res) => {
      
      if (err) return message.channel.send(client.errors.genericError + err);
      
      if (!res.links[0].href) return message.channel.send("I couldn't find anything for your search term!");
      
      let output = '';
      let i = 1;
      
      res.links.forEach(async (l) => {
        output += '\n' + i + '. ' + l.title;
        i++;
      });
      
            
      let page = await client.awaitReply(message, `Please choose the result you want:${output}`);
      if (isNaN(page)) return message.channel.send("That's not a number!");
      let pagenum = Number(page) - 1;
      
      let link = res.links[pagenum];
      
      let embed = new client.Embed('normal', {
        title: link.title,
        url: link.href,
        footer: link.href,
        description: client.truncate(link.description, 2000)
      });
      
      message.channel.send(embed);
    });
  } catch (err) {
    message.channel.send('There was an error!\n' + err).catch();
  }
};

exports.conf = {
  enabled: false, // see below
  aliases: [],
  guildOnly: false,
  permLevel: "User"
};

exports.help = {
  name: "google",
  category: "Search",
  description: "Searches Google for your query.",
  usage: "google <query>"
};

/* seems like the google feature is broken, we have to update it, look at this:
https://stackoverflow.com/questions/56856201/how-to-create-a-google-search-command-in-a-discord-bot */
