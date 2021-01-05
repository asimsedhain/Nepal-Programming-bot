import { TodoStoreInterface } from "../store";
import { Todo } from "../todo";
import model from "./todos";

export class MongoStore implements TodoStoreInterface {
	constructor() {}
	async AddTodo(description: string, server: string): Promise<void> {
		const filter = { Server: server };

		await model.updateOne(
			filter,
			{
				$push: { Todos: { Description: description } },
			},
			{ upsert: true }
		);

		return;
	}
	async RemoveTodo(id: number, server: string): Promise<void> {
		const filter = { Server: server };

		await model.updateOne(
			filter,
			{ $unset: { [`Todos.${id}`]: 1 } },
			{ upsert: false }
		);
		await model.updateOne(filter, { $pull: { Todos: null } });
		return;
	}
	async ModifyTodo(
		id: number,
		description: string,
		server: string
	): Promise<void> {
		const filter = { Server: server };
		await model.updateOne(
			filter,
			{ $set: { [`Todos.${id}.Description`]: description } },
			{ upsert: false }
		);
	}
	async AssignTodo(id: number, user: string, server: string): Promise<void> {
		const filter = { Server: server };
		await model.updateOne(filter, {
			$addToSet: { [`Todos.${id}.AssignedUsers`]: user },
		});
		return;
	}
	async UnassignTodo(
		id: number,
		user: string,
		server: string
	): Promise<void> {
		const filter = { Server: server };
		await model.updateOne(filter, {
			$pull: { [`Todos.${id}.AssignedUsers`]: user },
		});
		return;
	}
	async GetTodo(id: number, server: string): Promise<Todo | null> {
		const filter = { Server: server };
		const doc = await model.findOne(filter, { "Todos.$": id });
		const todo = {
			Id: id,
			Description: doc?.Todos[0].Description,
			AssignedUsers: doc?.Todos[0].AssignedUsers,
			Server: server,
		};
		return todo;
	}
	async GetAllTodo(server: string): Promise<Todo[] | null> {
		const filter = { Server: server };

		let todoArr: Todo[] = [];
		const doc = await model.findOne(filter);
		if (doc == null) {
			return todoArr;
		}
		for (let i = 0; i < doc?.Todos?.length; i++) {
			todoArr.push({
				Id: i,
				Description: doc.Todos[i].Description,
				Server: server,
				AssignedUsers: new Set(doc.Todos[i].AssignedUsers),
			});
		}
		return todoArr;
	}
}
