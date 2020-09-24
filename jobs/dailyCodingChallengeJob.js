const OrderedQuestionStore = require("../store/OrderedQuestionStore");
const Discord = require("discord.js");
const displayLeetcode = require("../utils/displayLeetcode");

const DAILY_CHALLENGE_CHANNEL_ID = process.env.DAILY_CHALLENGE_CHANNEL_ID;
const DAILY_CHALLENGE_CHANNEL_ID_THE_GRIND =
	process.env.DAILY_CHALLENGE_CHANNEL_ID_THE_GRIND;

const dailyCodingChallengeJob = async (client) => {
	try {
		const challenge = OrderedQuestionStore[daysSinceFirst()];
		const channelIds = [
			DAILY_CHALLENGE_CHANNEL_ID,
			DAILY_CHALLENGE_CHANNEL_ID_THE_GRIND,
		];
		for (channelId of channelIds) {
			console.log(channelId)
			const channel = await client.channels.fetch(channelId);
			channel.send(
				displayLeetcode(
					"Daily Coding Challenge!!",
					challenge.title,
					challenge.id,
					challenge.difficulty,
					challenge.url,
					challenge.topic,
					"This weeks topic"
				)
			);
		}

		console.log("Daily Challenge Message Success");
	} catch (e) {
		console.log(e);
		console.log("Daily Challenge Message Failed");
	}
};

//Gets the number of days since 09/07/2020
const daysSinceFirst = () => {
	const first = new Date("09/07/2020");
	const today = new Date();
	const diffTime = today.getTime() - first.getTime();
	const diffDays = Math.round(diffTime / (1000 * 3600 * 24));
	return diffDays;
};

module.exports = dailyCodingChallengeJob;
