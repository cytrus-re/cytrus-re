const Discord = require('discord.js');
const crypto = require('crypto');

exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  try {
    if (args[0] == 'create') {
      if (!message.guild) {
        if (client.logins.set(message.author.id)) {
          let passwordRaw = await client.awaitReply(message, 'What do you want as your password?');
          let passwordRawConfirm = await client.awaitReply(message, 'Confirm your password');
          if (passwordRaw !== passwordRawConfirm) return message.channel.send('Your password does not match the confirmation.');
          let password = crypto.createHash('sha256').update(passwordRawConfirm).digest('hex');

          let msg = await message.channel.send('Creating profile...');
          client.logins.set(message.author.id, password);
          msg.edit('Profile Created!');
          client.liusers.set(message.author.id, true);
        } else message.reply('You already have a profile!');
      }
      else message.channel.send('Profile create is unavailable via a guild. Please run this command in DM\'s.');
    } else if (args[0] == 'login') {
      if (!message.guild) {
        let passwordRaw = await client.awaitReply(message, 'What is your password?');
        let password = crypto.createHash('sha256').update(passwordRaw).digest('hex');
        let msg = await message.channel.send('Logging in...');

        if (password == client.logins.get(message.author.id)) {
          client.liusers.set(message.author.id, true);
          msg.edit('Logged in!');
        } else msg.edit('I could not find a user with that password. (If you need help creating an account try using createprofile instead)');
      }

      else message.channel.send('Profile login is unavailable via a guild. Please run this command in DM\'s.');
    }
    
    if (args[0] == 'logout') {
      let msg = await message.channel.send('Logging out...');
      
      if (client.liusers.get(message.author.id)) {
        client.liusers.delete(message.author.id);
        msg.edit('You are logged out!');
      } else msg.edit('You are not logged in! (Use profile login instead)');
    } else if (args[0] == 'password') {
      if (!message.guild) {
        if (args[1] == 'change') {
          if (client.logins.set(message.author.id)) {
            let passwordRaw = await client.awaitReply(message, 'What do you want as your new password?');
            let oldPasswordRaw = await client.awaitReply(message, 'What is your old password?');
            let passwordRawConfirm = await client.awaitReply(message, 'Confirm your password');
            if (passwordRaw !== oldPasswordRaw) return message.channel.send('Your new password does not match the old password.');
            if (passwordRaw !== passwordRawConfirm) return message.channel.send('Your new password does not match the confirmation.');
            let password = crypto.createHash('sha256').update(passwordRawConfirm).digest('hex');

            let msg = await message.channel.send('Changing password..');
            client.logins.set(message.author.id, password);
            msg.edit('Password Changed!');
            client.liusers.set(message.author.id, true);
          }
        } else message.reply('You have to use profile password change instead!');
      }
      else message.channel.send('Profile password is unavailable via a guild. Please run this command in DM\'s.');
    } else if (args[0] == 'edit') {
      if (client.liusers.get(message.author.id)) {
        if (args[1] == 'nickname') {
          if (!client.profiles.get(message.author.id)) {
            client.profiles.set(message.author.id+'nickname', 'Not Specified');
            client.profiles.set(message.author.id+'bio', 'Not Specified');
            client.profiles.set(message.author.id+'hobbies', 'Not Specified');
          }

          let msg = await message.channel.send('Updating nickname...');
          client.profiles.set(message.author.id+'nickname', args.slice(2).join(' '));
          msg.edit('Nickname updated!');
        } else if (args[1] == 'bio') {
          let msg = await message.channel.send('Updating bio...');
          client.profiles.set(message.author.id+'bio', args.slice(2).join(' '));
          msg.edit('Bio updated!');
        } else if (args[1] == 'hobbies') {
          let msg = await message.channel.send('Updating hobbies...');
          client.profiles.set(message.author.id+'hobbies', args.slice(2).join(' '));
          msg.edit('Hobbies updated!');
        } else message.reply('You have to use profile edit nickname/bio/hobbies instead!');
      } else message.reply('You are not logged in!');
    } else if (args[0] == 'view') {
      if (!client.profiles.get(message.author.id+'nickname')) {
        client.profiles.set(message.author.id+'nickname', 'Not Specified');
      }
      if (!client.profiles.get(message.author.id+'bio')) {
        client.profiles.set(message.author.id+'bio', 'Not Specified');
      }
      if (!client.profiles.get(message.author.id+'hobbies')) {
        client.profiles.set(message.author.id+'hobbies', 'Not Specified');
      }
      
      let profile = {nickname: client.profiles.get(message.author.id+'nickname'), 'bio': client.profiles.get(message.author.id+'bio'), hobbies: client.profiles.get(message.author.id+'hobbies')};
      let embed = new Discord.RichEmbed()
      .setTitle('Profile')
      .setColor('#eeeeee')
      .setDescription(`Nickname: ${profile.nickname}
Bio: ${profile.bio}
Hobbies: ${profile.hobbies}`);
      
      message.channel.send(embed);
    }
  } catch (err) {
    message.channel.send('Their was an error!\n' + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: [],
  guildOnly: false,
  permLevel: 'User'
};

exports.help = {
  name: 'profile',
  category: 'General',
  description: 'Shows info for your profile',
  usage: 'profile [create/login/logout/reset]'
};
