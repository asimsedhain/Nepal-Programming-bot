import { Message } from "discord.js";
import { CommandHandlerInterface } from "./commandHandler";
import { LeetcodeServiceInterface } from "../leetcode-service/service";

export class LeetcodeHandler implements CommandHandlerInterface {
	protected service: LeetcodeServiceInterface;
	constructor(service: LeetcodeServiceInterface) {
		this.service = service;
	}

	async Handle(message: Message, args: string[]) {
		switch (args[1].toLowerCase()) {
			case "random":
				break;
			case "search":
				break;
			case "question":
				break;
			default:
				break;
		}

		return;
	}
}
