require("dotenv").config();
const TOKEN = process.env.TOKEN;
const WELCOME_CHANNEL_ID = process.env.WELCOME_CHANNEL_ID;
const ROLES_CHANNEL_ID = process.env.ROLES_CHANNEL_ID;
const RULES_CHANNEL_ID = process.env.RULES_CHANNEL_ID;
const CONVERSATION_CHANNEL_ID = process.env.CONVERSATION_CHANNEL_ID;
const Discord = require("discord.js");

const createJob = require("./utils/createJob");
const pomoCommandHandler = require("./handlers/pomoCommandHandler");
const dailyPomodoroResetJob = require("./jobs/dailyPomodoroResetJob");
const displayMessage = require("./utils/displayMessage");

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
