# Cytrus-RE
[![Open Source Helpers](https://www.codetriage.com/rexogamer/cytrus-re/badges/users.svg)](https://www.codetriage.com/rexogamer/cytrus-re) [![Discord ](https://img.shields.io/discord/596304951718838275?color=Bonk&label=discord&logo=asd&logoColor=ad)](https://discord.gg/ymZmdaA) [![Webpage](https://img.shields.io/website?down_color=lightgrey&down_message=is%20down.&up_message=is%20up%21&url=https%3A%2F%2Fcytrus-re.github.io%2F)](https://cytrus-re.github.io) [![Wiki](https://img.shields.io/badge/Wiki-information%20about%20cytrus--re-informational)](https://github.com/Cytrus-RE/cytrus-re/wiki) ![Size](https://img.shields.io/github/repo-size/Cytrus-RE/cytrus-re?label=Cytrus-RE%20Size) [![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/cytrus-re/cytrus-re)

A multipurpose Discord bot that covers all your needs. If it doesn't, why not help us by [opening an issue](https://github.com/cytrus-re/cytrus-re/issues/new) or [contributing](https://github.com/cytrus-re/cytrus-re/wiki/contributing)?


## Invite the bot
[**Click here!**](https://discordapp.com/api/oauth2/authorize?client_id=596304769333592078&permissions=2113404023&scope=bot)

## Join the support server
[**Click here!**](https://discord.gg/xMyFtrJ)

## How to set up

WARNING:
You are not allowed to rebrand the bot as your own creation. If we find a case of someone doing this, we'll try our hardest to take it down.
You are allowed to self-host it, but your changes MUST be on GitHub.com, as a fork of Cytrus-RE AND credit must be given to the authors of Cytrus-RE. We'll also need to be able to contact you.

By self-hosting Cytrus-RE, you agree to the above.

 Use `cd` to navigate into the cytrus-re folder, and then run
```bash
npm install
``` 
Create a .env file in the directory Cytrus-RE is installed in. Paste the text below into the .env file:  
```js
BOT_TOKEN='`YourBotToken`'
LOG_WEBHOOK_TOKEN='`YourLogChannelWebhookToken`'
LOG_WEBHOOK_ID='`YourLogChannelWebhookID`'
IPINFO_API_KEY='`YourIpinfo.ioAPIKey`'
GITHUB_TOKEN='`YourGithubToken`'
PREBOOT='/*JavaScript Code*/'
```
Replace the values with your personal, specific info such as the token of the bot. (If you're using a service like Glitch or Heroku, make sure to add a `HOSTNAME` variable. Make sure to write the value in TitleCase.)

Finally, start up Cytrus-RE by running ```node cybase.js```.

To see how to make the bot start up automatically and run without needing a terminal emulator always open, look no further than the official [**discord.js guide**](https://discordjs.guide/improving-dev-environment/pm2.html)

## Bot Information
Useful information about the bot:

### Client ID
596304769333592078
