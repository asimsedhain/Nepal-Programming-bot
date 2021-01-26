import dotenv from "dotenv";
dotenv.config();

import { log } from "./utils/logger";

import Discord from "discord.js";
import mongoose from "mongoose";
import { CommandRunner, CommandStore, TodoHandler } from "./command-handlers";
import { TodoService, MongoStore as TodoStore } from "./todo-service";
const TOKEN = process.env.TOKEN;
const MONGO_URI: string = <string>process.env.MONGO_URI;

const commandRunner = new CommandRunner(CommandStore);

mongoose.connect(
	MONGO_URI,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	async () => {
		log("Connected to MongoDB");
	}
);

const client = new Discord.Client();

client.on("ready", async () => {
	log(`Logged in as ${client.user?.tag}`);
	const todoService = new TodoService(new TodoStore());
	const todoHandler = new TodoHandler(todoService);

	commandRunner.Register("!todo", todoHandler);
	log("Commands loaded");
});

client.on("message", async (message) => {
	commandRunner.Execute(message);
});

client.login(TOKEN);
