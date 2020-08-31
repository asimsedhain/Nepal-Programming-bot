const PomodoroStore = require("../store/PomodoroStore")
const displayList = require("../utils/displayList")

const POMODORO_CHANNEL_ID = process.env.POMODORO_CHANNEL_ID
const POMODORO_DAILY_WINNER_HEADER = "Daily Pomodoro Cup Winner"
const dailyWinner = async (client) => {
	try {
		const channel = await client.channels.fetch(POMODORO_CHANNEL_ID);
		channel.send(displayList(PomodoroStore.PomodoroCount, POMODORO_DAILY_WINNER_HEADER));
		PomodoroStore.PomodoroCount = {};
		console.log("Daily Winner Message Success");
		return;
	} catch (e) {
		console.log(e);
		console.log("Daily Winner Message Failed");
	}
};


module.exports = dailyWinner
