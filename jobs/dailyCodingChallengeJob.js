const leetcodeStore = require("../store/leetcodeStore");
const QuestionStore = require("../store/QuestionStore")
const Discord = require("discord.js");
const displayLeetcode=require('../utils/displayLeetcode')

const DAILY_CHALLENGE_CHANNEL_ID = process.env.DAILY_CHALLENGE_CHANNEL_ID;

const initLeetcodeStore = (store, keys) => {
	store.topic = keys[Math.floor(Math.random() * keys.length)];
	store.difficulty = numToDifficulty(new Date().getDay());
};


const dailyCodingChallengeJob = async (client) => {
	if (leetcodeStore.topic === "") {
		
		console.log("Leetcode Store initialized!")
		initLeetcodeStore(leetcodeStore, Object.keys(QuestionStore));
	}
	try {
		const channel = await client.channels.fetch(DAILY_CHALLENGE_CHANNEL_ID);
		const challengeList =
			QuestionStore[leetcodeStore.topic][leetcodeStore.difficulty];
		const challenge =
			challengeList[Math.floor(Math.random() * challengeList.length)];
		channel.send(
			displayLeetcode(
				"Daily Coding Challenge!!",
				challenge.title,
				challenge.id,
				challenge.difficulty,
				challenge.url,
				leetcodeStore.topic,
				"This weeks topic"
			)
		);
		const day = new Date().getDay();
		leetcodeStore.difficulty = numToDifficulty(day);
		console.log("Leetcode difficulty changed!")
		if (day === 6) {
			console.log("Leetcode topic changed!")
			keys = Object.keys(QuestionStore)
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



module.exports = dailyCodingChallengeJob;
