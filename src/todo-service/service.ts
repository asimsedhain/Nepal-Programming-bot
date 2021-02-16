import { Todo } from "./todo";
import { TodoStoreInterface } from "./store";

export interface TodoServiceInterface {
	AddTodo(description: string, server: string): Promise<void>;
	RemoveTodo(id: number, server: string): Promise<void>;
	RemoveAllTodo(server: string): Promise<void>;
	ModifyTodo(id: number, description: string, server: string): Promise<void>;
	ToggleCompletion(id: number, server: string): Promise<void>;
	AssignTodo(id: number, user: string, server: string): Promise<void>;
	UnassignTodo(id: number, user: string, server: string): Promise<void>;
	GetAllTodo(server: string): Promise<Todo[]>;
}

export class TodoService implements TodoServiceInterface {
	protected store: TodoStoreInterface;
	constructor(store: TodoStoreInterface) {
		this.store = store;
	}
	async AddTodo(description: string, server: string): Promise<void> {
		if (description.trim() === "") {
			throw "Invalid Todo Description";
		}
		if (server.trim() === "") {
			throw "Invalid Todo Server";
		}
		return this.store.AddTodo(description, server);
	}

	async RemoveTodo(id: number, server: string): Promise<void> {
		if (server.trim() === "") {
			throw "Invalid Todo Server";
		}
		if (id < 0|| id >= (await this.store.GetTodosLength(server))) {
			throw "Invalid Todo Id";
		}

		return this.store.RemoveTodo(id, server);
	}
	async RemoveAllTodo(server: string): Promise<void> {
		if (server.trim() === "") {
			throw "Invalid Todo Server";
		}
		return this.store.RemoveAllTodo(server);
	}
	async ModifyTodo(
		id: number,
		description: string,
		server: string
	): Promise<void> {
		if (description.trim() === "") {
			throw "Invalid Todo Description";
		}
		if (server.trim() === "") {
			throw "Invalid Todo Server";
		}
		if (id < 0|| id >= (await this.store.GetTodosLength(server))) {
			throw "Invalid Todo Id";
		}
		return this.store.ModifyTodo(id, description, server);
	}
	async AssignTodo(id: number, user: string, server: string): Promise<void> {
		if (user.trim() === "") {
			throw "Invalid Todo User";
		}
		if (server.trim() === "") {
			throw "Invalid Todo Server";
		}
		if (id < 0|| id >= (await this.store.GetTodosLength(server))) {
			throw "Invalid Todo Id";
		}
		return this.store.AssignTodo(id, user, server);
	}
	async ToggleCompletion(id: number, server: string): Promise<void> {
		if (server.trim() === "") {
			throw "Invalid Todo Server";
		}
		if (id < 0|| id >= (await this.store.GetTodosLength(server))) {
			throw "Invalid Todo Id";
		}
		return this.store.ToggleCompletion(id, server);
	}
	async UnassignTodo(
		id: number,
		user: string,
		server: string
	): Promise<void> {
		if (user.trim() === "") {
			throw "Invalid Todo Server";
		}
		if (server.trim() === "") {
			throw "Invalid Todo Server";
		}
		if (id < 0|| id >= (await this.store.GetTodosLength(server))) {
			throw "Invalid Todo Id";
		}
		return this.store.UnassignTodo(id, user, server);
	}
	async GetAllTodo(server: string): Promise<Todo[]> {
		if (server.trim() === "") {
			throw "Invalid Todo Server";
		}
		return this.store.GetAllTodo(server);
	}
}
