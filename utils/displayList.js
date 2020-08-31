const Discord = require("discord.js")

// Display list in sorted order
const displayList = (dict, header) => {
	// chaning the dict into arrays and sorting them according their value
	const items = Object.keys(dict).map(function (key) {
		return [key, dict[key]];
	});
	items.sort(function (first, second) {
		return second[1] - first[1];
	});

	messageEmbed = new Discord.MessageEmbed()
		.setColor("#00f0ff")
		.setTitle(header);
	items.map((item) => {
		messageEmbed.addField(
			`${item[0]}:`,
			`${item[1]} ${item[1] == 1 ? "Pomodoro" : "Pomodoros"}`
		);
	});

	return messageEmbed;
};

module.exports = displayList
