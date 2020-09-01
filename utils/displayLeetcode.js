const Discord = require("discord.js")
const displayLeetcode = (header, challengeName, id, difficulty, url, topic, topicHeader) => {
	const messageEmbed = new Discord.MessageEmbed()
		.setColor("#00f0ff")
		.setTitle(header)
		.setDescription(`**[${challengeName}](https://leetcode.com${url})**`)
		.addFields(
			{ name: topicHeader, value: topic },
			{ name: "ID", value: id },
			{ name: "Difficulty", value: difficulty }
		);
	return messageEmbed;
};

module.exports = displayLeetcode
