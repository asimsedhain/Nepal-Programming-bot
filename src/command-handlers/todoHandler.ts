import { Message, MessageEmbed } from "discord.js";
import { CommandHandlerInterface } from "./commandHandler";
import { TodoServiceInterface } from "../todo-service/service";
import { log } from "../utils";

export class TodoHandler implements CommandHandlerInterface {
	protected service: TodoServiceInterface;
	constructor(service: TodoServiceInterface) {
		this.service = service;
	}

	async handleListCommand(message: Message) {
		const serverId = <string>message.guild?.id;
		const todos = await this.service.GetAllTodo(serverId);
		if (todos.length === 0) {
			message.channel.send("Nothing to do");
			return;
		}

		const todosString = todos
			.map(
				(todo) =>
					`**${todo.Id}: ${todo.IsComplete ? "~~" : ""}${
						todo.Description
					}${todo.IsComplete ? "~~" : ""}**\n${Array.from(
						todo.AssignedUsers.values()
					).join(" ")}`
			)
			.join("\n\n");

		message.channel.send(
			new MessageEmbed().setTitle("**Todos**").setDescription(todosString)
		);
	}

	async handleAddCommand(message: Message, args: string[]) {
		const serverId = <string>message.guild?.id;
		const description = args.slice(2).join(" ");
		await this.service.AddTodo(description, serverId);
		message.channel.send(showSimpleMessage("Todo Added"));
	}

	async handleRemoveCommand(message: Message, args: string[]) {
		const serverId = <string>message.guild?.id;
		const todoId = +args[2];
		await this.service.RemoveTodo(todoId, serverId);
		message.channel.send(showSimpleMessage("Todo Removed"));
	}

	async handleModifyCommand(message: Message, args: string[]) {
		const serverId = <string>message.guild?.id;
		const todoId = +args[2];
		const description = args.slice(3).join(" ");
		await this.service.ModifyTodo(todoId, description, serverId);
		message.channel.send(showSimpleMessage("Todo Modified"));
	}

	async handleMarkCommand(message: Message, args: string[]) {
		const serverId = <string>message.guild?.id;
		const todoId = +args[2];
		await this.service.ToggleCompletion(todoId, serverId);
		message.channel.send(showSimpleMessage("Todo Marked"));
	}

	async handleAssignCommand(message: Message, args: string[]) {
		const serverId = <string>message.guild?.id;
		const todoId = +args[2];
		const user = args[3];
		await this.service.AssignTodo(todoId, user, serverId);
		message.channel.send(showSimpleMessage(`${user} assigned to task`));
	}
	async handleUnassignCommand(message: Message, args: string[]) {
		const serverId = <string>message.guild?.id;
		const todoId = +args[2];
		const user = args[3];
		await this.service.UnassignTodo(todoId, user, serverId);
		message.channel.send(showSimpleMessage(`${user} unassigned from task`));
	}
	async Handle(message: Message, args: string[]) {
		if (args.length < 2) {
			await this.handleListCommand(message);
			return;
		}
		switch (args[1].toLowerCase()) {
			case "add":
				await this.handleAddCommand(message, args);
				break;
			case "remove":
				await this.handleRemoveCommand(message, args);
				break;
			case "modify":
				await this.handleModifyCommand(message, args);
				break;
			case "mark":
				await this.handleMarkCommand(message, args);
				break;
			case "assign":
				await this.handleAssignCommand(message, args);
				break;
			case "unassign":
				await this.handleUnassignCommand(message, args);
				break;
			default:
				message.channel.send(
					showSimpleMessage("Please input a valid command")
				);
				break;
		}
		return;
	}
}
function showSimpleMessage(description: string): MessageEmbed {
	return new MessageEmbed().setDescription(description).setColor("@f3f");
}
