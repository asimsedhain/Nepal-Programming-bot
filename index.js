const Discord = require("discord.js");
const CronJob = require("cron").CronJob;
const client = new Discord.Client();
require("dotenv").config();

const TOKEN = process.env.TOKEN;
const PREFIX = process.env.PREFIX;
const HEADER = process.env.HEADER;
const WINNER_HEADER = process.env.WINNER_HEADER;
const ADDED_HEADER = process.env.ADDED_HEADER;
const CHANNEL_ID = process.env.CHANNEL_ID;

let PomodoroCount = {};

client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}!`);
	console.log(`Start with ${PREFIX}`);
	let job = new CronJob(
		"0 0 0 * * *",
		dailyWinner,
		null,
		true,
		"Asia/Kathmandu"
	);
	job.start();
	console.log("Cron job stated!");
});

client.on("message", (message) => {
	if (!message.content.startsWith(PREFIX) || message.author.bot) return;

	const args = message.content.slice(PREFIX.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (command === "") {
		message.channel.send(displayList(PomodoroCount, HEADER));
		return;
	}

	const count = Number(command);
	if (!isNaN(count)) {
		username = message.author.username;
		PomodoroCount[username] = count;
		message.channel.send(displayList({ [username]: count }, ADDED_HEADER));
		console.log(`${username} added ${count} pomodoros`);
		return;
	}

	message.channel.send(
		"Usage: `" +
			PREFIX +
			"` to see daily rankings. `" +
			PREFIX +
			" COUNT` to insert your pomodoro count. "
	);
});

client.login(TOKEN);

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

const dailyWinner = async () => {
	try {
		const channel = await client.channels.fetch(CHANNEL_ID);
		channel.send(displayList(PomodoroCount, WINNER_HEADER));
		PomodoroCount = {};
		console.log("Daily Winner Message Success");
		return;
	} catch (e) {
		console.log(e);
		console.log("Daily Winner Message Failed");
	}
};
