const QuestionStore = require("../store/QuestionStore");
const displayMessage = require("../utils/displayMessage");
const displayLeetcode = require("../utils/displayLeetcode");

const lcCommandHandler = (message, args) => {
	const command = args.shift().toLowerCase();
	const difficulty = args.shift() || "";
	difficulty.toLowerCase();

	if (
		difficulty === "easy" ||
		difficulty === "medium" ||
		difficulty === "hard"
	) {
		let challengeList = null;
		let keys
		let topic
		while (challengeList===null||challengeList.length === 0) {
			keys = Object.keys(QuestionStore);
			topic = keys[Math.floor(Math.random() * keys.length)];
			challengeList = QuestionStore[topic][difficulty];
		}
		const challenge =
			challengeList[Math.floor(Math.random() * challengeList.length)];
		message.channel.send(
			displayLeetcode(
				"Random Leetcode Question",
				challenge.title,
				challenge.id,
				challenge.difficulty,
				challenge.url,
				topic,
				"Challenge Topic"
			)
		);

		return;
	}
	message.channel.send(
		displayMessage(
			"Usage:",
			`\`${command} <easy | medium | hard>\` to pick a random leetcode question.`
		)
	);
};

module.exports = lcCommandHandler;
