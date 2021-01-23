const config = {
  "botName": "Cytrus-RE", // Name of bot. Don't change this.
  // NOTE: The IDs are sorted by the comments. So, Commandblock is the first ID in "managers", and then comes... well, we don't have any other managers yet but yeah.
  "owners": ["395990735934980097"], // rexo has full power ahahahaha
  "managers": ["429353559566319626", "746149573613060176"], // commandblock & midou (yes i'm back)
  "admins": ["390663607849058307"], // derser
  "devs": ["315843700490240002", "486899102760697856"], //Odyssey346 & his alt
  "mods": [], 
  "support": ["457110625110327296"],
  "helpers": [],

  "blacklisted": [], // Blacklisted IDs
  "globalBan": [],
  "token": "process.env.BOT_TOKEN",
  // LINKS:
  "github": "https://terrific-tea.github.io/links/cygithub",
  "supportServer": "https://terrific-tea.github.io/links/discord",
  "botInvite": "https://terrific-tea.github.io/links/cyinvite",

  "defaultSettings" : {
    "prefix": "c.", // Default prefix
    "modLogChannel": "log", // default logging channel
    "modRole": "Moderator",
    "adminRole": "Administrator",
    "muteRole": "Cytrus-RE Mute",
    "noPermissionNotice": true,
    "welcomeChannel": "off-topic",
    "welcomeMessage": "Welcome to the server, {{ping}}!",
    "welcomeEnabled": "true",
    "logMessageUpdates": "true",
    "logEmojiUpdates": "true",
    "logMemberUpdates": "true",
    "starboardChannel": "starboard", // Starboard channel name
    "maxWarnsBeforeBan": 3
  },

  permLevels: [
    { level: 0,
      name: "Blacklisted",

      check: () => true
    },

    { level: 1,
      name: "User",

      check: (message) => !config.blacklisted.includes(message.author.id) || !config.globalBan.includes(message.author.id)
    },

    { level: 2,
      name: "Moderator",

      check: (message) => {
        try {
          const modRole = message.guild.roles.find(r => r.name.toLowerCase() === client.getSettings(message.guild.id).modRole.toLowerCase());
          if (modRole && message.member.roles.has(modRole.id) || message.member.hasPermission("MANAGE_MESSAGES")) return true;
        } catch (e) {
          return false;
        }
      }
    },

    { level: 3,
      name: "Administrator",

      check: (message) => {
        try {
          const adminRole = message.guild.roles.find(r => r.name.toLowerCase() === client.getSettings(message.guild.id).adminRole.toLowerCase());
          if (message.member.roles.has(adminRole.id) || message.member.hasPermission("ADMINISTRATOR")) return true;
        } catch (e) {
          return false;
        }
      }
    },

    { level: 4,
      name: "Server Owner",

      check: (message) => message.channel.type === "text" ? (message.guild.ownerID === message.author.id ? true : false) : false
    },

    {
      level: 5,
      name: "Bot Helper",

      check: (message) => config.helpers.includes(message.author.id)
    },

    {
      level: 6,
      name: "Bot Support",

      check: (message) => config.support.includes(message.author.id)
    },

    {
      level: 7,
      name: "Bot Moderator",

      check: (message) => config.mods.includes(message.author.id)
    },

    {
      level: 8,
      name: "Bot Dev",

      check: (message) => config.devs.includes(message.author.id)
    },

    {
      level: 9,
      name: "Bot Admin",

      check: (message) => config.admins.includes(message.author.id)
    },

    {
      level: 10,
      name: "Bot Manager",

      check: (message) => config.managers.includes(message.author.id)
    },

    { level: 11,
      name: "Bot Owner",

      check: (message) => config.owners.includes(message.author.id)
    }
  ]
};

module.exports = config;
