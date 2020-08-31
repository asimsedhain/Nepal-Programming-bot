require("dotenv").config();
const Discord = require("discord.js");

const createJob = require("./utils/createJob");
const pomoCommandHandler = require("./handlers/pomoCommandHandler");
const dailyPomodoroResetJob = require("./jobs/dailyPomodoroResetJob");

const TOKEN = process.env.TOKEN;

const client = new Discord.Client();
const commands = {};
commands["!pomo"] = pomoCommandHandler;

client.on("ready", () => {
	console.log(`Logged in as ${client.user.tag}!`);
	createJob(
		"Pomodoro",
		() => {
			dailyPomodoroResetJob(client);
		},
		"0 0 0 * * *"
	);
});

client.on("message", (message) => {
	args = message.content.split(/ +/);
	prefix = args[0];
	if (prefix in commands) {
		commands[prefix](message, args);
	}
});

client.login(TOKEN);
