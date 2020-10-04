// Import modules
const fs = require("fs");
const util = require("util");

// Define variables
const promisify = util.promisify;
const readdir = promisify(fs.readdir);

module.exports = (client) => {
  // Get command files
  let i = 1;

  readdir(__dirname + "/../commands/fun/", (err, files) => {
    // If there is an error, return the error
    if (err) return client.logger.error(err);

    // For each file in the file array run this function
    files.forEach((file) => {
      // If the file extension (.py, .js, .md) is not js or ts, ignore it
      if (!file.endsWith(".js" || ".ts")) return;

      // Make the "props" variable the file object
      let props = require(`../commands/fun/${file}`);

      // Split the file name from the file extension
      let commandName = file.split(".")[0];

      // Log that the command is loading
      client.logger.log(`Loading command: ${commandName}. Command ${i}`);

      // Set the command name and the file objects
      client.commands.set(commandName, props);
      props.conf.aliases.forEach((al) => {
        // Set the aliases of the command and file objects
        client.aliases.set(al, client.commands.get(commandName));
      });

      i++;
    });

    console.log();
  });
  readdir(__dirname + "/../commands/game/", (err, files) => {
    // If there is an error, return the error
    if (err) return client.logger.error(err);

    // For each file in the file array run this function
    files.forEach((file) => {
      // If the file extension (.py, .js, .md) is not js or ts, ignore it
      if (!file.endsWith(".js" || ".ts")) return;

      // Make the "props" variable the file object
      let props = require(`../commands/game/${file}`);

      // Split the file name from the file extension
      let commandName = file.split(".")[0];

      // Log that the command is loading
      client.logger.log(`Loading command: ${commandName}. Command ${i}`);

      // Set the command name and the file objects
      client.commands.set(commandName, props);
      props.conf.aliases.forEach((al) => {
        // Set the aliases of the command and file objects
        client.aliases.set(al, client.commands.get(commandName));
      });

      i++;
    });

    console.log();
  });
  readdir(__dirname + "/../commands/general/", (err, files) => {
    // If there is an error, return the error
    if (err) return client.logger.error(err);

    // For each file in the file array run this function
    files.forEach((file) => {
      // If the file extension (.py, .js, .md) is not js or ts, ignore it
      if (!file.endsWith(".js" || ".ts")) return;

      // Make the "props" variable the file object
      let props = require(`../commands/general/${file}`);

      // Split the file name from the file extension
      let commandName = file.split(".")[0];

      // Log that the command is loading
      client.logger.log(`Loading command: ${commandName}. Command ${i}`);

      // Set the command name and the file objects
      client.commands.set(commandName, props);
      props.conf.aliases.forEach((al) => {
        // Set the aliases of the command and file objects
        client.aliases.set(al, client.commands.get(commandName));
      });

      i++;
    });

    console.log();
  });
  readdir(__dirname + "/../commands/moderation/", (err, files) => {
    // If there is an error, return the error
    if (err) return client.logger.error(err);

    // For each file in the file array run this function
    files.forEach((file) => {
      // If the file extension (.py, .js, .md) is not js or ts, ignore it
      if (!file.endsWith(".js" || ".ts")) return;

      // Make the "props" variable the file object
      let props = require(`../commands/moderation/${file}`);

      // Split the file name from the file extension
      let commandName = file.split(".")[0];

      // Log that the command is loading
      client.logger.log(`Loading command: ${commandName}. Command ${i}`);

      // Set the command name and the file objects
      client.commands.set(commandName, props);
      props.conf.aliases.forEach((al) => {
        // Set the aliases of the command and file objects
        client.aliases.set(al, client.commands.get(commandName));
      });

      i++;
    });

    console.log();
  });
  readdir(__dirname + "/../commands/search/", (err, files) => {
    // If there is an error, return the error
    if (err) return client.logger.error(err);

    // For each file in the file array run this function
    files.forEach((file) => {
      // If the file extension (.py, .js, .md) is not js or ts, ignore it
      if (!file.endsWith(".js" || ".ts")) return;

      // Make the "props" variable the file object
      let props = require(`../commands/search/${file}`);

      // Split the file name from the file extension
      let commandName = file.split(".")[0];

      // Log that the command is loading
      client.logger.log(`Loading command: ${commandName}. Command ${i}`);

      // Set the command name and the file objects
      client.commands.set(commandName, props);
      props.conf.aliases.forEach((al) => {
        // Set the aliases of the command and file objects
        client.aliases.set(al, client.commands.get(commandName));
      });

      i++;
    });

    console.log();
  });
  readdir(__dirname + "/../commands/testing/", (err, files) => {
    // If there is an error, return the error
    if (err) return client.logger.error(err);

    // For each file in the file array run this function
    files.forEach((file) => {
      // If the file extension (.py, .js, .md) is not js or ts, ignore it
      if (!file.endsWith(".js" || ".ts")) return;

      // Make the "props" variable the file object
      let props = require(`../commands/testing/${file}`);

      // Split the file name from the file extension
      let commandName = file.split(".")[0];

      // Log that the command is loading
      client.logger.log(`Loading command: ${commandName}. Command ${i}`);

      // Set the command name and the file objects
      client.commands.set(commandName, props);
      props.conf.aliases.forEach((al) => {
        // Set the aliases of the command and file objects
        client.aliases.set(al, client.commands.get(commandName));
      });

      i++;
    });

    console.log();
  });
  readdir(__dirname + "/../commands/utility/", (err, files) => {
    // If there is an error, return the error
    if (err) return client.logger.error(err);

    // For each file in the file array run this function
    files.forEach((file) => {
      // If the file extension (.py, .js, .md) is not js or ts, ignore it
      if (!file.endsWith(".js" || ".ts")) return;

      // Make the "props" variable the file object
      let props = require(`../commands/utility/${file}`);

      // Split the file name from the file extension
      let commandName = file.split(".")[0];

      // Log that the command is loading
      client.logger.log(`Loading command: ${commandName}. Command ${i}`);

      // Set the command name and the file objects
      client.commands.set(commandName, props);
      props.conf.aliases.forEach((al) => {
        // Set the aliases of the command and file objects
        client.aliases.set(al, client.commands.get(commandName));
      });

      i++;
    });

    console.log();
  });
};
