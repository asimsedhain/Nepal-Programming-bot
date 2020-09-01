const leetcodeStore = require("../store/leetcodeStore");
const Discord = require("discord.js");

const DAILY_CHALLENGE_CHANNEL_ID = process.env.DAILY_CHALLENGE_CHANNEL_ID;

const initLeetcodeStore = (store, keys) => {
	store.topic = keys[Math.floor(Math.random() * keys.length)];
	store.difficulty = numToDifficulty(new Date().getDay());
};


const dailyCodingChallengeJob = async (client, data) => {
	if (leetcodeStore.topic === "") {
		initLeetcodeStore(leetcodeStore, Object.keys(data));
	}
	try {
		const channel = await client.channels.fetch(DAILY_CHALLENGE_CHANNEL_ID);
		const challengeList =
			data[leetcodeStore.topic][leetcodeStore.difficulty];
		const challenge =
			challengeList[Math.floor(Math.random() * challengeList.length)];
		channel.send(
			displayLeetcode(
				"Daily Coding Challenge!!",
				challenge.title,
				challenge.id,
				challenge.difficulty,
				challenge.url,
				leetcodeStore.topic
			)
		);
		const day = new Date().getDay();
		leetcodeStore.difficulty = numToDifficulty(day);
		if (day === 6) {
			keys = Object.keys(data)
			leetcodeStore.topic = keys[Math.floor(Math.random() * keys.length)];
		}
		console.log("Daily Challenge Message Success");
	} catch (e) {
		console.log(e);
		console.log("Daily Challenge Message Failed");
	}
};

const numToDifficulty = (num) => {
	if (num === 0 || num === 1) {
		return "easy";
	}
	if (num === 2 || num === 3 || num === 4 || num === 5) {
		return "medium";
	}
	return "hard";
};

const displayLeetcode = (header, challengeName, id, difficulty, url, topic) => {
	const messageEmbed = new Discord.MessageEmbed()
		.setColor("#00f0ff")
		.setTitle(header)
		.setDescription(`**[${challengeName}](https://leetcode.com${url})**`)
		.addFields(
			{ name: "Weekly Topic", value: topic },
			{ name: "ID", value: id },
			{ name: "Difficulty", value: difficulty }
		);
	return messageEmbed;
};

module.exports = dailyCodingChallengeJob;
