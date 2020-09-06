require("dotenv").config();
const Discord = require("discord.js");

const client = new Discord.Client();
const registerJob = require("./utils/registerJob");
const registerCommand = require("./utils/registerCommand")
const isRegisteredCommand = require("./utils/isRegisteredCommand")
const executeCommand = require("./utils/executeCommand")

const pomoCommandHandler = require("./handlers/pomoCommandHandler");
const lcCommandHandler = require("./handlers/lcCommandHandler");

const dailyPomodoroResetJob = require("./jobs/dailyPomodoroResetJob");
const dailyCodingChallengeJob = require("./jobs/dailyCodingChallengeJob");

const displayMessage = require("./utils/displayMessage");

const TOKEN = process.env.TOKEN;
const WELCOME_CHANNEL_ID = process.env.WELCOME_CHANNEL_ID;
const ROLES_CHANNEL_ID = process.env.ROLES_CHANNEL_ID;
const RULES_CHANNEL_ID = process.env.RULES_CHANNEL_ID;
const CONVERSATION_CHANNEL_ID = process.env.CONVERSATION_CHANNEL_ID;


client.on("ready", async () => {
	console.log(`Logged in as ${client.user.tag}!`);
	registerJob(
		"Pomodoro",
		() => {
			dailyPomodoroResetJob(client);
		},
		"0 0 0 * * *"
	);
	registerJob(
		"Leetcode",
		() => {
			dailyCodingChallengeJob(client);
		},
		"0 0 0 * * *"
	);
	registerCommand("!pomo", pomoCommandHandler)
	registerCommand("!lc", lcCommandHandler)
});

client.on("message", (message) => {
	args = message.content.split(/ +/);
	prefix = args[0];
	if (isRegisteredCommand(prefix)) {
		executeCommand(prefix, message, args)
	}
});

// TODO
// refactor
client.on("guildMemberAdd", async (member) => {
	try {
		const welcomChannel = await client.channels.fetch(WELCOME_CHANNEL_ID);
		const rulesChannel = await client.channels.fetch(RULES_CHANNEL_ID);
		const rolesChannel = await client.channels.fetch(ROLES_CHANNEL_ID);
		const convChannel = await client.channels.fetch(
			CONVERSATION_CHANNEL_ID
		);
		welcomChannel.send(
			displayMessage(
				`Welcome to Nepal Programming!!`,
				`Hey <@${
					member.user.id
				}>!!\n:arrow_forward: Start by checking out ${rulesChannel.toString()}.\n:arrow_forward: Don't forget to assign yourself a role by heading over to ${rolesChannel.toString()}\n:arrow_forward: Also, come introduce yourself in ${convChannel.toString()}.`
			)
		);
		return;
	} catch (e) {
		console.log(e);
	}
});

client.login(TOKEN);
