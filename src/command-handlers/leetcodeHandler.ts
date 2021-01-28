import { Message, MessageEmbed } from "discord.js";
import { CommandHandlerInterface } from "./commandHandler";
import { LeetcodeServiceInterface } from "../leetcode-service/service";
import { Question } from "../leetcode-service/question";

export class LeetcodeHandler implements CommandHandlerInterface {
	protected service: LeetcodeServiceInterface;
	constructor(service: LeetcodeServiceInterface) {
		this.service = service;
	}

	async handleRandomCommand(message: Message, args: string[]) {
		const difficultyRange = new Set(["easy", "medium", "hard"]);
		const topics = new Set(await this.service.GetAllTopics());
		if (args.length <= 2) {
			const question = await this.service.GetRandomQuestion("", "");
			message.channel.send(showQuestion(question));
			return;
		}

		if (args.length <= 3 && difficultyRange.has(args[2].toLowerCase())) {
			const question = await this.service.GetRandomQuestion(
				args[2].toLowerCase(),
				""
			);
			message.channel.send(showQuestion(question));
			return;
		}
		if (args.length <= 3 && topics.has(args[2].toLowerCase())) {
			const question = await this.service.GetRandomQuestion(
				"",
				args[2].toLowerCase()
			);
			message.channel.send(showQuestion(question));
			return;
		}

		if (args.length <= 3) {
			message.channel.send(showSimpleMessage("Unsuported Params"));
			return;
		}

		if (
			args.length <= 4 &&
			topics.has(args[2].toLowerCase()) &&
			difficultyRange.has(args[3].toLowerCase())
		) {
			const question = await this.service.GetRandomQuestion(
				args[3].toLowerCase(),
				args[2].toLowerCase()
			);
			message.channel.send(showQuestion(question));
			return;
		}

		if (
			args.length <= 4 &&
			topics.has(args[3].toLowerCase()) &&
			difficultyRange.has(args[2].toLowerCase())
		) {
			const question = await this.service.GetRandomQuestion(
				args[2].toLowerCase(),
				args[3].toLowerCase()
			);
			message.channel.send(showQuestion(question));
			return;
		}
		message.channel.send(showSimpleMessage("Unsuported Params"));
	}

	async handleQuestionCommand(message: Message, args: string[]) {
		const id = +args[2];
		const question = await this.service.GetQuestion(id);
		message.channel.send(showQuestion(question));
		return;
	}
	async Handle(message: Message, args: string[]) {
		if (args.length == 1) {
			message.channel.send(showUsage());
			return;
		}
		switch (args[1].toLowerCase()) {
			case "random":
				await this.handleRandomCommand(message, args);
				break;
			case "search":
				break;
			case "question":
				this.handleQuestionCommand(message, args);
				break;
			case "topic":
				break
			default:
				message.channel.send(showSimpleMessage("Unsuported Params"));
				break;
		}

		return;
	}
}
function showQuestion(question: Question): MessageEmbed {
	return new MessageEmbed()
		.setDescription(
			`**[${question.Title}](https://leetcode.com${question.Url})**`
		)
		.setColor("#00f0ff")
		.addField("Topic", question.Topic)
		.addField("ID", question.Id)
		.addField("Difficulty", question.Difficulty);
}
function showSimpleMessage(description: string): MessageEmbed {
	return new MessageEmbed().setDescription(description).setColor("#00f0ff");
}

function showUsage() {
	const usage =
		"`!lc random <easy | medium | hard> <topic>` for a random LC question";
	return new MessageEmbed().setDescription(usage).setTitle("**Usage**");
}
