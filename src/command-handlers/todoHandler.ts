import { Message, MessageEmbed } from "discord.js";
import { CommandHandlerInterface } from "./commandHandler";
import { TodoServiceInterface } from "../todo-service/service";
import { log } from "../utils";

export class TodoHandler implements CommandHandlerInterface {
	protected service: TodoServiceInterface;
	constructor(service: TodoServiceInterface) {
		this.service = service;
	}

	async Handle(message: Message, args: string[]) {
		try {
			const serverId = <string>message.guild?.id;
			if (args.length < 2) {
				const todos = await this.service.GetAllTodo(serverId);
				if (todos.length === 0) {
					message.channel.send("Nothing to do");
					return;
				}

				const todosString = todos
					.map(
						(todo) =>
							`${todo.Id}: ${todo.IsComplete ? "~~" : ""}${
								todo.Description
							}${todo.IsComplete ? "~~" : ""}`
					)
					.join("\n");

				message.channel.send(
					new MessageEmbed()
						.setTitle("Todos")
						.setDescription(todosString)
				);

				return;
			}
			let todoId: number;
			let description: string;

			switch (args[1].toLowerCase()) {
				case "add":
					description = args.slice(2).join(" ");
					await this.service.AddTodo(description, serverId);
					message.channel.send(showSimpleMessage("Todo Added"));
					break;
				case "remove":
					todoId = +args[2];
					await this.service.RemoveTodo(todoId, serverId);
					message.channel.send(showSimpleMessage("Todo Removed"));
					break;
				case "modify":
					todoId = +args[2];
					description = args.slice(3).join(" ");
					await this.service.ModifyTodo(
						todoId,
						description,
						serverId
					);
					message.channel.send(showSimpleMessage("Todo Modified"));
					break;
				case "mark":
					todoId = +args[2];
					await this.service.ToggleCompletion(todoId, serverId);
					message.channel.send("Todo Marked");
					break;
				case "assign":
					break;
				case "unassign":
					break;
				default:
					break;
			}
		} catch (err) {
			message.channel.send(err.toString());
			log(err);
		}

		return;
	}
}
function showSimpleMessage(description: string): MessageEmbed {
	return new MessageEmbed().setDescription(description);
}
