const request = require("request");

exports.run = async (client, message, args, level) => {
  try {
    if (!args[0]) return message.channel.send("You need to give me something to search for!");
    
    request({
      "url": "https://api.github.com/search/repositories?q=" + encodeURIComponent(args.join(" ")),
      "headers": {
        "Accept": "application/vnd.github.v3+json",
        "Authorization": "token " + process.env.GITHUB_TOKEN,
        "User-Agent": "TerrificTeaStudios-CytrusRE"
      },
      "json": true
    }, async (req, res, json) => { 
      let output = "";
      let i = 1;
      
      if (!json.items[0]) return message.channel.send("I couldn't find any results!");
      if (json.items.length > 5) json.items.length = 5;
      
      json.items.forEach((repo) => {
        let title = repo.name;
        output += "\n" + i + ". " + title;
        i++;
      });
      
      let reponum = await client.awaitReply(message, `Please choose the repository you want.${output}`);
      if (isNaN(reponum)) return message.channel.send("That's not a number!");
      
      let repo = json.items[reponum - 1];
      
      request({
        "url": repo.url,
        "headers": {
          "Accept": "application/vnd.github.v3+json",
          "Authorization": "token " + process.env.GITHUB_TOKEN,
          "User-Agent": "TerrificTeaStudios-CytrusRE"
        },
        "json": true
      }, (req, res, json) => {
        let embed = new client.Embed("normal", {
          title: json.full_name,
          url: json.html_url,
          description: json.description,
          author: {
            name: json.owner.login,
            icon: json.owner.avatar_url,
            url: json.owner.html_url
          },
          fields: [
            {
              title: "License",
              text: json.license ? json.license.name : "No license",
              inline: true
            },
            {
              title: "Open Issues",
              text: json.open_issues_count,
              inline: true
            },
            {
              title: "Language",
              text: json.language || "Not specified",
              inline: true
            },
            {
              title: "Homepage",
              text: json.homepage || "None",
              inline: true
            }
          ]
        });
        message.channel.send(embed);
      });
    });
  } catch (err) {
    message.channel.send(client.errors.genericError + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: [],
  guildOnly: false,
  permLevel: "User"
};

exports.help = {
  name: "github",
  category: "Search",
  description: "Searches GitHub for your query.",
  usage: "github <query>"
};
