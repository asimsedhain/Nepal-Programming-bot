const PomodoroStore = require("../store/PomodoroStore");
const displayList = require("../utils/displayList");
const displayMessage = require("../utils/displayMessage");

const POMODORO_DAILY_HEADER = "Daily Pomodoro Rankings:";
const POMODORO_ADDED_HEADER = "Pomodora Added:";

const pomoCommandHandler = (message, args) => {
	const command = args.shift().toLowerCase();
	const countString = args.shift() || "";
	countString.toLowerCase();

	if (countString === "") {
		message.channel.send(
			displayList(PomodoroStore.PomodoroCount, POMODORO_DAILY_HEADER)
		);
		return;
	}

	const count = Number(countString);

	if (!isNaN(count) && count >= 0) {
		username = message.author.username;
		PomodoroStore.PomodoroCount[username] = count;
		message.channel.send(
			displayList({ [username]: count }, POMODORO_ADDED_HEADER)
		);
		console.log(`${username} added ${count} pomodoros`);
		return;
	}

	message.channel.send(
		displayMessage(
			"Usage:",
			`\`${command}\` to see daily rankings.\n\`${command} COUNT\` to insert your pomodoro count. Count has to be a positive number.`
		)
	);

};

module.exports = pomoCommandHandler;
