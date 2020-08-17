exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  try {
    let msg;
    let noteID;
    let output = "";
    
    switch (args[0]) {
      case "add":
        msg = await message.channel.send("Creating note...");
        noteID = message.author.id + message.id;
        await client.notes.set(noteID, {txt: args.slice(1).join(" "), id: noteID, author: message.author.id});
        msg.edit("Note created! ID: " + noteID);
        break;
      case "remove":
        if (!args[1]) return message.channel.send("You need to give me the note ID!");
        if (client.notes.has(args[1])) {
          if (client.notes.get(args[1]).author !== message.author.id && message.author.permLevel < 6) message.channel.send("You don't own this note!");
          else {
            msg = await message.channel.send("Deleting note...");

            await client.notes.delete(args[1]);
            msg.edit("Note deleted. ID of deleted note: " + args[1]);
          }
        } else message.channel.send("Invalid note ID.");
        break;
      case "clear":
        await client.notes.forEach((note)  => {
          if (note.author == message.author.id) client.notes.delete(note.id);
        });
        
        message.channel.send("Cleared your notes!");
        break;
      case "view":
        if (!args[1]) return message.channel.send("You need to give me the note ID!");
        if (client.notes.has(args[1])) {
          if (client.notes.get(args[1]).author !== message.author.id) message.reply("You don't own this note!");
          else message.channel.send("•" + "*" + client.notes.get(args[1]).id + "*\n" + client.notes.get(args[1]).txt + "\n\n");
        } else message.reply("That is not a valid NoteID!");
        break;
      case "edit":
        if (!args[1]) return message.reply("You need to input the NoteID.");
        if (!args[2]) return message.reply("You need to input the Note Text");
        if (client.notes.has(args[1])) {
          if (client.notes.get(args[1]).author !== message.author.id) message.reply("You don't own this note!");
          else {
            msg = await message.channel.send("Editing note...");

            await client.notes.set(args[1], {txt: args.slice(2).join(" "), id: args[1], author: message.author.id});
            msg.edit("Note edited with the ID of " + args[1]);
          }
        } else message.reply("Invalid NoteID.");
        break;
      default:
          await client.notes.forEach((note)  => {
            if (note.author == message.author.id) output += "•" + "*" + note.id + "*\n" + note.txt + "\n\n";
          });

          if (output == "") message.reply("You have no notes!");
          else message.channel.send(output);
        break;
    }
  } catch (err) {
    message.channel.send(client.errors.genericError + err).catch();
  }
};

exports.conf = {
  enabled: true,
  aliases: ["notes"],
  guildOnly: false,
  permLevel: "User"
};

exports.help = {
  name: "note",
  category: "General",
  description: "Generates a note",
  usage: "note [clear/add [text]/remove [id]/view [id]]"
};
