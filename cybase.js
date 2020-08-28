"use strict";

// Check if the Node version is 14+
if (Number(process.version.slice(1).split(".")[0]) < 14) throw new Error("Cytrus-RE requires Node 14 or higher. Re-run the bot with Node 14 or higher.");
if (process.env.PREBOOT) eval(process.env.PREBOOT);

// Define NPM modules
const Discord = require("discord.js");
const Enmap = require("enmap");
const CleverBotAPI = require("cleverbot.io");

// Define client
const client = new Discord.Client({
	disableEveryone: true,
	disabledEvents: ["TYPING_START"]
});

// Define time of startup
client.starttime = new Date();

// Define databases/objects
client.profiles = new Enmap({name: "profiles"});
client.logins = new Enmap({name: "logins"});
client.spotify = new Enmap({name: "spotify"});
client.settings = new Enmap({name: "settings"});
client.notes = new Enmap({name: "notes"});
client.bugs = new Enmap({name: "bugreports"});
client.starboard = new Enmap({name: "starboardmid"});
client.warns = new Enmap({name: "warns"});
client.tags = new Enmap({name: "tags"});
client.uses = new Enmap({name: "commandpop"});
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.liusers = new Discord.Collection();
client.music = {};
client.levelCache = {};

// Define CleverBot API
client.cleverbot = new CleverBotAPI(process.env.CLEVERBOT_USER_KEY, process.env.CLEVERBOT_API_KEY);
client.cleverbot.setNick("Cytrus-RE");


// Import files
client.logger = require("./src/modules/Logger");
client.config = require("./src/cnf");
client.errors = require("./src/modules/errors");
require("./src/modules/commands")(client);
require("./src/modules/events")(client);
require("./src/modules/_functions")(client);

// Cache the permissions
for (let i = 0; i < client.config.permLevels.length; i++) {
	let currentlevel = client.config.permLevels[i];
	client.levelCache[currentlevel.name] = currentlevel.level;
}

// Login to Discord
client.login(process.env.BOT_TOKEN);
console.log("[START] Logged into Discord API");
// Set status to Loading
//client.user.setStatus("idle");
//client.user.setActivity("Loading...");

.listen(process.env.PORT || 5000);
// Export the client
module.exports = client;
