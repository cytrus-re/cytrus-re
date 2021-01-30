exports.run = async (client, message, args) => { 

	function rgb2hex(r, g, b) {

		//get the rgb colours by parsing the integers from r, g and b)
		let rInt = parseInt(r);
		let gInt = parseInt(g);
		let bInt = parseInt(b);	

		//if any number is larger than 0xFF, spit an error
		if (isNaN(rInt) || isNaN(gInt) || isNaN(bInt) || rInt > 255 || gInt > 255 || bInt > 255) {
			return message.channel.send({ embed: { color:"ff3333", title: "Incorrect format!", description: "RGB color codes include **3** numbers from **0** to **255**, separated by commas and spaces", footer: { text: "Example: \"114, 137, 218\"" } } });
		}

		//convert the rgb colours to base 16 strings
		let rHex = rInt.toString(16);
		let gHex = gInt.toString(16);
		let bHex = bInt.toString(16);

		//join the 3 hex values together
		let colourOut = rHex + gHex + bHex;

		return colourOut;
	}

	function hex2rgb(hexvalue) {

		//get the hex code and remove the hash, if any
		let hexColour = hexvalue.replace("#", "");

		if (testhexvalidity(hexColour)) {
		
		//get the 3 values for red, green and blue by parsing hexadecimal integers from the hex array's digits...

		//0 and 1 for red (the second argument of "substring(start, end)" is non-inclusive)
		let r = parseInt(hexColour.substring(0, 2), 16);
		//2 and 3 for green
		let g = parseInt(hexColour.substring(2, 4), 16);
		//and 4 and 5 for blue
		let b = parseInt(hexColour.substring(4, 6), 16);

		let colourOut = `rgb(${r}, ${g}, ${b})`;

		return colourOut;

		} else return;

	}

	function randomColour() {

		//generate a random decimal number from 0 to 255 for each of the RGB values
		let randomR = Math.floor(Math.random() * 255) + 1; 
		let randomG = Math.floor(Math.random() * 255) + 1; 
		let randomB = Math.floor(Math.random() * 255) + 1; 
		let colourOut = [randomR, randomG, randomB];
		return colourOut;
	}

	function testhexvalidity(hex) { //tests if a hex value is valid or not

		//if the hex number isn't 6 chars long, error out
		if (hex.length != 6) {
			return message.channel.send({ embed: { color:"ff3333", title: "Incorrect format!", description: "Hex colour codes include **6** of the following characters:\n1, 2, 3, 4, 5, 6, 7, 8, 9, 0, a, b, c, d, e and f", footer: { text: "Example: \"#7289da\"" } } });
		}

		//test each hex digit. If any aren't 0-9 or a-f then error out.
		let regex = /[0-9]|[a-f]/;
		for (let i = 0; i < hex.length; i++) {
			if (!regex.test(hex[i])) {
				return message.channel.send({ embed: { color:"ff3333", title: "Incorrect format!", description: "Hex colour codes include **6** of the following characters:\n1, 2, 3, 4, 5, 6, 7, 8, 9, 0, a, b, c, d, e and f", footer: { text: "Example: \"#7289da\"" } } });
			}
		}
		return 1; //if all is good, exit with 1;
	}
	try {

		switch (args[0]) {
			case "rgbtohex":

				if (!args[1] || !args[2] || !args[3]) return message.channel.send("You have to give me an rgb code!\nSee `help colourutil` for more information.");

				let hexOut = rgb2hex(args[1], args[2], args[3]);

				//send the hex value as an embed
				message.channel.send({ embed: { color: hexOut, title: "RGB to hex", description: `rgb(${parseInt(args[1])}, ${parseInt(args[2])}, ${parseInt(args[3])}) converts to \n hex #${hexOut}`}});
			break;

			case "hextorgb":

				if (!args[1]) return message.channel.send("You have to give me a hex code!");
				let rgbOut = hex2rgb(args[1]);

				//send the rgb values as an embed
				message.channel.send({ embed: { color: args[1], title: "Hex to RGB", description : `${args[1]} converts to ${rgbOut}`}});
			break;

				case "random":
				let rndCol = randomColour(); //get random RGB colours
				let rndRGB = `rgb(${rndCol[0]}, ${rndCol[1]}, ${rndCol[2]})`; //format properly
				let rndHex = rgb2hex(rndCol[0], rndCol[1], rndCol[2]); //convert to hex

				message.channel.send({ embed: { color: rndHex, title: "Random Colour", description : `Your random colour is ${rndRGB}, or hex #${rndHex}`}});
			break;

			case "viewhex":

				if (!args[1]) return message.channel.send("You have to give me a hex code!\nSee `help colourutil` for more information.");
				if (testhexvalidity(args[1])) {
					message.channel.send({ embed: { color: args[1], title: `#${args[1]}` }});
				} else return;

				
			break;

			case "viewrgb":

				if (!args[1] || !args[2] || !args[3]) return message.channel.send("You have to give me an rgb code!\nSee `help colourutil` for more information.");

				let rInt = parseInt(args[1]);
				let gInt = parseInt(args[2]);
				let bInt = parseInt(args[3]);
				if (isNaN(rInt) || isNaN(gInt) || isNaN(bInt) || rInt > 255 || gInt > 255 || bInt > 255) {
					return message.channel.send({ embed: { color:"ff3333", title: "Incorrect format!", description: "RGB color codes include **3** numbers from **0** to **255**, separated by commas and spaces", footer: { text: "Example: \"114, 137, 218\"" } } });
				}
				let hexViewable = rgb2hex(rInt, gInt, bInt);
				message.channel.send({ embed: { color: hexViewable, title: `rgb(${rInt}, ${gInt}, ${bInt})` }}); 
			break;

			default:
				return message.channel.send("You need to provide a valid verb!\n see `help colourutil` for more information.");
		}
	} catch (err) {

		message.channel.send(client.errors.genericError + err).catch();

	}
};

exports.conf = {
	enabled: true, 
	aliases: ["cutil", "color", "colorutil", "colour"],
	guildOnly: false,
	permLevel: "User"
};

exports.help = {
	name: "colourutil",
	category: "Utility",
	description: "Various colour-related utilities.\nGet a random colour, convert a hex colour code to rgb and vice versa.",
	usage: "colourutil <verb> <args>\n<verb> can either be \"rgbtohex\", \"hextorgb\", \"viewhex\", \"viewrgb\" or \"random\".\nrgbtohex converts an rgb colour value to hex and takes an rgb value as an argument (e.g. \"114, 137, 218\")\nhextorgb converts a hex colour value to rgb and takes a hex value as an argument (e.g. #7289DA),\nviewhex lets you visualise a hex colour value and takes a hex value as an argument,\nviewrgb lets you visualise an rgb colour value and takes an rgb value as an argument,\nrandom gives a random number and takes no arguments." 
};