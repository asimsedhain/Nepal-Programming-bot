const Discord = require("discord.js");

// Display embed message
const displayMessage = (header, description) => {
	messageEmbed = new Discord.MessageEmbed()
		.setColor("#00f0ff")
		.setTitle(header)
		.setDescription(description);
	return messageEmbed;
};

module.exports = displayMessage;
