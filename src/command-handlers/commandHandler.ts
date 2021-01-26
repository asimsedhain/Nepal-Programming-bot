import { Message } from "discord.js";

export interface CommandHandlerInterface {
	Handle(message: Message, args: string[]): Promise<void>;
}
