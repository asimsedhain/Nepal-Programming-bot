import { Message, MessageEmbed } from "discord.js";
import { CommandHandlerInterface } from "./commandHandler";

export interface CommandRunnerInterface {
	Register(prefix: string, handler: CommandHandlerInterface): void;
	Execute(message: Message): void;
}

type storeInterface = { [key: string]: CommandHandlerInterface };

export class CommandRunner implements CommandRunnerInterface {
	protected store: storeInterface;
	constructor(store: storeInterface) {
		this.store = store;
	}

	Register(prefix: string, handler: CommandHandlerInterface) {
		if (prefix.trim() === "") {
			throw "Empty string not allowed";
		}
		if (prefix in this.store) {
			throw "Prefix already registered";
		}

		this.store[prefix] = handler;

		return;
	}

	Execute(message: Message) {
		try {
			const args = message.content.split(/ +/);
			if (args.length == 0) {
				return;
			}
			const prefix = args[0];
			if (!(prefix in this.store)) {
				return;
			}
			this.store[prefix].Handle(message, args);
		} catch (err) {
			message.channel.send(new MessageEmbed().setDescription(err));
		}

		return;
	}
}
